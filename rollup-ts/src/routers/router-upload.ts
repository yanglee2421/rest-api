// Router Imports
import Router from "@koa/router";

// Formidable Imports
import formidable, { Fields, Files } from "formidable";

// NodeJs Imports
import { readFile, writeFile } from "node:fs/promises";
import { IncomingMessage } from "node:http";
import { resolve } from "node:path";

// ** Router
export const upload = new Router({ prefix: "/upload" });

// ** Endpoints
upload.post("/base64", async (ctx, next) => {
  await next();

  const { fields, files } = await toParse(ctx.req);
  const { file } = files;
  const f = Array.isArray(file) ? file.at(0) : file;
  if (!f) throw new Error("invalid file");

  const buffer = await readFile(f.filepath);
  const data = buffer.toString("base64");

  ctx.body = { fields, data };
});

upload.post("/save", async (ctx, next) => {
  await next();
  const { fields, files } = await toParse(ctx.req);
  const { file } = files;
  const f = Array.isArray(file) ? file.at(0) : file;
  if (!f) throw new Error("invalid file");

  const { filepath, originalFilename } = f;
  const buffer = await readFile(filepath);
  const path = resolve(process.cwd(), "./public");
  await writeFile(`${path}/${originalFilename}`, buffer);

  ctx.body = { path, fields };
});

// Parse Form
function toParse(req: IncomingMessage) {
  // ** Form
  const form = formidable({ maxFields: 1, maxFiles: 1 });

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
