import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

export const serverInstance = (accessToken?: string) => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    responseType: 'json',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
    withCredentials: true,
  });

  // 요청 인터셉터
  instance.interceptors.request.use(async config => {
    if (!accessToken) {
      try {
        const res = await axios.post(`/auth/reissue`, null, { withCredentials: true });
        accessToken = res.data.accessToken;
      } catch (err) {
        console.error('액세스 토큰 재발급 실패:', err);
      }
    }
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  // 응답 인터셉터 (401 처리)
  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await axios.post('/auth/reissue', null, {
            withCredentials: true,
          });

          const newAccessToken = res.data.message;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
