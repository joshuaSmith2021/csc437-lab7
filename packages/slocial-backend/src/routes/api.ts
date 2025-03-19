import { Request, Response } from "express";
import {
  handleImageFileErrors,
  imageMiddlewareFactory,
} from "../imageUploadMiddleware";
import { RouteRegistrar } from "../types";
import z from "zod";
import DataProvider, { IDataDocument } from "../DataProvider";

export const registerApiRoutes: RouteRegistrar = async (
  app,
  mongoClientProvider,
) => {
  const mongoClient = await mongoClientProvider();
  const dataProvider = new DataProvider(mongoClient);

  app.post(
    "/api/posts",
    imageMiddlewareFactory.single("imageUpload"),
    handleImageFileErrors,
    async (req: Request, res: Response) => {
      const { caption } = z
        .object({ caption: z.string().optional() })
        .parse(req.query);

      const file = req.file;

      if (!caption && !file) {
        res
          .status(400)
          .send({
            error: "Bad request",
            message: "Caption or image is required",
          })
          .end();
        return;
      }

      const filepath = (file && `/uploads/${file.filename}`) || undefined;

      const document = {
        author: res.locals.token.username as string,
        src: filepath,
        caption: caption,
        timestampMillis: new Date().getTime(),
      } satisfies IDataDocument;

      await dataProvider.uploadPost(document);

      res.status(201).send().end();
    },
  );
};
