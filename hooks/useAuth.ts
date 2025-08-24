'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const invalidateUserQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['get-my-page-profile'] });
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, [queryClient]);

  const handleLoginSuccess = useCallback(() => {
    invalidateUserQueries();
  }, [invalidateUserQueries]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const newIsLoggedIn = !!token;
    setIsLoggedIn(newIsLoggedIn);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const newIsLoggedIn = !!token;

    if (newIsLoggedIn !== isLoggedIn) {
      setIsLoggedIn(newIsLoggedIn);
      if (newIsLoggedIn) {
        invalidateUserQueries();
      }
    }
  }, [pathname, isLoggedIn, invalidateUserQueries]);

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
