'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';

const WEB_GENRES = [
  '생산성/협업툴',
  '커머스/쇼핑',
  '마케팅/홍보툴',
  '커뮤니티/소셜',
  '교육/콘텐츠',
  '금융/자산관리',
  'AI/자동화 도구',
  '실험적 웹툴',
  '라이프스타일/취미',
  '채용/HR',
  '고객관리/세일즈',
  '기타',
] as const;

type WebGenre = (typeof WEB_GENRES)[number];

const UI_TO_API: Record<WebGenre, string> = {
  '생산성/협업툴': 'PRODUCTIVITY_COLLABORATION',
  '커머스/쇼핑': 'COMMERCE_SHOPPING_WEB',
  '마케팅/홍보툴': 'MARKETING_PROMOTION',
  '커뮤니티/소셜': 'COMMUNITY_SOCIAL_WEB',
  '교육/콘텐츠': 'EDUCATION_CONTENT',
  '금융/자산관리': 'FINANCE_ASSET',
  'AI/자동화 도구': 'AI_AUTOMATION',
  '실험적 웹툴': 'EXPERIMENTAL_WEB',
  '라이프스타일/취미': 'LIFESTYLE_HOBBY',
  '채용/HR': 'RECRUITMENT_HR',
  '고객관리/세일즈': 'CRM_SALES',
  기타: 'ETC',
};

const API_TO_UI: Record<string, WebGenre> = Object.fromEntries(
  Object.entries(UI_TO_API).map(([ui, api]) => [api, ui as WebGenre]),
) as Record<string, WebGenre>;

export default function WebGenrePage() {
  const STEP_INDEX = 2;
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const options = useMemo(() => [...WEB_GENRES] as WebGenre[], []);
  const [selected, setSelected] = useState<WebGenre | null>(null);

  useEffect(() => {
    const api = Array.isArray(form.genreCategories) ? form.genreCategories[0] : undefined;
    if (api && API_TO_UI[api] && options.includes(API_TO_UI[api])) {
      setSelected(API_TO_UI[api]);
    }
  }, [form.genreCategories, options]);

  const handleSelect = (value: WebGenre) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return alert('장르를 선택해주세요!');
    update({ genreCategories: [UI_TO_API[selected]] });
    router.push('/test-add/web/name');
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

        <Selector<WebGenre> options={options} selected={selected} onSelect={handleSelect} />
      </div>
    </TestAddLayout>
  );
}
