import multer from "multer";
import { __dirname } from "../app.js";
import path from "path";
import { HandleERROR } from "vanta-api";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/Public`);
  },
  filename: (req, file, cb) => {
    const cleanOriginalName = file.originalname
      .replace(/[^a-zA-Z0-9.\-_]/g, "_")
      .split(".")[0];
    cb(
      null,
      `${cleanOriginalName}_${Date.now()}${path.extname(file.originalname).toLowerCase()}`
    );
  },
});

const allowedTypes = /jpeg|jpg|png|svg|webp/;
function fileFilter(req, file, cb) {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === "image/svg+xml";
  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb(new HandleERROR("فرمت فایل غیرمجاز است (فقط JPG، PNG، SVG، WEBP مجاز است)", 400));
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

export default upload;
