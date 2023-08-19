// Router Imports
import Router from "@koa/router";

// API Imports
import { get_bing } from "@/api";

// ** Router
export const bing = new Router({ prefix: "/bing" });

// ** Endpoints
bing.get("/", async (ctx, next) => {
  await next();
  const { idx = 0, n = 1 } = ctx.query;
  const data = await get_bing({
    idx: Number(idx),
    n: Number(n),
  });
  ctx.body = data;
});
