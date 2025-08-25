'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/common/atoms/Button';
import { useRouter } from 'next/navigation';

export default function TestAddFinishPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.removeItem('testAddForm');
    } catch {}
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="relative w-[234px] h-[234px]">
        <Image
          src="/testAddFinish1.gif"
          alt="gif 1"
          fill
          priority
          className="object-contain w-[82px] "
        />
        <Image
          src="/testAddFinish2.gif"
          alt="gif 2"
          fill
          priority
          className="object-contain w-[234px]"
        />
      </div>
      <div className="text-center">
        <p className="text-head font-bold">프로젝트가 성공적으로 등록되었어요!</p>
        <p className="text-subtitle-02 text-Dark-Gray text-semibold mt-2">
          참가자가 테스트 신청을 하면 알람을 통해 알려드릴게요
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          State="Default"
          Size="lg"
          label="홈으로 돌아가기"
          onClick={() => router.push('/')}
        />
        <Button
          State="Sub"
          Size="lg"
          label="프로젝트 관리하러 가기"
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  );
}
