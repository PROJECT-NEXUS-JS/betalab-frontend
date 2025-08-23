'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';

const APP_GENRES = [
  '라이프 스타일',
  '교육/학습',
  '소셜/커뮤니티',
  'AI/실험적 기능',
  '생산성/도구',
  '커머스/쇼핑',
  '건강/운동',
  '엔터테인먼트',
  '금융/자산관리',
  '비즈니스/직장인',
  '사진/영상',
  '기타',
] as const;

type AppGenre = (typeof APP_GENRES)[number];

const UI_TO_API: Record<AppGenre, string> = {
  '라이프 스타일': 'LIFESTYLE',
  '교육/학습': 'EDU_CONTENT',
  '소셜/커뮤니티': 'COMMUNITY_SOCIAL',
  'AI/실험적 기능': 'AI_EXPERIMENTAL',
  '생산성/도구': 'PRODUCTIVITY_TOOL',
  '커머스/쇼핑': 'COMMERCE_SHOPPING',
  '건강/운동': 'HEALTH_FITNESS',
  엔터테인먼트: 'ENTERTAINMENT',
  '금융/자산관리': 'FINANCE_ASSET',
  '비즈니스/직장인': 'BUSINESS',
  '사진/영상': 'PHOTO_VIDEO',
  기타: 'ETC',
};

const API_TO_UI: Record<string, AppGenre> = Object.fromEntries(
  Object.entries(UI_TO_API).map(([ui, api]) => [api, ui as AppGenre]),
) as Record<string, AppGenre>;

export default function AppGenreStep() {
  const STEP_INDEX = 2;
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const options = useMemo(() => [...APP_GENRES] as AppGenre[], []);
  const [selected, setSelected] = useState<AppGenre | null>(null);

  useEffect(() => {
    const api = Array.isArray(form.genreCategories) ? form.genreCategories[0] : undefined;
    const ui = api ? API_TO_UI[api] : undefined;
    if (ui && options.includes(ui)) setSelected(ui);
  }, [form.genreCategories, options]);

  const handleSelect = (value: AppGenre) => setSelected(value);

  const handleNext = () => {
    if (!selected) return alert('장르를 선택해주세요!');
    update({ genreCategories: [UI_TO_API[selected]] });
    router.push('/test-add/app/name');
  };

  return (
    <TestAddLayout
      leftImageSrc="/test1.png"
      stepIndex={STEP_INDEX}
      onNext={handleNext}
      showSave
      onSave={save}
      saveLabel="임시 저장"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">
            어떤 장르의 베타서비스인가요?
            <br />
            선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
          </p>
          <p className="text-body-02 text-Gray-300">나중에 수정 가능하니 너무 걱정하지 마세요.</p>
        </div>

        <Selector<AppGenre> options={options} selected={selected} onSelect={handleSelect} />
      </div>
    </TestAddLayout>
  );
}
