// Axios Imports
import axios, { AxiosError } from "axios";

export const request = axios.create({
  baseURL: "https://promomart.espwebsite.com",
  timeout: 1000 * 30,
});

request.interceptors.request.use((config) => config);
request.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    console.error(err);
    throw new Error(err.message);
  }
);
