#! pnpm tsx

// NodeJs Imports
import { resolve } from "node:path";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

// Express Imports
import express from "express";
import cors from "cors";
import { errorHandler, middLog, middCors, middGzip } from "@/middleware";
import {
  bing,
  file,
  routerStream,
  routerStripe,
  routerCrawler,
} from "@/routers";

// WebSockets Imports
import { WebSocketServer } from "ws";

// ** App
const app = express();
const port = 3001;
const server = createServer(app);
const wss = new WebSocketServer({ server });

// ** WebSocket
wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    void data;

    // Decoded text
    const text = data.toString("utf-8");
    console.log(new Date().toLocaleString(), text);

    if (text === "check") return;
    setTimeout(() => {
      ws.send(new Date().toLocaleString() + " " + randomUUID());
    }, 1000 * 2);
  });
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

server.listen(port, () => {
  console.info("standing by", port);
});
