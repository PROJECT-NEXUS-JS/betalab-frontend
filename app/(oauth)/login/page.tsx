'use client';
import { useCallback, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import BetalabLogo from '@/components/common/svg/BetalabLogo';
import Button from '@/components/common/atoms/Button';
import KakaoButton from '@/components/auth/KakaoButton';
import { getUserManager } from '@/lib/oidc-client';

export default function LoginPage() {
  const mgr = getUserManager();

  const handleLogin = useCallback(() => {
    mgr.signinRedirect();
  }, [mgr]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-White gap-[97px]">
      <div className="flex flex-col items-center gap-3">
        <Image alt="Betalab 로고" src="/betalab_description2.gif" width={146} height={48} />
        <BetalabLogo className="mx-auto mb-6 w-[336px]" />
      </div>
      <div className="w-[300px] flex flex-col items-center gap-6">
        <KakaoButton
          size="md"
          width="wide"
          align="left"
          label="카카오 로그인"
          onClick={handleLogin}
        />
        <Button Size="md" State="Text btn" label="그냥 둘러보기" onClick={() => {}} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RedirectUrlSetter />
      </Suspense>
    </div>
  );
}

function RedirectUrlSetter() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectedFrom = searchParams.get('redirectedFrom');
    if (redirectedFrom) {
      localStorage.setItem('redirectedFrom', redirectedFrom);
    }
  }, [searchParams]);
  return null;
}
