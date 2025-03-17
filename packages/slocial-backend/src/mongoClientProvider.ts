import { MongoClient } from "mongodb";

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

let cachedClient: MongoClient | null = null;

export default async function getMongoClient() {
  if (cachedClient) {
    console.log(`Used cached connection to ${connectionStringRedacted}`);
    return cachedClient;
  }

  cachedClient = await MongoClient.connect(connectionString);
  console.log(`Connected to ${connectionStringRedacted}`);
  return cachedClient;
}
