import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const IMAGE_UPLOAD_DIR = process.env.IMAGE_UPLOAD_DIR;
if (IMAGE_UPLOAD_DIR === undefined) {
  throw new Error("IMAGE_UPLOAD_DIR not defined");
}

class ImageFormatError extends Error {}

const storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGE_UPLOAD_DIR);
  },

  filename: function (req, file, cb) {
    switch (file.mimetype) {
      case "image/png":
        const pngName = `${randomUUID()}.png`;
        console.log(pngName);
        cb(null, pngName);
        break;
      case "image/jpg":
        const jpgName = `${randomUUID()}.jpg`;
        console.log(jpgName);
        cb(null, jpgName);
        break;
      default:
        cb(new ImageFormatError("Unsupported image type"), "");
        break;
    }
  },
});

export const imageMiddlewareFactory = multer({
  storage: storageEngine,
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export function handleImageFileErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
    res.status(400).send({
      error: "Bad Request",
      message: err.message,
    });
    return;
  }
  next(err); // Some other error, let the next middleware handle it
}
