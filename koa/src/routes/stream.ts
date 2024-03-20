import { PassThrough } from "node:stream";
import Router from "@koa/router";

export const stream = new Router({ prefix: "/stream" });

stream.get("/", async (ctx, next) => {
  await next();

  ctx.set({
    "Content-type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new PassThrough();

  ctx.body = stream;

  ctx.req.on("close", () => {
    clearInterval(interval);
    stream.end();
  });

  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      stream.write(`event: message\ndata: ${text[index++]}\n\n`);
    } else {
      clearInterval(interval);
      stream.end("event: done\ndata: \n\n");
    }
  }, 100);
});

const text =
  "青阳昭武公回想他一生中最温软的时光，是在南淮城的街头，他和他心爱的女孩儿并着肩走，有时候羽然也会拉住他的手，而有的时候她蹦蹦跳跳地走在前面，高声呼喊让他走快一些，曾经在那些深寂的小巷里，她没来由地唱歌，这时吕归尘总是以为他是在做一个很漫长的梦，长到不会再醒来。";
