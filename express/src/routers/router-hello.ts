import { Router } from "express";
import { shopify } from "@/utils";

export const routerHello = Router();
routerHello.post("/", (req, res) => {
  console.log(req.headers);
  res.json({ msg: "hello express" });
});

routerHello.get("/api/auth", async (req, res, next) => {
  try {
    const data = await shopify.auth.begin({
      rawRequest: req,
      rawResponse: res,
      shop: "woolworlds.myshopify.com",
      callbackPath: "/api/auth/callback",
      isOnline: false,
    });

    console.log(data);
  } catch (error) {
    next(error);
  }
});

routerHello.get("/api/auth/callback", async (req, res, next) => {
  try {
    const data2 = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    console.log(data2);
  } catch (error) {
    next(error);
  }
});
