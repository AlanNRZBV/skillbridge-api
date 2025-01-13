import multer from "multer";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const publicPath = path.join(__dirname, "public");

const imageStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destDir = path.join(publicPath, "images");
    await fs.mkdir(destDir, { recursive: true });
    cb(null, publicPath);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = path.join("images", randomUUID() + extension);
    cb(null, filename);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
