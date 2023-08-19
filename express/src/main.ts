#! pnpm tsx

// NodeJs Imports
import { resolve } from "node:path";

// Express Imports
import express from "express";
import cors from "cors";

// Middleware Imports
import { errorHandler, middLog, middCors, middGzip } from "@/middleware";
import {
  bing,
  file,
  routerStream,
  routerStripe,
  routerCrawler,
} from "@/routers";

// ** App
const app = express();
const port = 3002;
app.listen(port, () => {
  console.info("standing by", port);
});

// ** Middleware
app.use(middLog());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ** Endpoints
app.use("/bing", bing);
app.use("/stream", routerStream);
app.use("/crawler", routerCrawler);
app.use("/stripe", routerStripe);
app.use("/file", middCors(), file);

// ** Static
const rootPath = process.cwd();
const publicPath = resolve(rootPath, "./public");
app.use("/public", middGzip(), express.static(publicPath));

// ** Error
app.use(errorHandler());
