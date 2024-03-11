#! pnpm tsx

import { createServer } from "node:http";
import { resolve } from "node:path";
import cors from "cors";
import express from "express";
import { errorHandler } from "@express/middleware/errorHandler";
import { gzipHandle } from "@express/middleware/gzipHandle";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/public",
  gzipHandle(),
  express.static(resolve(process.cwd(), "./public")),
);

app.use(errorHandler());

const port = 3001;
createServer(app).listen(port, () => {
  console.info("standing by", port);
});
