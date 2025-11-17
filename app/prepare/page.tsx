'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/atoms/Button';

export default function PreparePage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white px-16 py-56">
      <div className="w-full max-w-[1024px] flex flex-col justify-start items-center gap-10">
        <div className="relative w-72 h-56">
          <Image src="/images/404.svg" alt="404 Error" fill className="object-contain" priority />
        </div>
        <div className="w-full max-w-[384px] flex flex-col justify-start items-center gap-2">
          <h1 className="self-stretch text-center text-gray-900 text-3xl font-bold font-['SUIT_Variable'] leading-[48px]">
            Oops ! 실험 실패
          </h1>
          <p className="self-stretch text-center text-gray-600 text-xl font-bold font-['SUIT_Variable'] leading-8">
            요청하신 페이지를 찾을 수 없어요
            <br />
            다시 시도해주세요
          </p>
        </div>

        <Button
          State="Default"
          Size="xl"
          label="홈으로 돌아가기"
          onClick={() => router.push('/')}
          className="h-12 px-6 bg-gray-200 rounded-[1px] text-gray-600 text-sm font-bold font-['SUIT_Variable'] leading-5"
        />
      </div>
    </div>
  );
}
