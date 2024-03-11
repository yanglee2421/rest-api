import axios from 'axios';
import type { AxiosError } from 'axios';

export const axiosBing = axios.create({
  baseURL: '',
  timeout: 1000 * 30,
});

axiosBing.interceptors.request.use((config) => config);
axiosBing.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    const { message } = err;
    throw new Error(message);
  },
);
