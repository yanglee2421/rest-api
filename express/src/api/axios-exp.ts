// Axios Imports
import axios, { AxiosError } from "axios";

export const axiosExp = axios.create({
  baseURL: "",
  timeout: 1000 * 30,
});

axiosExp.interceptors.request.use((config) => config);
axiosExp.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    throw new Error(err.message);
  }
);
