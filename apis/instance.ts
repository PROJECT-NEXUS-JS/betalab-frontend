import axios from 'axios';
import { showToast } from '@/components/common/toast/ToastHost';
import { getToastConfig } from '@/lib/toast-messages';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 401 → 자동 리프레시 후 재시도
let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
}

instance.interceptors.response.use(
  response => {
    const data = response.data;
    if (data && typeof data === 'object' && 'code' in data) {
      const { code, message } = data;

      const method = response.config.method?.toUpperCase();
      const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '');
      const skipToast = (response.config as any).skipToast;

      if (!skipToast && (isMutation || code)) {
        const toastConfig = getToastConfig(code, response.status, message);
        if (toastConfig) {
          showToast(toastConfig);
        }
      }
    }

    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(instance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post('/auth/reissue', null, {
          withCredentials: true,
        });

        const newAccessToken = res.data.message;
        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.setItem('redirectedFrom', window.location.href);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const errorData = error.response?.data;
    if (errorData && typeof errorData === 'object' && 'code' in errorData) {
      const { code, message } = errorData;
      const skipToast = (error.config as any)?.skipToast;

      if (!skipToast) {
        const toastConfig = getToastConfig(code, error.response?.status, message);
        if (toastConfig) {
          showToast(toastConfig);
        }
      }
    }

    return Promise.reject(error);
  },
);
