import multer, { StorageEngine } from "multer";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Request } from "express";

const publicPath = path.join(__dirname, "assets");

const imageStorage: StorageEngine = multer.diskStorage({
  destination: async (req: Request, file: Express.Multer.File, cb) => {
    const destDir = path.join(publicPath, "public");
    await fs.mkdir(destDir, { recursive: true });
    cb(null, publicPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const extension = path.extname(file.originalname);
    const filename = path.join("public", randomUUID() + extension);
    cb(null, filename);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
