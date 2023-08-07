import { request } from "./request";

export function get_html(productID: string) {
  return request<unknown, string>({
    url: "/ProductDetails",
    params: { productID },
  });
}
