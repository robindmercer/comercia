const { Router } = require("express");
const crypto = require("crypto");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const router = Router();

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

const MIME_EXT = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

function getStorageConfig() {
  const endpoint = process.env.S3_ENDPOINT || process.env.BUCKET_ENDPOINT;
  const bucket = process.env.S3_BUCKET || process.env.BUCKET_NAME;
  const accessKeyId =
    process.env.AWS_ACCESS_KEY_ID ||
    process.env.S3_ACCESS_KEY ||
    process.env.BUCKET_ACCESS_KEY;
  const secretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY ||
    process.env.S3_SECRET_KEY ||
    process.env.BUCKET_SECRET_KEY;
  const region =
    process.env.AWS_REGION ||
    process.env.S3_REGION ||
    process.env.BUCKET_REGION ||
    "auto";
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

function getEndpointHost(endpoint) {
  if (!endpoint) return "";

  try {
    return new URL(endpoint).host;
  } catch (_error) {
    return "";
  }
}

function parseImageKey(storage, rawValue) {
  if (!rawValue || typeof rawValue !== "string") return "";

  const candidate = rawValue.trim();
  if (!candidate) return "";

  if (!/^https?:\/\//i.test(candidate)) {
    return candidate.replace(/^\/+/, "");
  }

  try {
    const parsedUrl = new URL(candidate);
    const endpointHost = getEndpointHost(storage.endpoint);
    const pathname = parsedUrl.pathname.replace(/^\/+/, "");

    if (!pathname) return "";

    if (endpointHost && parsedUrl.host === endpointHost) {
      const bucketPrefix = `${storage.bucket}/`;
      if (pathname.startsWith(bucketPrefix)) {
        return pathname.slice(bucketPrefix.length);
      }
    }

    return pathname;
  } catch (_error) {
    return "";
  }
}

function buildImageUrl(storage, imageKey) {
  const normalizedKey = imageKey.split("/").map(encodeURIComponent).join("/");

  if (storage.publicBaseUrl) {
    return `${storage.publicBaseUrl.replace(/\/$/, "")}/${normalizedKey}`;
  }

  return `${storage.endpoint.replace(/\/$/, "")}/${storage.bucket}/${normalizedKey}`;
}

function buildProxyUrl(imageKey) {
  const safePath = String(imageKey || "")
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  return `/upload/view/${safePath}`;
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
    { expiresIn: getSignedUrlTtlSeconds() },
  );
}

