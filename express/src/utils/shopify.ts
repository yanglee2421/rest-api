import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";

import { URL, fileURLToPath } from "node:url";

export const shopify = shopifyApi({
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  hostName: "localhost:3001",
  apiKey: "4a2d5c847adfd2b045597be70fdb136a",
  apiSecretKey: "9607b5ca3ed6c326fafe4a5788a76f2b",
  scopes: ["read_products", "write_products"],
  sessionStorage: new SQLiteSessionStorage(
    fileURLToPath(new URL("./database.sqlite", import.meta.url))
  ),
});
