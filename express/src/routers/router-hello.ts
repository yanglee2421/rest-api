import { Router } from "express";

export const routerHello = Router();
routerHello.post("/", (req, res) => {
  console.log(req.headers);
  res.json({ msg: "hello express" });
});
