// Axios Imports
import { axiosQqlykm } from './axios-qqlykm';
import { AxiosRequestConfig } from 'axios';

export function joke_get(req: AxiosRequestConfig = {}) {
  return axiosQqlykm<unknown, Res>({
    url: '/joke',
    ...req,
  });
}

export interface Res {
  joke: string;
}
