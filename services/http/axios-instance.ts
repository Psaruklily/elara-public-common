import axios, { AxiosError, AxiosResponse } from 'axios';

export const backendUrl = process.env.REACT_APP_BACKEND_URL;

const defaultOptions = {
  timeout: 60000,
  withCredentials: true,
};

export const axiosInstance = (() => axios.create({ ...defaultOptions, baseURL: backendUrl }))();

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Global error handler
    console.error('Elara', error);
    return error;
  },
);
