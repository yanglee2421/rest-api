import { Router } from "express";

interface Data {
  images: any[];
}

/**
 * 重定向路由
 */
export const redirect = Router();
redirect.get("/redirect/*", async (req, res) => {
  const bingUrl = "https://cn.bing.com";
  const url = new URL("/HPImageArchive.aspx", bingUrl);
  url.searchParams.set("format", "js");
  url.searchParams.set("idx", "0");
  url.searchParams.set("n", "1");
  const $res = await fetch(url);
  const data = (await $res.json()) as Data;
  const { images } = data;
  return res.redirect(bingUrl + images[0]);
});
