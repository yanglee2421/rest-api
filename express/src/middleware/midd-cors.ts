import cors from "cors";

export function middCors() {
  return cors((req, callback) => {
    const wl = whiteList();
    const origin = wl.includes(req.headers.origin || "");
    callback(null, { origin });
  });
}

function whiteList() {
  return ["http://localhost"];
}
