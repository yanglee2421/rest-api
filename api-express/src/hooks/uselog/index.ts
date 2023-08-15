// NodeJs Imports
import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { IncomingMessage } from "node:http";
import { fileURLToPath } from "node:url";

// Express Imports
import type { RequestHandler } from "express";

// Formidable Imports
import formidable, { Fields, Files } from "formidable";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function uselog(): RequestHandler {
  return async (req, res, next) => {
    const { fields } = await toParse(req);
    await fs.appendFile("./demo.json", JSON.stringify(fields), {
      encoding: "utf-8",
    });

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

// Parse Form
function toParse(req: IncomingMessage) {
  // ** Form
  const form = formidable();

  return new Promise<Data>((res, rej) => {
    form.parse(req, (err, fields, files) => {
      if (err) return rej(err);
      return res({ fields, files });
    });
  });
}
interface Data {
  fields: Fields;
  files: Files;
}
