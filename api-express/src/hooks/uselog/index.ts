// NodeJs Imports
import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Express Imports
import type { RequestHandler } from "express";

export function uselog(): RequestHandler {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  return async (req, res, next) => {
    const date = new Date().toLocaleString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    fs.writeFile(
      path.resolve(__dirname, "./log.txt"),
      `${date} ${req.path} ${req.method}\n`,
      { encoding: "utf-8", flag: "a" }
    )
      .then(() => next())
      .catch(() => res.writeHead(500, "打 log 时挂了"));
  };
}
