// Koa Imports
import { Middleware } from "koa";

export function errorHandler(): Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err: any) {
      console.error(err);

      ctx.status = err.statusCode || err.status || 500;
      ctx.body = { message: err.message };
    }
  };
}
