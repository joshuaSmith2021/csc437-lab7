import express, { Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { ImageProvider, PersistedImage } from "./ImageProvider";

dotenv.config();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

let mongoClient: MongoClient | undefined;

const bootstrapServer = async () => {
  console.log("Attempting Mongo connection at " + connectionStringRedacted);

  mongoClient = await MongoClient.connect(connectionString);
  const collectionInfos = await mongoClient.db().listCollections().toArray();

  // For debug only
  console.log(collectionInfos.map((collectionInfo) => collectionInfo.name));
};

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello, World");
});

app.get("/api/images", async (_, res: Response<PersistedImage[]>) => {
  const imageProvider = new ImageProvider(mongoClient!);
  const images = await imageProvider.getAllImages();

  res.send(images);
});

app.use(express.static(STATIC_DIR));

app.get("*", (req, res) => {
  res.sendFile(`index.html`, { root: `${STATIC_DIR}` });
});

app.listen(PORT, async () => {
  await bootstrapServer();
  console.log(`Server running at http://localhost:${PORT}`);
});
