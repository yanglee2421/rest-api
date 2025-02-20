#! pnpm tsx

import { createServer } from "node:http";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { writeFile, readFile, appendFile } from "node:fs/promises";
import { gzip } from "node:zlib";
import type { InputType } from "node:zlib";
import cors from "cors";
import express, { Router } from "express";
import type { RequestHandler, ErrorRequestHandler } from "express";
import { WebSocket, WebSocketServer } from "ws";
import { timeout } from "@/lib/timeout";

function errorHandler(): ErrorRequestHandler {
  return async (err, req, res, next) => {
    void req;
    void next;

    console.error(err);

    const path = resolve(process.cwd(), "./dev.log");
    await appendFile(path, `${String(err)}\n`, "utf-8");

    return res.status(500).send({
      msg: err.message,
      cause: err.cause,
    });
  };
}

function middLog(): RequestHandler {
  return async (req, res, next) => {
    void res;

    await writeFile(
      resolve(process.cwd(), "./dev.log"),
      `${new Date().toLocaleString()} ${req.path} ${req.method}\n`,
      { encoding: "utf-8", flag: "a" }
    );

    next();
  };
}

function corsHandle() {
  return cors((req, callback) => {
    const origin = ["http://localhost", "http://127.0.0.1"].includes(
      req.headers.origin || ""
    );
    callback(null, { origin });
  });
}

function toGzip(buffer: InputType) {
  return new Promise<Buffer>((res, rej) =>
    gzip(buffer, (err, compressed) => (err ? rej(err) : res(compressed)))
  );
}

function gzipHandle(): RequestHandler {
  return async (req, res, next) => {
    try {
      // Only Handle CSS & JS
      const isCss = req.url.endsWith(".css");
      const isJs = req.url.endsWith(".js");

      if (!isCss && !isJs) return next();

      // Not Allow Gzip
      const filePath = join(process.cwd(), req.originalUrl);
      const isAcceptGzip = req.headers["accept-encoding"]?.includes("gzip");
      if (!isAcceptGzip) return res.sendFile(filePath);

      // Has Allow Gzip
      const file = await readFile(filePath);
      const buffer = await toGzip(file);
      res.setHeader("Content-Encoding", "gzip");
      res.setHeader("Content-Type", isCss ? "text/css" : "text/javascript");
      return res.send(buffer);
    } catch (err) {
      return next(err);
    }
  };
}

const PORT = 8080;
const file = Router();
const routerStream = Router();
const hmisRouter = Router();
const khHmisRouter = Router();

khHmisRouter.post("/api/lzdx_csbtsj_get/get", (req, res) => {
  //
  const url = new URL(req.url, `http://${req.hostname}:${PORT}`);

  res.json({
    data: {
      mesureId: "A23051641563052",
      zh: "10911",
      zx: "RE2B",
      clbjLeft: "HEZD Ⅱ 18264",
      clbjRight: "HEZD Ⅱ 32744",
      czzzrq: "2003-01-16",
      czzzdw: "673",
      ldszrq: "2014-06-22",
      ldszdw: "673",
      ldmzrq: "20 18-04-13",
      ldmzdw: "623",
    },
    code: 200,
    msg: "success",
  });
});
khHmisRouter.post("/api/lzdx_csbtsj_get/get", (req, res) => {
  //
  const url = new URL(req.url, `http://${req.hostname}:${PORT}`);
});
khHmisRouter.post("/api/lzdx_csbtsj_get/get", (req, res) => {
  //
  const url = new URL(req.url, `http://${req.hostname}:${PORT}`);
});

hmisRouter.get("/api/getData", (req, res) => {
  // ?type=csbts&param=91022070168
  const url = new URL(req.url, `http://${req.hostname}:${PORT}`);
  const type = url.searchParams.get("type");
  if (type !== "csbts") throw new Error("type field error");

  const param = url.searchParams.get("param");
  if (!param) throw new Error("param is falsy");
  console.log(param);

  const [barCode, unitCode] = param.split(",");
  console.log(barCode, unitCode);
  if (!barCode) throw new Error("barCode is falsy");
  if (!unitCode) throw new Error("unitCode is falsy");

  res.json({
    code: "200",
    msg: "数据读取成功",
    data: [
      {
        CZZZDW: "048",
        CZZZRQ: "2009-10",
        MCZZDW: "131",
        MCZZRQ: "2018-07-09 00:00:00",
        SCZZDW: "131",
        SCZZRQ: "2018-07-09 00:00:00",

        DH: "91022070168",
        ZH: "67444",
        ZX: "RE2B",
        SRYY: "厂修",
        SRDW: "588",
      },
    ],
  });
});

hmisRouter.post("/api/saveData", (req, res) => {
  // ?type=csbts
  const url = new URL(req.url, `http://${req.hostname}:${PORT}`);
  const type = url.searchParams.get("type");
  if (type !== "csbts") throw new Error("type field is not csbts");

  console.log("req.body", req.body, req.headers["content-type"]);

  res.json({
    code: "200",
    msg: "数据上传成功",
  });
});

function toPublicFile(fileName: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return resolve(__dirname, `../../public/${fileName}`);
}

file.get("/pdf/:way", (req, res) => {
  const { way } = req.params;
  const filePath = toPublicFile("demo.pdf");

  switch (way) {
    case "download":
      return res.download(filePath);
    case "view":
      res.setHeader("Content-Type", "application/pdf");
      return res.sendFile(filePath);
    default:
      return res.status(500).send("Invalid Way");
  }
});

file.get("/image/:way", (req, res) => {
  const { way } = req.params;
  const filePath = toPublicFile("/img/bg.jpg");

  switch (way) {
    case "download":
      return res.download(filePath);
    case "view":
      res.setHeader("Content-Type", "image/jpeg");
      return res.sendFile(filePath);
    default:
      return res.status(500).send("Invalid Way");
  }
});

routerStream.get("/stream", async (req, res) => {
  void req;

  res.setHeader("Content-type", "application/octet-stream");

  const text = "为什么电脑永远不会生病？因为它有Windows（窗户）可以通风。";
  for (const chunk of text) {
    await timeout(1000);
    res.write(chunk);
  }

  return res.end();
});

const app = express();

app.use(corsHandle());
app.use(middLog());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/public",
  gzipHandle(),
  express.static(resolve(process.cwd(), "./public"))
);

app.use(hmisRouter);
app.use(khHmisRouter);
app.use(errorHandler());

const server = createServer(app);
const wss = new WebSocketServer({ server });
let data = "msg";

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.on("message", (message) => {
    data = message.toString();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.send(data);
});

server.listen(PORT, () => {
  console.info("standing by", PORT);
});
