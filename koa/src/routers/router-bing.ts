import Router from "@koa/router";
import { bing_get } from "@api/bing/bing_get";

export const bing = new Router({ prefix: "/bing" });

bing.get("/", async (ctx, next) => {
  await next();

  const { idx = 0, n = 1 } = ctx.query;

  const data = await bing_get({
    params: {
      format: "js",
      idx: Number(idx),
      n: Number(n),
    },
  });

  ctx.body = data;
});
