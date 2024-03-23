import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const router = new Router({ prefix: "/prisma" });
const prisma = new PrismaClient();

router.post("/user/create", async (ctx, next) => {
  await next();

  const user = schema.parse(ctx.request.body);

  const data = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
    },
  });

  ctx.body = data;
});

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
});

router.get("/user", async (ctx, next) => {
  await next();

  const user = manySchema.parse(ctx.query);

  const data = await prisma.user.findMany({
    where: {
      name: user.name ? { contains: user.name } : void 0,
    },
    take: user.pageSize,
    skip: (user.page - 1) * user.pageSize,
  });

  ctx.body = data;
});

const manySchema = z.object({
  name: z.string().optional(),
  page: z
    .string()
    .default("1")
    .transform(Number)
    .refine(
      (value) => {
        return z.number().safeParse(Number(value)).success;
      },
      {
        message: "excepted a int",
      },
    ),
  pageSize: z
    .string()
    .default("20")
    .transform(Number)
    .refine(
      (value) => {
        return z.number().safeParse(Number(value)).success;
      },
      {
        message: "excepted a int",
      },
    ),
});

router.get("/user/:id", async (ctx, next) => {
  await next();

  const params = oneSchema.parse(ctx.params);

  const data = await prisma.user.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });

  ctx.body = data;
});

const oneSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .refine(
      (value) => {
        return z.number().safeParse(value).success;
      },
      (value) => {
        return {
          message: value + "is not a int",
        };
      },
    ),
});

router.get("/post/many", async (ctx, next) => {
  await next();

  const data = await prisma.post.findMany({
    where: {
      authorId: 1,
    },
  });

  ctx.body = data;
});
