import { Router } from "express";

export const routerCrawler = Router();

routerCrawler.use((req, res, next) => {
  console.log(req);
  console.log("crawler");

  next();
});
