// Express Imports
import { ErrorRequestHandler } from "express";

export function errorHandler(): ErrorRequestHandler {
  return (err, req, res, next) => {
    console.error(req.path);
    console.error(err);

    void next;
    return res.status(500).send({
      msg: err.message,
      cause: err.cause,
    });
  };
}
