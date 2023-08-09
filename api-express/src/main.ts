#! pnpm tsx
// NodeJs Imports
import { createServer } from "node:http";
import { resolve } from "node:path";

// Express Imports
import express from "express";
import history from "connect-history-api-fallback";
import cors from "cors";

// Middleware Imports
import { errorHandler } from "@/middleware";
import { useCors, uselog, useGzip } from "@/hooks";
import {
  redirect,
  bing,
  file,
  login,
  pwd,
  joke,
  routerStripe,
} from "@/routers";

// ** App
const app = express();
const port = 3002;
createServer(app).listen(port, () => {
  console.info("standing by", port);
});

// ** Middleware
app.use(uselog());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ** Endpoints
app.use(bing);
app.use(redirect);
app.use("/auth", useCors(), login);
app.use("/api", useCors(), file);
app.use("/pwd", useCors(), pwd);
app.use("/joke", useCors(), joke);
app.use("/stripe", routerStripe);

// ** Static
app.use(useGzip());
const rootPath = process.cwd();
console.log("root", rootPath);

const publicPath = resolve(rootPath, "./public");
app.use("/public", history(), express.static(publicPath));

// ** Error
app.use(errorHandler());