// POST /upload?folder=productos
// multipart field name: image
router.post("/", async (req, res) => {
  const folder = req.query.folder || "general";
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

  const ext = MIME_EXT[file.mimetype] || ".bin";
  const filename = `${crypto.randomUUID()}${ext}`;
  const image_key = `${folder}/${filename}`;

  try {
    await storage.client.send(
      new PutObjectCommand({
        Bucket: storage.bucket,
        Key: image_key,
        Body: file.data,
        ContentType: file.mimetype,
        ContentLength: file.size,
      }),
    );

    const old_key = parseImageKey(storage, req.body && req.body.old_key);
    if (old_key) {
      await storage.client
        .send(
          new DeleteObjectCommand({
            Bucket: storage.bucket,
            Key: old_key,
          }),
        )
        .catch(() => {});
    }

    const image_url = await resolveImageUrl(storage, image_key);

    return res.json({
      // Prefer storing key/path in DB to avoid expired URLs.
      url: image_key,
      path: image_key,
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
  const storage = getStorageConfig();
  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
  }

  const key = parseImageKey(storage, req.query && req.query.key);
  if (!key) {
    return res.status(400).json({ error: "key is required" });
  }

  try {
    const image_url = await resolveImageUrl(storage, key);
    const proxyUrl = buildProxyUrl(key);
    return res.json({
      signedUrl: proxyUrl,
      image_url: proxyUrl,
      proxyUrl,
      externalSignedUrl: image_url,
      image_key: key,
      expires_in: getSignedUrlTtlSeconds(),
    });
  } catch (error) {
    console.error("Signed URL error:", error);
    return res.status(500).json({ error: "Failed to generate signed URL" });
  }
});

// POST /upload/signed-url body: { key } or { path } or { url }
router.post("/signed-url", async (req, res) => {
  const storage = getStorageConfig();
  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
  }

  const raw = (req.body && (req.body.key || req.body.path || req.body.url)) || "";
  const key = parseImageKey(storage, raw);
  if (!key) {
    return res.status(400).json({ error: "key is required" });
  }

  try {
    const image_url = await resolveImageUrl(storage, key);
    const proxyUrl = buildProxyUrl(key);
    return res.json({
      signedUrl: proxyUrl,
      image_url: proxyUrl,
      proxyUrl,
      externalSignedUrl: image_url,
      image_key: key,
      expires_in: getSignedUrlTtlSeconds(),
    });
  } catch (error) {
    console.error("Signed URL error:", error);
    return res.status(500).json({ error: "Failed to generate signed URL" });
  }
});

// GET /upload/view/productos/uuid.jpg
router.get("/view/*", async (req, res) => {
  const storage = getStorageConfig();
  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
  }

  const wildcardKey = decodeURIComponent((req.params && req.params[0]) || "");
  const key = parseImageKey(storage, wildcardKey);
  if (!key) {
    return res.status(400).json({ error: "key is required" });
  }

  try {
    const response = await storage.client.send(
      new GetObjectCommand({
        Bucket: storage.bucket,
        Key: key,
      }),
    );

    if (response.ContentType) {
      res.setHeader("Content-Type", response.ContentType);
    } else {
      res.setHeader("Content-Type", "application/octet-stream");
    }

    if (response.ContentLength != null) {
      res.setHeader("Content-Length", String(response.ContentLength));
    }

    res.setHeader("Cache-Control", "public, max-age=300");

    const body = response.Body;
    if (!body || typeof body.pipe !== "function") {
      return res.status(500).json({ error: "Invalid object stream" });
    }

    body.on("error", () => {
      if (!res.headersSent) {
        res.status(500).end("Stream error");
      } else {
        res.end();
      }
    });

    return body.pipe(res);
  } catch (error) {
    console.error("View image error:", error);
    return res.status(404).json({ error: "File not found" });
  }
});

// GET /upload/view?key=productos/uuid.jpg (legacy compatibility)
// Streams object bytes from S3 through the API host.
router.get("/view", async (req, res) => {
  const storage = getStorageConfig();
  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
  }

  const key = parseImageKey(storage, req.query && req.query.key);
  if (!key) {
    return res.status(400).json({ error: "key is required" });
  }

  try {
    const response = await storage.client.send(
      new GetObjectCommand({
        Bucket: storage.bucket,
        Key: key,
      }),
    );

    if (response.ContentType) {
      res.setHeader("Content-Type", response.ContentType);
    } else {
      res.setHeader("Content-Type", "application/octet-stream");
    }

    if (response.ContentLength != null) {
      res.setHeader("Content-Length", String(response.ContentLength));
    }

    // Short cache for browser/PDF fetches while keeping flexibility for updates.
    res.setHeader("Cache-Control", "public, max-age=300");

    const body = response.Body;
    if (!body || typeof body.pipe !== "function") {
      return res.status(500).json({ error: "Invalid object stream" });
    }

    body.on("error", () => {
      if (!res.headersSent) {
        res.status(500).end("Stream error");
      } else {
        res.end();
      }
    });

    return body.pipe(res);
  } catch (error) {
    console.error("View image error:", error);
    return res.status(404).json({ error: "File not found" });
  }
});

// DELETE /upload?key=productos/uuid.jpg
router.delete("/", async (req, res) => {
  const storage = getStorageConfig();
  if (!storage) {
    return res.status(500).json({ error: "S3 bucket is not configured. Set S3_* or BUCKET_* env vars." });
  }

  const key = parseImageKey(storage, req.query && req.query.key);
  if (!key) {
    return res.status(400).json({ error: "key is required" });
  }

  try {
    await storage.client.send(
      new DeleteObjectCommand({
        Bucket: storage.bucket,
        Key: key,
      }),
    );

    return res.json({ message: "File deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(404).json({ error: "File not found" });
  }
});

module.exports = router;

