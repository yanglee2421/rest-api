// ExpressJs Imports
import { Router } from "express";

// Utils Imports
import { toParseForm } from "@/utils";

// NodeJs Imports
import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";

export const routerCrawler = Router();

routerCrawler.post("/crawler", async (req, res) => {
  const { fields } = await toParseForm(req);
  const { html } = fields;
  const htmlText = Array.isArray(html) ? html[0] : html;

  const filePath = resolve(process.cwd(), "./public/demo.html");
  await appendFile(filePath, htmlText, "utf-8");

  res.send();
});
