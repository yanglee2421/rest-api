import { request } from "./request";

interface Req {
  format: "js" | "xml";
  idx: number;
  n: number;
}

export function get_bing(req?: Partial<Req>) {
  const init: Req = {
    format: "js",
    idx: 0,
    n: 1,
  };
  const params = Object.assign(init, req);

  return request({
    url: "https://cn.bing.com/HPImageArchive.aspx",
    params,
  });
}
