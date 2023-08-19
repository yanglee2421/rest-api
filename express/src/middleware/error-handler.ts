// Express Imports
import { ErrorRequestHandler } from "express";

// NodeJs Imports
import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";

export function errorHandler(): ErrorRequestHandler {
  return async (err, req, res, next) => {
    void next;

    console.error(req.path);
    console.error(err);

    const path = resolve(process.cwd(), "./dev.log");
    await appendFile(path, String(err), "utf-8");

    return res.status(500).send({
      msg: err.message,
      cause: err.cause,
    });
  };
}
