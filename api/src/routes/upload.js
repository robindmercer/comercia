const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const router = Router();

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const MIME_EXT = {
  "image/jpeg": ".jpg",
  "image/png":  ".png",
  "image/webp": ".webp",
  "image/gif":  ".gif",
};

const UPLOADS_BASE = path.resolve(path.join(__dirname, "../../public/uploads"));

// POST /upload?folder=productos
// multipart field name: "imagen"; optional body field: "old_key"
router.post("/", (req, res) => {
  const folder = req.query.folder || "general";
  console.log('req: ', req.files);

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
  const uploadDir = path.join(UPLOADS_BASE, folder);
  const uploadPath = path.join(uploadDir, filename);

  fs.mkdirSync(uploadDir, { recursive: true });

  // Delete old file if provided (prevents orphaned files)
  const old_key = req.body && req.body.old_key;
  if (old_key) {
    const resolvedOld = path.resolve(path.join(UPLOADS_BASE, old_key));
    if (resolvedOld.startsWith(UPLOADS_BASE + path.sep) || resolvedOld === UPLOADS_BASE) {
      fs.unlink(resolvedOld, () => {});
    }
  }

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Failed to save file" });
    }
    const image_key = `${folder}/${filename}`;
    return res.json({
      image_url:  `/uploads/${image_key}`,
      image_key,
      image_mime: file.mimetype,
      image_size: file.size,
    });
  });
});

// DELETE /upload?key=productos/uuid.jpg
router.delete("/", (req, res) => {
  const { key } = req.query;
  if (!key) return res.status(400).json({ error: "key is required" });

  const filePath = path.resolve(path.join(UPLOADS_BASE, key));

  if (!filePath.startsWith(UPLOADS_BASE + path.sep)) {
    return res.status(400).json({ error: "Invalid key" });
  }

  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).json({ error: "File not found" });
    return res.json({ message: "File deleted" });
  });
});

module.exports = router;
