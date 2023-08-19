import axios, { AxiosError, AxiosResponse } from 'axios';

export const axiosQqlykm = axios.create({
  baseURL: 'https://qqlykm.cn/api',
  timeout: 1000 * 30,
});

axiosQqlykm.interceptors.request.use((config) => {
  const params = Object(config.params);
  Reflect.set(params, 'key', 'GY7rE1J3f4ovi4wGONXshLHOHv');
  config.params = params;
  return config;
});
axiosQqlykm.interceptors.response.use(
  (res) => {
    const resData = res.data as Data;
    const { success, data, text } = resData;

    if (success) return data as AxiosResponse;
    throw new Error(text.msg);
  },
  (err: AxiosError) => {
    const { message } = err;
    throw new Error(message);
  },
);

interface Data {
  success: true;
  data: unknown;
  text: {
    msg: '获取成功';
    copyright: '公共API https://qqlykm.cn';
    time: '当前请求时间为：2023-08-19 20:21:18';
  };
}
