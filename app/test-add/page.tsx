'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CategorySelector from '@/components/common/molecules/CategorySelector';
import StepNextButton from '@/components/common/molecules/StepNextButton';
import CarouselBar from '@/components/common/molecules/CarouselBar';

const CATEGORY_MAP = {
  앱: 'app',
  웹: 'web',
  게임: 'game',
  기타: 'etc',
} as const;

type Category = keyof typeof CATEGORY_MAP;

export default function TestAddPage() {
  const [selected, setSelected] = useState<Category | null>(null);
  const STEP_INDEX = 0;
  const router = useRouter();

  const handleNext = () => {
    if (!selected) return alert('카테고리를 선택해주세요!');
    const slug = CATEGORY_MAP[selected];
    if (slug === 'web') {
      router.push(`/test-add/web/genre`);
    } else {
      router.push(`/test-add/${slug}`);
    }
  };

  return (
    <main className="flex min-h-screen w-full">
      <div className="w-1/4 bg-gradient-to-b from-white to-[#D4EED8] relative">
        <Image src="/test1.png" alt="테스트 이미지" fill className="object-center" priority />
      </div>

      <div className="w-1/2 flex flex-col justify-between px-12 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-subtitle-01 font-bold">어떤 테스트를 모집하시나요?</p>
            <p className="text-body-02 text-Gray-300">
              선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
              <br />
              나중에 수정 가능하니 너무 걱정하지 마세요.
            </p>
          </div>

          <CategorySelector selected={selected} onSelect={setSelected} />
        </div>

        <div className="flex items-center justify-between mt-6">
          <CarouselBar activeIndex={STEP_INDEX} total={10} />
          <StepNextButton onClick={handleNext} />
        </div>
      </div>
    </main>
  );
}
