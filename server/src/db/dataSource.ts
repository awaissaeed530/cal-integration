import * as path from "path";
import { DataSource } from "typeorm";
import { Credentials } from "../entities";

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${path.resolve(__dirname, "..")}/data/line.sqlite`,
  entities: [Credentials],
  synchronize: true,
});
