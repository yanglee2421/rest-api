import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { RequestHandler } from "express";

export function middLog(): RequestHandler {
  return async (req, res, next) => {
    void res;

    await writeFile(
      resolve(process.cwd(), "./dev.log"),
      `${new Date().toLocaleString()} ${req.path} ${req.method}\n`,
      { encoding: "utf-8", flag: "a" },
    );

    next();
  };
}
