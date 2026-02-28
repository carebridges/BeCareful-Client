'use client';

import axios from 'axios';

const getBaseUrl = (): string => {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  try {
    const meta = import.meta as ImportMeta & {
      readonly env: {
        readonly VITE_APP_API_URL?: string;
        [key: string]: string | boolean | undefined;
      };
    };

    if (meta.env?.VITE_APP_API_URL) {
      return meta.env.VITE_APP_API_URL;
    }
  } catch (e) {
    console.log(e);
  }

  return '';
};

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return Promise.reject(new axios.CanceledError('오프라인 상태입니다.'));
  }

  return config;
});
