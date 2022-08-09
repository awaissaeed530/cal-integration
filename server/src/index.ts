import express from "express";
import { GoogleAPIs } from "./google";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/auth", (req, res) => {
  const url = GoogleAPIs.getAuthUrl();
  res.send(url);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
