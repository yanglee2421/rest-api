// Express Imports
import { ErrorRequestHandler } from "express";

export function errorHandler(): ErrorRequestHandler {
  return (err, req, res, next) => {
    console.error(req.path, next.length);

    return res.status(500).send({
      msg: err.message,
      cause: err.cause,
    });
  };
}
