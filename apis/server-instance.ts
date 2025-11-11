import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (token: string | null, error: any = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

export const serverInstance = (accessToken?: string, refreshToken?: string) => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    responseType: 'json',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
    withCredentials: true,
  });
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);
  // 요청 인터셉터
  instance.interceptors.request.use(async config => {
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
      if (refreshToken) {
        config.headers['RefreshToken'] = refreshToken;
      }
    }
    return config;
  });

  // 응답 인터셉터 (401 처리)
  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers['Authorization'] = token;
                resolve(instance(originalRequest));
              },
              reject: (err: any) => reject(err),
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axios.post(`${BACKEND_URL}/auth/reissue`, null, {
            headers: {
              Authorization: accessToken ?? '',
              RefreshToken: refreshToken ?? '',
            },
            withCredentials: true,
          });
          const newAccessToken = res.data.data.accessToken;
          accessToken = newAccessToken;
          processQueue(newAccessToken);
          isRefreshing = false;

          originalRequest.headers['Authorization'] = newAccessToken;
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(null, refreshError);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
