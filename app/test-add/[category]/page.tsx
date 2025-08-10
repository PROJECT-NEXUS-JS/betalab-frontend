'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';

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
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const STEP_INDEX = 1;

  const platforms = useMemo(() => PLATFORM_MAP[category], [category]);
  const storageKey = useMemo(() => `temp-platform-${category}`, [category]);

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
    if (saved && platforms?.includes(saved)) setSelectedPlatform(saved);
  }, [storageKey, platforms]);

  const handleSelect = (value: string) => {
    setSelectedPlatform(value);
    localStorage.setItem(storageKey, value);
  };

  const handleNext = () => {
    if (!selectedPlatform) return alert('플랫폼을 선택해주세요!');
    router.push(`/test-add/${category}/genre`);
  };

  return (
    <TestAddLayout leftImageSrc="/test1.png" stepIndex={STEP_INDEX} onNext={handleNext}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">어떤 플랫폼을 이용해야 될까요?</p>
          <p className="text-body-02 text-Gray-300">선택한 항목은 나중에도 변경할 수 있어요.</p>
        </div>

        <Selector<string> options={platforms} selected={selectedPlatform} onSelect={handleSelect} />
      </div>
    </TestAddLayout>
  );
}
