const { Router } = require("express");
const crypto = require("crypto");
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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
  const endpoint = process.env.S3_ENDPOINT || process.env.BUCKET_ENDPOINT;
  const bucket = process.env.S3_BUCKET || process.env.BUCKET_NAME;
  const accessKeyId = process.env.S3_ACCESS_KEY || process.env.BUCKET_ACCESS_KEY;
  const secretAccessKey = process.env.S3_SECRET_KEY || process.env.BUCKET_SECRET_KEY;
  const region = process.env.S3_REGION || process.env.BUCKET_REGION || "auto";
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

function getSignedUrlTtlSeconds() {
  const raw = process.env.S3_SIGNED_URL_EXPIRES_SECONDS;
  const parsed = Number.parseInt(raw || "3600", 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return 3600;
  }

  return Math.min(parsed, 604800);
}

async function resolveImageUrl(storage, imageKey) {
  if (storage.publicBaseUrl) {
    return buildImageUrl(storage, imageKey);
  }

  return getSignedUrl(
    storage.client,
    new GetObjectCommand({
      Bucket: storage.bucket,
      Key: imageKey,
    }),
    { expiresIn: getSignedUrlTtlSeconds() }
  );
}

// POST /upload?folder=productos
// multipart field name: "image"; optional body field: "old_key"
router.post("/", async (req, res) => {
  const folder = req.query.folder || "general";
  console.log("Uploading to folder:", folder);
  const storage = getStorageConfig();

  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
  }

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

    const image_url = await resolveImageUrl(storage, image_key);

    return res.json({
      image_url,
      image_key,
      image_mime: file.mimetype,
      image_size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }
});

// GET /upload/signed-url?key=productos/uuid.jpg
router.get("/signed-url", async (req, res) => {
  const { key } = req.query;
  const storage = getStorageConfig();

  if (!key || typeof key !== "string") {
    return res.status(400).json({ error: "key is required" });
  }

  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
  }

  try {
    const image_url = await resolveImageUrl(storage, key);
    return res.json({ image_url, image_key: key, expires_in: getSignedUrlTtlSeconds() });
  } catch (error) {
    console.error("Signed URL error:", error);
    return res.status(500).json({ error: "Failed to generate signed URL" });
  }
});

// DELETE /upload?key=productos/uuid.jpg
router.delete("/", async (req, res) => {
  const { key } = req.query;
  if (!key) return res.status(400).json({ error: "key is required" });
  const storage = getStorageConfig();

  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
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

