#! pnpm tsx

// Koa Imports
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

// Router Imports
import { bing, hello, upload, chat } from "@/routers";

// Middleware Imports
import { errorHandler, log } from "@/middleware";

// NodeJs Imports
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

// WebSocket Imports
import { Server } from "socket.io";

const app = new Koa();

// Error Handler
app.use(errorHandler());

// ** Middleware
app.use(log());
app.use(bodyParser());
app.use(
  cors({
    origin(ctx) {
      const isLocal = ctx.origin.includes("localhost");
      return isLocal ? ctx.origin : "https://k7npd2jic.myshopline.com";
    },
  })
);

// ** Endpoints
app.use(bing.routes());
app.use(upload.routes());
app.use(hello.routes());
app.use(chat.routes());

// Bootstarp
const port = 3002;
const server = createServer(app.callback());
const io = new Server(server, {
  cors: {
    origin(requestOrigin, callback) {
      void requestOrigin;
      callback(null, true);
    },
  },
});

io.on("connection", (socket) => {
  socket.on("msg", (evt) => {
    console.log(evt);

    setTimeout(() => {
      socket.emit("msg", randomUUID());
    }, 1000 * 5);
  });
});

server.listen(port, () => {
  console.log(`stand by ${port}`);
});
