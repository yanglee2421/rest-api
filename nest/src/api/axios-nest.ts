import axios, { AxiosError } from 'axios';

export const axiosNest = axios.create({
  baseURL: '',
  timeout: 1000 * 30,
});

axiosNest.interceptors.request.use((config) => config);
axiosNest.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    const { message } = err;
    throw new Error(message);
  },
);
