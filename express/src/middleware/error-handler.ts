// Express Imports

// NodeJs Imports
import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { ErrorRequestHandler } from "express";

export function errorHandler(): ErrorRequestHandler {
  return async (err, req, res, next) => {
    void req;
    void next;

    console.error(err);

    const path = resolve(process.cwd(), "./dev.log");
    await appendFile(path, `${String(err)}\n`, "utf-8");

    return res.status(500).send({
      msg: err.message,
      cause: err.cause,
    });
  };
}
