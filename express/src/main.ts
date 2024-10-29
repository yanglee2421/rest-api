#! pnpm tsx

import { createServer } from "node:http";
import { resolve } from "node:path";
import cors from "cors";
import express from "express";
import { errorHandler } from "@express/middleware/errorHandler";
import { gzipHandle } from "@express/middleware/gzipHandle";
import { WebSocket, WebSocketServer } from "ws";

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

const server = createServer(app);
const wss = new WebSocketServer({ server });
let data = "msg";

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.on("message", (message) => {
    data = message.toString();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.send(data);
});

const port = 8080;
server.listen(port, () => {
  console.info("standing by", port);
});
