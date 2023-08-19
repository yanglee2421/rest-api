import axios from "axios";
import { Router } from "express";

interface bingData {
  images: any[];
}

/**
 * 代理必应每日壁纸接口
 */
export const bing = Router();

bing.get("/bing", async (req, res) => {
  // ** Query
  const { idx = "0", n = "8" } = req.query as Record<string, string>;

  // **
  const url = new URL("https://cn.bing.com/HPImageArchive.aspx");
  url.searchParams.set("format", "js");
  url.searchParams.set("idx", idx);
  url.searchParams.set("n", n);
  const bingUrl = "https://cn.bing.com";
  void bingUrl;

  const rows = await axios.get(url.toString());

  return res.json({
    isOk: true,
    rows: rows.data,
  });
});
