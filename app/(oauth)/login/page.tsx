'use client';
import { useCallback } from 'react';
import { getUserManager } from '@/lib/oidc-client';
import Image from 'next/image';

export default function LoginPage() {
  const mgr = getUserManager();

  const handleLogin = useCallback(() => {
    mgr.signinRedirect();
  }, [mgr]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <button
          onClick={handleLogin}
          className="w-full transition-transform transform hover:scale-105 cursor-pointer"
        >
          <Image
            src="/kakao_login_medium_narrow.png"
            alt="카카오 로그인"
            width={183}
            height={45}
            priority
            className="mx-auto"
          />
        </button>
      </div>
    </div>
  );
}
