import axios, { AxiosError } from "axios";

export const axiosKoa = axios.create({
  baseURL: "",
  timeout: 1000 * 60,
});

axiosKoa.interceptors.request.use((config) => config);
axiosKoa.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    const { message, response } = err;
    throw new Error(message, { cause: response });
  }
);
