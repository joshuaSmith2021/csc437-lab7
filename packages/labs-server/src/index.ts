import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello, World");
});

app.use(express.static(STATIC_DIR));

app.get("*", (req, res) => {
  res.sendFile(`index.html`, { root: `${STATIC_DIR}` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
