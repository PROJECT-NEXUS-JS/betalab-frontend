'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';
import CheckTag from '@/components/common/atoms/CheckTag';
import Chip from '@/components/common/atoms/Chip';

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
  '교육/학습': 'EDUCATION',
  '소셜/커뮤니티': 'SOCIAL',
  'AI/실험적 기능': 'AI_EXPERIMENTAL',
  '생산성/도구': 'PRODUCTIVITY',
  '커머스/쇼핑': 'COMMERCE',
  '건강/운동': 'HEALTH_FITNESS',
  엔터테인먼트: 'ENTERTAINMENT',
  '금융/자산관리': 'FINANCE',
  '비즈니스/직장인': 'BUSINESS',
  '사진/영상': 'MEDIA',
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
  const [selected, setSelected] = useState<AppGenre[]>([]);
  useEffect(() => {
    if (Array.isArray(form.genreCategories)) {
      const mapped = form.genreCategories
        .map((api: string) => API_TO_UI[api])
        .filter((v): v is AppGenre => !!v && options.includes(v));
      setSelected(mapped);
    } else {
      setSelected([]);
    }
  }, [form.genreCategories, options]);

  const handleSelect = (value: AppGenre) => {
    setSelected(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };

  const handleNext = () => {
    if (selected.length === 0) return alert('장르를 하나 이상 선택해주세요!');
    update({ genreCategories: selected.map(v => UI_TO_API[v]) });
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
          <div className="flex items-center gap-2 pb-10">
            <CheckTag>중복 선택 가능</CheckTag>
          </div>
        </div>
      </div>
      <div role="listbox" aria-label="베타서비스 장르 선택" className="flex flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <Chip
              key={option}
              variant={isSelected ? 'active' : 'solid'}
              size="sm"
              onClick={() => handleSelect(option)}
              showArrowIcon={false}
            >
              {option}
            </Chip>
          );
        })}
      </div>
    </TestAddLayout>
  );
}
