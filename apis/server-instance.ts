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
  let currentAccessToken = accessToken;
  let currentRefreshToken = refreshToken;

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
    if (currentAccessToken) {
      config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
    }
    if (currentRefreshToken) {
      config.headers['RefreshToken'] = currentRefreshToken;
    }
    return config;
  });

  // 응답 인터셉터 (401 처리)
  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (!currentRefreshToken) {
          return Promise.reject(error);
        }

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
              Authorization: currentAccessToken ? `Bearer ${currentAccessToken}` : '',
              RefreshToken: currentRefreshToken,
            },
            withCredentials: true,
          });
          const newAccessToken = res.data.data.accessToken;
          const newRefreshToken = res.data.data.refreshToken ?? currentRefreshToken;

          currentAccessToken = newAccessToken ?? currentAccessToken;
          currentRefreshToken = newRefreshToken;

          processQueue(currentAccessToken ?? '');
          isRefreshing = false;

          if (currentAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${currentAccessToken}`;
          }
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
