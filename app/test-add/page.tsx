'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Selector from '@/components/common/molecules/Selector';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';

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
    <TestAddLayout leftImageSrc="/test1.png" stepIndex={STEP_INDEX} onNext={handleNext}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">어떤 테스트를 모집하시나요?</p>
          <p className="text-body-02 text-Gray-300">
            선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
            <br />
            나중에 수정 가능하니 너무 걱정하지 마세요.
          </p>
        </div>

        <Selector<Category>
          options={Object.keys(CATEGORY_MAP) as Category[]}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </TestAddLayout>
  );
}
