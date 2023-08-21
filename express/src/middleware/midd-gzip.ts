// Express Imports
import { RequestHandler } from "express";

// NodeJs Imports
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { gzip, InputType } from "node:zlib";

export function middGzip(): RequestHandler {
  return async (req, res, next) => {
    try {
      // Only Handle CSS & JS
      const isCss = req.url.endsWith(".css");
      const isJs = req.url.endsWith(".js");

      if (!isCss && !isJs) return next();

      // Not Allow Gzip
      const filePath = join(process.cwd(), req.originalUrl);
      const isAcceptGzip = req.headers["accept-encoding"]?.includes("gzip");
      if (!isAcceptGzip) return res.sendFile(filePath);

      // Has Allow Gzip
      const file = await readFile(filePath);
      const buffer = await toGzip(file);
      res.setHeader("Content-Encoding", "gzip");
      res.setHeader("Content-Type", isCss ? "text/css" : "text/javascript");
      return res.send(buffer);
    } catch (err) {
      return next(err);
    }
  };
}

function toGzip(buffer: InputType) {
  return new Promise<Buffer>((res, rej) =>
    gzip(buffer, (err, compressed) => (err ? rej(err) : res(compressed)))
  );
}
