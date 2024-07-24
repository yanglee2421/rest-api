import { createServer } from "node:http";
import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import * as kolorist from "kolorist";
import { errorHandler } from "@koa/middleware/errorHandler";
import { log } from "@koa/middleware/log";
import { chat } from "@koa/routes/chat";
import { stream } from "@koa/routes/stream";
import { upload } from "@koa/routes/upload";
import { userRouter } from "@koa/routes/user";

const app = new Koa();

app.use(errorHandler());
app.use(log());
app.use(bodyParser());
app.use(
  cors({
    origin(ctx) {
      return ctx.origin.includes("localhost") ? ctx.origin : "*";
    },
  }),
);

app.use(chat.routes());
app.use(upload.routes());
app.use(stream.routes());
app.use(userRouter.routes());

const port = 3002;
createServer(app.callback()).listen(port, () => {
  console.log("stand by " + kolorist.blue("http://localhost:" + port));
});
