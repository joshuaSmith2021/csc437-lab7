import express, { Request, Response } from "express";
import { ImageProvider, PersistedImage } from "../ImageProvider";
import { MongoClientBox } from "..";
import z from "zod";
import { MongoClient } from "mongodb";
import {
  handleImageFileErrors,
  imageMiddlewareFactory,
} from "../imageUploadMiddleware";

const getImageProvider = (mongoClient: MongoClient) =>
  new ImageProvider(mongoClient);

export function registerImageRoutes(
  app: express.Application,
  mongoClientBox: MongoClientBox,
) {
  app.get(
    "/api/images",
    async (req: Request, res: Response<PersistedImage[]>) => {
      const { createdBy } = z
        .object({
          createdBy: z.string().optional(),
        })
        .parse(req.query);

      const imageProvider = getImageProvider(mongoClientBox.mongoClient!);

      const images = await imageProvider.getAllImages(createdBy);

      res.send(images);
    },
  );

  app.patch("/api/images/:id", async (req: Request, res: Response) => {
    const { id: imageId } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);

    const { name: newImageName } = z
      .object({
        name: z.string().optional(),
      })
      .parse(req.body);

    if (newImageName === undefined) {
      res.status(400).send({
        error: "Bad request",
        message: "Missing name property",
      });
      return;
    }

    const imageProvider = getImageProvider(mongoClientBox.mongoClient!);

    const matchedCount = await imageProvider.updateImageName(
      imageId,
      newImageName,
    );

    const success = matchedCount === 1;

    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send({
        error: "Not Found",
        message: "Image does not exist",
      });
    }
  });

  app.post(
    "/api/images",
    imageMiddlewareFactory.single("imageUpload"),
    handleImageFileErrors,
    async (req: Request, res: Response) => {
      // Final handler function after the above two middleware functions finish running
      const { name: imageTitle } = z
        .object({ name: z.string().optional() })
        .parse(req.body);

      const file = req.file;

      if (!file || !imageTitle) {
        res.status(400).send({
          error: "Bad request",
          message: "Missing file or image title",
        });
        return;
      }

      file satisfies Express.Multer.File;
      imageTitle satisfies string;

      const filename = file.filename;

      const document = {
        _id: filename,
        src: `/uploads/${filename}`,
        author: res.locals.token.username as string,
        likes: 0,
        name: imageTitle,
      };

      const provider = getImageProvider(mongoClientBox.mongoClient!);
      provider
        .createImage(document)
        .then(() => res.status(201).send())
        .catch((e) =>
          res.status(500).send({ error: "Internal server error", message: e }),
        );
    },
  );
}
