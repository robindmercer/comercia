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

function getStorageConfig() {
  const endpoint = process.env.S3_ENDPOINT;
  const bucket = process.env.S3_BUCKET;
  const accessKeyId = process.env.S3_ACCESS_KEY;
  const secretAccessKey = process.env.S3_SECRET_KEY;
  const region = process.env.S3_REGION || "auto";
  const publicBaseUrl = process.env.S3_PUBLIC_URL || "";

  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return {
    endpoint,
    bucket,
    region,
    publicBaseUrl,
    client: new S3Client({
      region,
      endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    }),
  };
}

function buildImageUrl(storage, imageKey) {
  const normalizedKey = imageKey.split("/").map(encodeURIComponent).join("/");

  if (storage.publicBaseUrl) {
    return `${storage.publicBaseUrl.replace(/\/$/, "")}/${normalizedKey}`;
  }

  return `${storage.endpoint.replace(/\/$/, "")}/${storage.bucket}/${normalizedKey}`;
}

// POST /upload?folder=productos
// multipart field name: "imagen"; optional body field: "old_key"
router.post("/", async (req, res) => {
  const folder = req.query.folder || "general";
  console.log('req: ', req.files);
  const storage = getStorageConfig();

  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured" });
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(folder)) {
    return res.status(400).json({ error: "Invalid folder name" });
  }

  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No file uploaded (field: imagen)" });
  }

  const file = req.files.image;

  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    return res.status(400).json({ error: "Only jpeg, png, webp, and gif are allowed" });
  }

  if (file.size > MAX_SIZE) {
    return res.status(400).json({ error: "File exceeds 5MB limit" });
  }

  const ext = MIME_EXT[file.mimetype];
  const filename = crypto.randomUUID() + ext;
  const image_key = `${folder}/${filename}`;

  try {
    await storage.client.send(new PutObjectCommand({
      Bucket: storage.bucket,
      Key: image_key,
      Body: file.data,
      ContentType: file.mimetype,
      ContentLength: file.size,
    }));

    const old_key = req.body && req.body.old_key;
    if (old_key && typeof old_key === "string") {
      await storage.client.send(new DeleteObjectCommand({
        Bucket: storage.bucket,
        Key: old_key,
      })).catch(() => {});
    }

    return res.json({
      image_url: buildImageUrl(storage, image_key),
      image_key,
      image_mime: file.mimetype,
      image_size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }
});

// DELETE /upload?key=productos/uuid.jpg
router.delete("/", async (req, res) => {
  const { key } = req.query;
  if (!key) return res.status(400).json({ error: "key is required" });
  const storage = getStorageConfig();

  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured" });
  }

  try {
    await storage.client.send(new DeleteObjectCommand({
      Bucket: storage.bucket,
      Key: key,
    }));
    return res.json({ message: "File deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(404).json({ error: "File not found" });
  }
});

module.exports = router;
