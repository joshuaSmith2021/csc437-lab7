import express, { Request, Response } from "express";
import { ImageProvider, PersistedImage } from "../ImageProvider";
import { MongoClientBox } from "..";
import z from "zod";
import { MongoClient } from "mongodb";

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
}
