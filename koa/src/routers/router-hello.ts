import Router from "@koa/router";

export const hello = new Router({ prefix: "/api" });

hello.get("/product/products.json", async (ctx, next) => {
  await next();
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Methods", ["POST", "GET"]);
  ctx.body = { msg: "hello world" };
});

hello.post("/hello", async (ctx, next) => {
  await next();
  ctx.body = { msg: "hello world!" };
});
