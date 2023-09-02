#! pnpm tsx

// Koa Imports
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

// Router Imports
import { bing, hello, upload } from "@/routers";

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
      return ctx.origin;
    },
  })
);

// ** Endpoints
app.use(bing.routes());
app.use(upload.routes());
app.use(hello.routes());

// Bootstarp
const port = 5173;
app.listen(port, () => {
  console.log(`stand by ${port}`);
});
