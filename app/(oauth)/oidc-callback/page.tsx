// src/app/oidc-callback/page.tsx (최종 수정)
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserManager } from '@/lib/oidc-client';
import type { User } from 'oidc-client-ts';

export default function OidcCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const mgr = getUserManager();
        const user: User | null = await mgr.signinRedirectCallback();

        if (!user || !user.id_token) {
          throw new Error('OIDC 유저 정보 또는 id_token을 받지 못했습니다.');
        }

        const res = await fetch(`/api/auth/login`, {
          method: 'POST',
          headers: { id_token: user.id_token },
          credentials: 'include',
        });
        const responseData = await res.json();

        if (responseData.success && responseData.accessToken) {
          localStorage.setItem('accessToken', responseData.accessToken); // 👉 저장
          window.location.href = '/';
        } else {
          throw new Error(responseData.message || '로그인 처리 실패');
        }
      } catch (error) {
        console.error('OIDC 콜백 처리 중 오류 발생:', error);
        router.replace('/login?error=callback_failed');
      }
    };

    processCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white text-center">
        <p className="text-xl">로그인 처리 중입니다...</p>
        <p className="text-gray-400">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
