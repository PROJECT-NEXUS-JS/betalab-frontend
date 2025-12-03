'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';
import { makeHandleNext } from '@/lib/test-add/make-handle-next';

const CATEGORY_MAP = {
  앱: 'app',
  웹: 'web',
  게임: 'game',
} as const;
type Category = keyof typeof CATEGORY_MAP;

const API_MAIN_CATEGORY: Record<Category, string[]> = {
  앱: ['APP'],
  웹: ['WEB'],
  게임: ['GAME'],
};

export default function TestAddCategoryStep() {
  const STEP_INDEX = 0;
  const router = useRouter();
  const { form, update } = useTestAddForm();
  const [selected, setSelected] = useState<Category | null>(null);

  const handleNext = makeHandleNext(form, update, router.push, {
    select: () => ({ mainCategory: selected ? API_MAIN_CATEGORY[selected] : [] }),
    validate: () => (selected ? null : '카테고리를 선택해주세요!'),
    next: merged => {
      const cat = merged.mainCategory?.[0];
      const slug = cat === 'WEB' ? 'web/genre' : CATEGORY_MAP[selected as Category];
      return `/test-add/${slug}`;
    },
  });

  return (
    <TestAddLayout leftImageSrc="/test1.png" stepIndex={STEP_INDEX} onNext={handleNext}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">어떤 테스트를 모집하시나요?</p>
          <p className="text-body-02 text-Gray-300">
            선택한 카테고리는 나중에 언제든 바꿀 수 있어요.
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
