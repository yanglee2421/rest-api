// ExpressJs Imports
import { Router } from "express";

// Utils Imports
import { toParseForm } from "@/utils";

// NodeJs Imports
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export const routerCrawler = Router();

routerCrawler.post("/crawler", async (req, res) => {
  const { fields } = await toParseForm(req);

  const filePath = resolve(process.cwd(), "./public/pdd.txt");
  await writeFile(filePath, JSON.stringify(fields), "utf-8");

  res.send();
});

routerCrawler.get("/crawler", (req, res) => {
  void req;
  res.send("crawler");
});
