import cors from "cors";

export function corsHandle() {
  return cors((req, callback) => {
    const origin = ["http://localhost"].includes(req.headers.origin || "");
    callback(null, { origin });
  });
}
