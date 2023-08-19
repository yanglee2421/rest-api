// NodeJs Imports
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// Express Imports
import type { RequestHandler } from "express";

// Utils Imports
import { toLocaleDate } from "@/utils";

export function middLog(): RequestHandler {
  return async (req, res, next) => {
    void res;

    console.log(req.path);

    const date = toLocaleDate(new Date());

    await writeFile(
      resolve(process.cwd(), "./dev.log"),
      `${date} ${req.path} ${req.method}\n`,
      { encoding: "utf-8", flag: "a" }
    );

    next();
  };
}
