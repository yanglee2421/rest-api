import cors from "cors";

export function useCors() {
  const wl = whiteList();
  return cors((req, callback) => {
    const origin = wl.includes(req.headers.origin || "");
    callback(null, { origin });
  });
}

function whiteList() {
  return ["http://127.0.0.1", "http://localhost", "http://192.168.1.4"];
}
