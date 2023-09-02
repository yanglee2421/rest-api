// Router Imports
import Router from "@koa/router";

// API Imports
import axios from "axios";

// ** Router
export const hello = new Router();

// ** Endpoints

// Entry
hello.get("/", async (ctx, next) => {
  await next();
  ctx.body = ctx.query;

  // NOTE: ctx.req is NOT a alias for ctx.request
  // console.log(ctx.req);
  console.log(ctx.request.query);

  const {} = ctx.query;

  const url = new URL(
    "/admin/oauth-web/#/oauth/authorize",
    `https://${ctx.query.handle}.myshopline.com`
  );
  const searchParams = new URLSearchParams();
  searchParams.set("appKey", String(ctx.query.appkey));
  searchParams.set("responseType", "code");
  searchParams.set("scope", "read_products");
  searchParams.set("redirectUri", "http://localhost:5173");

  console.log("url", url.href);
  console.log("query", searchParams.toString());
  const redirectURL = url.href + "?" + searchParams.toString();
  console.log("res", redirectURL);

  ctx.redirect(redirectURL);
});

hello.get("/callback", async (ctx, next) => {
  await next();
  const { handle, code, appkey, timestamp, sign } = ctx.query;

  // Get Token
  const tokenData = await axios({
    baseURL: `https://${handle}.myshopline.com`,
    url: "/admin/oauth/token/create",
    method: "POST",
    data: {
      sign: toHanldeSign(sign),
      code,
    },
    headers: {
      appkey,
      timestamp: Date.now(),
    },
  });
});

function toHanldeSign(sign: unknown) {
  return sign;
}

hello.get("/:id", async (ctx, next) => {
  await next();
  ctx.body = ctx.params;
});
hello.post("/", async (ctx, next) => {
  await next();
  ctx.body = ctx.request.body;
});
