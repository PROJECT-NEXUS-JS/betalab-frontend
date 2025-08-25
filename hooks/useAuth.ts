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

  // storage 이벤트는 한 번만 등록
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

  return {
    isLoggedIn,
    isLoading,
    handleLoginSuccess,
    invalidateUserQueries,
  };
}
