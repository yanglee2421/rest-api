import axios, { AxiosError } from "axios";

export const request = axios.create({
  baseURL: "",
  timeout: 1000 * 60,
});

request.interceptors.request.use((config) => config);
request.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    const { message, response } = err;
    throw new Error(message, { cause: response });
  }
);
