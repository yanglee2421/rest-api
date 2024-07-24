import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";

export const userRouter = new Router({ prefix: "/user" });

const prisma = new PrismaClient();

userRouter.get("/", async (ctx, next) => {
  await next();

  ctx.body = await prisma.user.findMany();
});
