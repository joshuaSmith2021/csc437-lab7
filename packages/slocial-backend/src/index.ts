import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";
import getMongoClient from "./mongoClientProvider";
import { registerApiRoutes } from "./routes/api";

const STATIC_DIR = process.env.STATIC_DIR;
if (!STATIC_DIR) {
  console.error("STATIC_DIR not set");
  process.exit(1);
}

const IMAGE_UPLOAD_DIR = process.env.IMAGE_UPLOAD_DIR;
if (!IMAGE_UPLOAD_DIR) {
  console.error("No IMAGE_UPLOAD_DIR set in env");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/api/*", verifyAuthToken);
registerAuthRoutes(app, getMongoClient);
registerApiRoutes(app, getMongoClient);
app.get("/api/motd", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.use(express.static(STATIC_DIR));
app.use("/uploads", express.static(IMAGE_UPLOAD_DIR));

app.listen(3000, async () => {});
