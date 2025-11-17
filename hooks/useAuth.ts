'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useCallback, useRef } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const isInitialized = useRef(false);

  const invalidateUserQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['get-my-page-profile'] });
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, [queryClient]);

  const handleLoginSuccess = useCallback(() => {
    invalidateUserQueries();
  }, [invalidateUserQueries]);

  // 초기 로딩 시 한 번만 실행
  useEffect(() => {
    if (isInitialized.current) return;

    const token = localStorage.getItem('accessToken');
    const newIsLoggedIn = !!token;
    setIsLoggedIn(newIsLoggedIn);
    setIsLoading(false);
    isInitialized.current = true;
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        const newIsLoggedIn = !!e.newValue;
        setIsLoggedIn(newIsLoggedIn);

        if (newIsLoggedIn) {
          invalidateUserQueries();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [invalidateUserQueries]);

  // 같은 탭에서의 localStorage 변경 감지 (커스텀 이벤트)
  useEffect(() => {
    const handleLocalStorageChange = () => {
      const token = localStorage.getItem('accessToken');
      const newIsLoggedIn = !!token;
      setIsLoggedIn(newIsLoggedIn);

      if (newIsLoggedIn) {
        invalidateUserQueries();
      }
    };

    // 커스텀 이벤트 리스너 등록
    window.addEventListener('localStorageChange', handleLocalStorageChange);
    return () => window.removeEventListener('localStorageChange', handleLocalStorageChange);
  }, [invalidateUserQueries]);

  return {
    isLoggedIn,
    isLoading,
    handleLoginSuccess,
    invalidateUserQueries,
  };
}
