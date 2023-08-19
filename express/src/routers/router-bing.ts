// Express Imports
import { Router } from "express";

// API Imports
import { bing_get } from "@/api";

export const bing = Router();

bing.get("/", async (req, res) => {
  const { idx = "0", n = "8" } = req.query as Record<string, string>;
  throw new Error("msg");

  const data = await bing_get({
    params: { format: "js", idx: Number(idx), n: Number(n) },
  });

  return res.json(data);
});
