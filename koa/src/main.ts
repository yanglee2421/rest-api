#! pnpm tsx

import { createServer } from "node:http";
import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { errorHandler, log } from "@koa/middleware";
import { bing, hello, upload, chat } from "@koa/routers";

const app = new Koa();

app.use(errorHandler());

app.use(log());
app.use(bodyParser());
app.use(
  cors({
    origin(ctx) {
      const isLocal = ctx.origin.includes("localhost");
      return isLocal ? ctx.origin : "https://k7npd2jic.myshopline.com";
    },
  }),
);

app.use(bing.routes());
app.use(upload.routes());
app.use(hello.routes());
app.use(chat.routes());

const port = 3002;
const server = createServer(app.callback());

server.listen(port, () => {
  console.log(`stand by ${port}`);
});
