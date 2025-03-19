import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";
import getMongoClient from "./mongoClientProvider";
import { registerApiRoutes } from "./routes/api";

const app = express();
app.use(express.json());

app.use("/api/*", verifyAuthToken);
registerAuthRoutes(app, getMongoClient);
registerApiRoutes(app, getMongoClient);
app.get("/api/motd", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.get("/", (req, res) => {
  res.status(200).send("root");
});

app.listen(3000, async () => {});
