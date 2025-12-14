'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getUserManager } from '@/lib/oidc-client';
import type { User } from 'oidc-client-ts';
import { useUserInfoQuery } from '@/hooks/auth/queries/useUserInfoQuery';

export default function OidcCallbackPage() {
  const router = useRouter();
  const [isTokenReady, setIsTokenReady] = useState(false);
  const { data: user, isLoading } = useUserInfoQuery(isTokenReady);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const mgr = getUserManager();
        const user: User | null = await mgr.signinRedirectCallback();

        if (!user || !user.id_token) {
          throw new Error('OIDC 유저 정보 또는 id_token을 받지 못했습니다.');
        }

        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { id_token: user.id_token },
          credentials: 'include',
        });
        const responseData = await res.json();

        if (!responseData.success || !responseData.data.accessToken) {
          throw new Error(responseData.message || '로그인 처리 실패');
        }

        localStorage.setItem('accessToken', responseData.data.accessToken);
        // 같은 탭에서 localStorage 변경을 감지하기 위한 커스텀 이벤트 발생
        window.dispatchEvent(new Event('localStorageChange'));
        setIsTokenReady(true);
      } catch (error) {
        router.replace('/login?error=callback_failed');
      }
    };

    processCallback();
  }, [router]);

  useEffect(() => {
    if (!isLoading && user) {
      const originalUrl = localStorage.getItem('redirectedFrom') || '/';
      if (user.roleType === 'ROLE_GUEST') {
        console.log('게스트 유저로 로그인되었습니다.');
        router.replace('/login/gender-birth');
      } else {
        router.replace(originalUrl);
        localStorage.removeItem('redirectedFrom');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white text-center">
        <p className="text-xl">로그인 처리 중입니다...</p>
        <p className="text-gray-400">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
