import { PassThrough } from "node:stream";
import Router from "@koa/router";
import { timeout } from "@utils/timeout";

export const stream = new Router({ prefix: "/stream" });

stream.get("/", async (ctx, next) => {
  await next();

  //   ctx.set("Content-type", "application/octet-stream");
  ctx.set("Content-type", "application/octet-stream");

  const stream = new PassThrough();

  ctx.body = stream;

  for (const i of text) {
    await timeout(100);
    stream.push(i);
  }
  stream.push(null);
});

const text =
  "青阳昭武公回想他一生中最温软的时光，是在南淮城的街头，他和他心爱的女孩儿并着肩走，有时候羽然也会拉住他的手，而有的时候她蹦蹦跳跳地走在前面，高声呼喊让他走快一些，曾经在那些深寂的小巷里，她没来由地唱歌，这时吕归尘总是以为他是在做一个很漫长的梦，长到不会再醒来。";