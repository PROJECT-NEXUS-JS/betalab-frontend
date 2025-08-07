'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StepNextButton from '@/components/common/molecules/StepNextButton';
import CarouselBar from '@/components/common/molecules/CarouselBar';
import Chip from '@/components/common/atoms/Chip';
import Button from '@/components/common/atoms/Button';

const PLATFORM_MAP: Record<string, string[]> = {
  app: ['Android', 'iOS', '무관'],
  game: [
    'Android',
    'iOS',
    'PC 클라이언트',
    'Stream VR',
    'Play Station',
    'Xbox',
    'Meta Quest',
    '기타',
  ],
};

export default function TestAddCategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const STEP_INDEX = 1;

  const platforms = PLATFORM_MAP[category as string];
  const storageKey = `temp-platform-${category}`;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved && platforms?.includes(saved)) {
        setSelectedPlatform(saved);
      }
    }
  }, [category]);

  if (!platforms) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-subtitle-01 font-bold">알 수 없는 카테고리입니다: {category}</p>
      </main>
    );
  }

  const handleSave = () => {
    if (!selectedPlatform) {
      alert('선택된 플랫폼이 없습니다.');
      return;
    }

    localStorage.setItem(storageKey, selectedPlatform);
    alert('임시 저장 되었습니다.');
  };

  return (
    <main className="flex min-h-screen w-full">
      <div className="w-1/4 bg-gradient-to-b from-white to-[#D4EED8] relative">
        <Image src="/test2.png" alt="테스트 이미지" fill className="object-cover" priority />
      </div>
      <div className="w-1/2 flex flex-col justify-between px-12 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-subtitle-01 font-bold">어떤 플랫폼을 이용해야될까요?</p>
            <p className="text-body-02 text-Gray-300">
              선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
              <br />
              나중에 수정 가능하니 너무 걱정하지 마세요.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {platforms.map(platform => (
              <Chip
                key={platform}
                variant={selectedPlatform === platform ? 'active' : 'solid'}
                size="sm"
                onClick={() => setSelectedPlatform(platform)}
              >
                {platform}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button State="Sub" Size="xl" label="임시 저장" onClick={handleSave} />
          <div className="flex-1 flex justify-center">
            <CarouselBar activeIndex={STEP_INDEX} total={10} />
          </div>
          <StepNextButton
            onClick={() => {
              if (selectedPlatform) {
                console.log(`선택된 플랫폼: ${selectedPlatform}`);
              } else {
                alert('플랫폼을 선택해주세요!');
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
