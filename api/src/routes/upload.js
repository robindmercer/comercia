const { Router } = require("express");
const crypto = require("crypto");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const router = Router();

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const MIME_EXT = {
  "image/jpeg": ".jpg",
  "image/png":  ".png",
  "image/webp": ".webp",
  "image/gif":  ".gif",
};

// Initialize S3 client
let s3Client;
function getS3Client() {
  if (!s3Client) {
    const endpoint = process.env.BUCKET_ENDPOINT;
    const accessKeyId = process.env.BUCKET_ACCESS_KEY;
    const secretAccessKey = process.env.BUCKET_SECRET_KEY;

    console.log("Initializing S3 client with endpoint:", endpoint);

    s3Client = new S3Client({
      region: "us-east-1", // Railway uses us-east-1 for S3-compatible storage
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Use path-style URLs
    });
  }
  return s3Client;
}

const BUCKET_NAME = process.env.BUCKET_NAME;

// POST /upload?folder=productos
// multipart field name: "image"; optional body field: "old_key"
router.post("/", async (req, res) => {
  const folder = req.query.folder || "general";
  console.log("Uploading to folder:", folder);

  if (!/^[a-zA-Z0-9_-]+$/.test(folder)) {
    return res.status(400).json({ error: "Invalid folder name" });
  }

  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No file uploaded (field: image)" });
  }

  const file = req.files.image;

  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    return res.status(400).json({ error: "Only jpeg, png, webp, and gif are allowed" });
  }

  if (file.size > MAX_SIZE) {
    return res.status(400).json({ error: "File exceeds 5MB limit" });
  }

  if (!BUCKET_NAME) {
    console.error("BUCKET_NAME not configured");
    return res.status(500).json({ error: "Bucket name not configured" });
  }

  const ext = MIME_EXT[file.mimetype];
  const filename = crypto.randomUUID() + ext;
  const s3Key = `${folder}/${filename}`;

  try {
    const client = getS3Client();

    // Delete old file if provided
    const old_key = req.body && req.body.old_key;
    if (old_key) {
      try {
        await client.send(new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: old_key,
        }));
        console.log("Deleted old file:", old_key);
      } catch (err) {
        console.warn("Failed to delete old file:", err.message);
      }
    }

    // Upload new file to S3
    await client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: file.data,
      ContentType: file.mimetype,
    }));

    console.log("File uploaded successfully:", s3Key);

    // Construct the public URL
    const endpoint = process.env.BUCKET_ENDPOINT || "";
    const bucketUrl = endpoint.replace(/\/$/, ""); // Remove trailing slash
    const image_url = `${bucketUrl}/${BUCKET_NAME}/${s3Key}`;

    return res.json({
      image_url,
      image_key: s3Key,
      image_mime: file.mimetype,
      image_size: file.size,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Failed to save file: " + err.message });
  }
});

// DELETE /upload?key=productos/uuid.jpg
router.delete("/", async (req, res) => {
  const { key } = req.query;
  if (!key) return res.status(400).json({ error: "key is required" });

  if (!BUCKET_NAME) {
    console.error("BUCKET_NAME not configured");
    return res.status(500).json({ error: "Bucket name not configured" });
  }

  try {
    const client = getS3Client();
    await client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }));
    console.log("File deleted:", key);
    return res.json({ message: "File deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Failed to delete file: " + err.message });
  }
});

module.exports = router;

