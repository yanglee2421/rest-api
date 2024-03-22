import { PrismaClient } from "@prisma/client";
import Router from "@koa/router";
import { z } from "zod";

export const router = new Router({ prefix: "/prisma" });
const prisma = new PrismaClient();

router.post("/create", async (ctx, next) => {
  await next();

  const user = schema.parse(ctx.request.body);

  const data = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
    },
  });

  if (data) {
    ctx.body = data;
  }
});

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
});
