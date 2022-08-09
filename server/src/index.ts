import cors from "cors";
import express from "express";
import { dataSource } from "./db";
import { Credentials } from "./entities";
import { GoogleAPIs } from "./google";

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/auth", (req, res) => {
  const url = GoogleAPIs.getAuthUrl();
  res.status(200).send(url);
});

app.post("/credentials", async (req, res) => {
  try {
    const credentials = req.body as Credentials;
    const entity = await dataSource
      .getRepository(Credentials)
      .save(credentials);
    res.status(201).send(entity);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/credentials", async (req, res) => {
  const credentials = await dataSource.getRepository(Credentials).find();
  if (credentials[0]) {
    res.status(200).json(credentials[0]);
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
