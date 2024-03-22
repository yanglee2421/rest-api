import { HttpError } from "koa";
import type { Middleware } from "koa";

export function errorHandler(): Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof HttpError) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = { message: err.message };

        return;
      }

      if (err instanceof Error) {
        ctx.status = 500;
        ctx.body = err;

        return;
      }
    }
  };
}
