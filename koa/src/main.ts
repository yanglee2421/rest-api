#! pnpm tsx

// Koa Imports
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

// Router Imports
import { bing, hello, upload, chat } from "@/routers";

// Middleware Imports
import { errorHandler, log } from "@/middleware";

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
app.listen(port, () => {
  console.log(`stand by ${port}`);
});
