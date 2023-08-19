// Router Imports
import Router from "@koa/router";

// NodeJs Imports
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// Utils Imports
import { toParseForm } from "@/utils";

// ** Router
export const upload = new Router({ prefix: "/upload" });

// ** Endpoints
upload.post("/base64", async (ctx, next) => {
  await next();

  const { fields, files } = await toParseForm(ctx.req);
  const { file } = files;
  const f = Array.isArray(file) ? file.at(0) : file;
  if (!f) throw new Error("invalid file");

  const buffer = await readFile(f.filepath);
  const data = buffer.toString("base64");

  ctx.body = { fields, data };
});

upload.post("/save", async (ctx, next) => {
  await next();
  const { fields, files } = await toParseForm(ctx.req);
  const { file } = files;
  const f = Array.isArray(file) ? file.at(0) : file;
  if (!f) throw new Error("invalid file");

  const { filepath, originalFilename } = f;
  const buffer = await readFile(filepath);
  const path = resolve(process.cwd(), "./public");
  await writeFile(`${path}/${originalFilename}`, buffer);

  ctx.body = { path, fields };
});
