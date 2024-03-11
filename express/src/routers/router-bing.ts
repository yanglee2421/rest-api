import { Router } from "express";
import { bing_get } from "@api/bing/bing_get";

export const bing = Router();

bing.get("/", async (req, res, next) => {
  const { idx = "0", n = "8" } = req.query as Record<string, string>;

  try {
    const data = await bing_get({
      params: { format: "js", idx: Number(idx), n: Number(n) },
    });

    return res.json(data);
  } catch (err) {
    next(err);
  }
});
