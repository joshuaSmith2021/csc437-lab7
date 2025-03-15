import dotenv from "dotenv";
dotenv.config();

import express, { Response } from "express";
import { MongoClient } from "mongodb";
import { registerImageRoutes } from "./routes/images";
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";

const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

export type MongoClientBox = { mongoClient: MongoClient | undefined };

const mongoClientBox: MongoClientBox = { mongoClient: undefined };

const bootstrapServer = async () => {
  console.log("Attempting Mongo connection at " + connectionStringRedacted);

  mongoClientBox.mongoClient = await MongoClient.connect(connectionString);
  const collectionInfos = await mongoClientBox.mongoClient
    .db()
    .listCollections()
    .toArray();

  // For debug only
  console.log(collectionInfos.map((collectionInfo) => collectionInfo.name));
};

const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello, World");
});

// app.use("/api/*", verifyAuthToken);
registerImageRoutes(app, mongoClientBox);
registerAuthRoutes(app, mongoClientBox);

app.use(express.static(STATIC_DIR));

app.get("*", (req, res) => {
  res.sendFile(`index.html`, { root: `${STATIC_DIR}` });
});

app.listen(PORT, async () => {
  await bootstrapServer();
  console.log(`Server running at http://localhost:${PORT}`);
});
