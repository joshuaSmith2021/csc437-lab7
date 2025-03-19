import { Collection, MongoClient } from "mongodb";

export interface IDataDocument {
  author: string;
  timestampMillis: number;
  src?: string;
  caption?: string;
}

export default class DataProvider {
  private readonly collection: Collection<IDataDocument>;

  constructor(mongoClient: MongoClient) {
    const COLLECTION_NAME = process.env.DATA_COLLECTION_NAME;
    if (!COLLECTION_NAME) {
      throw new Error("Missing DATA_COLLECTION_NAME from env");
    }

    this.collection = mongoClient
      .db()
      .collection<IDataDocument>(COLLECTION_NAME);
  }

  async uploadPost(post: IDataDocument) {
    await this.collection.insertOne(post);
  }
}
