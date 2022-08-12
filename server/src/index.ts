import cors from "cors";
import express from "express";
import { dataSource } from "./db";
import { GoogleCredentials } from "./entities";
import { exportEvents, getAuthClient, getAuthUrl } from "./google";

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
  const url = getAuthUrl();
  res.status(200).send(url);
});

app.get("/credentials", async (req, res) => {
  const credentials = await dataSource.getRepository(GoogleCredentials).find({
    order: { createdOn: "desc" },
    take: 1,
  });
  if (credentials[0]) {
    res.status(200).json(credentials[0]);
  } else {
    res.sendStatus(400);
  }
});

app.post("/credentials", async (req, res) => {
  try {
    const { code } = req.body;
    const auth = getAuthClient();
    const { tokens } = await auth.getToken(code);

    const entity = await dataSource
      .getRepository(GoogleCredentials)
      .save(tokens as GoogleCredentials);

    res.status(201).send(entity);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/events", async (req, res) => {
  try {
    const { events, credentials } = req.body;
    const resEvents = await exportEvents(events, credentials);
    res.status(200).json(resEvents);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
