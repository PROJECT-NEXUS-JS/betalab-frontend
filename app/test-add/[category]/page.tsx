'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';
import { makeHandleNext } from '@/lib/test-add/make-handle-next';

const UI_TO_API: Record<string, string> = {
  Android: 'ANDROID',
  iOS: 'IOS',
  무관: 'ANY',
  'PC 클라이언트': 'PC',
  'Stream VR': 'STEAM_VR',
  'Play Station': 'PLAYSTATION',
  Xbox: 'XBOX',
  'Meta Quest': 'META_QUEST',
  기타: 'ETC',
};

const API_TO_UI: Record<string, string> = Object.fromEntries(
  Object.entries(UI_TO_API).map(([ui, api]) => [api, ui]),
);

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

export default function TestAddPlatformStep() {
  const { category } = useParams<{ category: string }>();
  const STEP_INDEX = 1;
  const router = useRouter();
  const { form, update } = useTestAddForm();

  const options = useMemo(() => PLATFORM_MAP[category] ?? [], [category]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const api = Array.isArray(form.platformCategory) ? form.platformCategory[0] : undefined;
    const ui = api ? API_TO_UI[api] : undefined;
    if (ui && options.includes(ui)) setSelected(ui);
  }, [form.platformCategory, options]);

  const handleNext = makeHandleNext(form, update, router.push, {
    select: () => ({ platformCategory: selected ? [UI_TO_API[selected]] : [] }),
    validate: () => (selected ? null : '플랫폼을 선택해주세요!'),
    next: `/test-add/${category}/genre`,
  });

  return (
    <TestAddLayout leftImageSrc="/test1.png" stepIndex={STEP_INDEX} onNext={handleNext}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">어떤 플랫폼을 이용해야 될까요?</p>
          <p className="text-body-02 text-Gray-300">선택한 항목은 나중에도 변경할 수 있어요.</p>
        </div>

        <Selector<string> options={options} selected={selected} onSelect={setSelected} />
      </div>
    </TestAddLayout>
  );
}
