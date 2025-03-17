import { Collection, MongoClient } from "mongodb";
import { ApiResponse } from "./types";
import bcrypt from "bcrypt";

interface ICredentialsDocument {
  username: string;
  password: string;
}

export default class AuthProvider {
  private readonly collection: Collection<ICredentialsDocument>;

  constructor(mongoClient: MongoClient) {
    const COLLECTION_NAME = process.env.AUTH_COLLECTION_NAME;
    if (!COLLECTION_NAME) {
      throw new Error("Missing AUTH_COLLECTION_NAME from env");
    }

    this.collection = mongoClient
      .db()
      .collection<ICredentialsDocument>(COLLECTION_NAME);
  }

  async registerUser(
    username: string,
    plaintextPassword: string,
  ): Promise<ApiResponse> {
    const isUsernameTaken = await this.collection
      .findOne({ username })
      .then((usernameOrNull) => usernameOrNull !== null);

    if (isUsernameTaken) {
      return {
        statusCode: 400,
        response: {
          error: "Bad request",
          message: "Username already taken",
        },
      };
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    await this.collection.insertOne({ username, password: hashedPassword });

    return {
      statusCode: 201,
    };
  }

  async verifyPassword(username: string, plaintextPassword: string) {
    const hashedPassword = await this.collection
      .findOne({ username: username })
      .then((user) => (user === null ? undefined : user.password));

    return (
      hashedPassword !== undefined &&
      bcrypt.compare(plaintextPassword, hashedPassword)
    );
  }
}
