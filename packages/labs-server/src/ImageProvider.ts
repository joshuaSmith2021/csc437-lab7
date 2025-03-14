import { MongoClient, ObjectId } from "mongodb";

export interface PersistedUser {
  username: string;
  email: string;
}

export interface PersistedImage {
  src: string;
  name: string;
  likes: number;
  author: PersistedUser;
}

export class ImageProvider {
  constructor(private readonly mongoClient: MongoClient) {}

  async getAllImages(authorId?: string): Promise<PersistedImage[]> {
    const images = (await this.mongoClient
      .db()
      .collection<PersistedImage>("images")
      .aggregate([
        ...((authorId && [
          {
            $match: { author: authorId },
          },
        ]) ||
          []),
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            src: 1,
            name: 1,
            likes: 1,
            author: 1,
          },
        },
      ])
      .toArray()) as PersistedImage[];

    return images;
  }

  async updateImageName(imageId: string, newName: string): Promise<number> {
    const result = await this.mongoClient
      .db()
      .collection("images")
      .updateOne(
        /* This seems wrong, but it works. */
        { _id: imageId as unknown as ObjectId },
        { $set: { name: newName } },
      );

    return result.matchedCount;
  }
}
