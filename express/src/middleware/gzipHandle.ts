import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { gzip } from "node:zlib";
import type { RequestHandler } from "express";
import type { InputType } from "node:zlib";

export function gzipHandle(): RequestHandler {
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
    gzip(buffer, (err, compressed) => (err ? rej(err) : res(compressed))),
  );
}
