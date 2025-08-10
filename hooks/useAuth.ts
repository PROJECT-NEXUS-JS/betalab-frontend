'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  return {
    isLoggedIn,
    isLoading,
  };
}
