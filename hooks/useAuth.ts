"use client";

import { useEffect, useState } from "react";

// 간단하게 액세스토큰 여부로만 로그인 상태를 판별합니다.
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const cookies = document.cookie.split(";");
      const accessToken = cookies.find((cookie) =>
        cookie.trim().startsWith("accessToken=")
      );

      setIsLoggedIn(!!accessToken);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  return {
    isLoggedIn,
    isLoading,
  };
}
