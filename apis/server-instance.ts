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
      return Promise.reject(error);
    },
  );

  return instance;
};
