'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
    setIsLoading(false);
    handleLoginSuccess;
  }, []);

  return {
    isLoggedIn,
    isLoading,
  };
}

export const handleLoginSuccess = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['get-my-page-profile'] });
  queryClient.invalidateQueries({ queryKey: ['user'] });
};
