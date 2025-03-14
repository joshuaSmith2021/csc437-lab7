import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export interface ApiResponse {
  statusCode: number;
  response?: { message: string; error: string };
}

interface ICredentialsDocument {
  username: string;
  password: string;
}

export class CredentialsProvider {
  private readonly collection: Collection<ICredentialsDocument>;

  constructor(mongoClient: MongoClient) {
    const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
    if (!COLLECTION_NAME) {
      throw new Error("Missing CREDS_COLLECTION_NAME from env file");
    }
    this.collection = mongoClient
      .db()
      .collection<ICredentialsDocument>(COLLECTION_NAME);
  }

  async registerUser(
    username: string,
    plaintextPassword: string,
  ): Promise<ApiResponse> {
    // TODO
    const isUsernameTaken = await this.collection
      .findOne({
        username: username,
      })
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

    await this.collection.insertOne({
      username: username,
      password: hashedPassword,
    });

    // Wait for any DB operations to finish before returning!
    return {
      statusCode: 201,
    };
  }

  async verifyPassword(username: string, plaintextPassword: string) {
    // TODO

    const hashedPassword = await this.collection
      .findOne({ username: username })
      .then((user) => (user === null ? undefined : user.password));

    return (
      hashedPassword !== undefined &&
      bcrypt.compare(plaintextPassword, hashedPassword)
    );
  }
}
