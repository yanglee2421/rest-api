// Router Imports
import Router from "@koa/router";

// API Imports
import axios from "axios";

// ** Router
export const hello = new Router();

// ** Endpoints
hello.get("/", async (ctx, next) => {
  await next();
  ctx.body = ctx.query;

  // NOTE: ctx.req is NOT a alias for ctx.request
  // console.log(ctx.req);
  console.log(ctx.request.query);
  // const { data } = await axios({
  //   baseURL: `https://${ctx.query.handle}.myshopline.com`,
  //   url: "/admin/oauth-web/#/oauth/authorize",
  //   params: {
  //     appKey: "9a666537abf26ec0937b7239517c934c8a7d3101",
  //     responseType: "code",
  //     scope: "read_products,write_products",
  //     redirectUri: "http://localhost:5173",
  //   },
  // });
  // console.log("data", data);

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
hello.get("/:id", async (ctx, next) => {
  await next();
  ctx.body = ctx.params;
});
hello.post("/", async (ctx, next) => {
  await next();
  ctx.body = ctx.request.body;
});
