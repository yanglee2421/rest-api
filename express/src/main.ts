#! pnpm tsx

// NodeJs Imports
import { resolve } from "node:path";
import { createServer } from "node:http";

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

// WebSockets Imports
import { Server } from "socket.io";

// ** App
const app = express();
const port = 3001;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin(requestOrigin, callback) {
      void requestOrigin;
      callback(null, true);
    },
  },
});

io.on("connection", (socket) => {
  socket.on("msg", (arg) => {
    console.log(arg); // world
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
