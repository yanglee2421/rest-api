import { resolve } from "node:path";
import { DataSource } from "typeorm";
import { Pwd, User, Joke } from "./entity";

console.log("cwd", process.cwd());

const dataSource = new DataSource({
  type: "sqlite",
  database: resolve(process.cwd(), "./database.sqlite3"),
  entities: [Pwd, User, Joke],
});
export function useDB(callback: (db: DataSource) => void) {
  dataSource
    .initialize()
    .then(callback)
    .catch((err) => {
      console.error("数据库连接异常");
      console.error(err);
    });
}
