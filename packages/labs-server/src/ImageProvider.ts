import { MongoClient } from "mongodb";

export interface PersistedImage {
  src: string;
  name: string;
  likes: number;
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

    const collection = this.mongoClient
      .db()
      .collection<PersistedImage>(collectionName);
    return collection.find().toArray();
  }
}
