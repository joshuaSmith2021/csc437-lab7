import { MongoClient } from "mongodb";

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

  async getAllImages(): Promise<PersistedImage[]> {
    const collectionName = process.env.IMAGES_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error(
        "Missing IMAGES_COLLECTION_NAME from environment variables",
      );
    }

    const images = (await this.mongoClient
      .db()
      .collection<PersistedImage>("images")
      .aggregate([
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
}
