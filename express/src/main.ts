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
const port = 3001;
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
const publicPath = resolve(process.cwd(), "./public");
app.use("/public", middGzip(), express.static(publicPath));

app.get("/err", () => {
  throw new Error("error msg");
});

// ** Error
app.use(errorHandler());
