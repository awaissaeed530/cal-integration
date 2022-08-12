import * as path from "path";
import { DataSource } from "typeorm";
import { GoogleCredentials } from "../entities";

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${path.resolve(__dirname, "..")}/data/line.sqlite`,
  dropSchema: true,
  entities: [GoogleCredentials],
  synchronize: true,
});
