'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Chip from '@/components/common/atoms/Chip';
import CheckTag from '@/components/common/atoms/CheckTag';
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
  const [selected, setSelected] = useState<WebGenre[]>([]);

  useEffect(() => {
    if (Array.isArray(form.genreCategories)) {
      const mapped = form.genreCategories
        .map(api => API_TO_UI[api])
        .filter((v): v is WebGenre => !!v);
      setSelected(mapped);
    }
  }, [form.genreCategories]);

  const handleSelect = (value: WebGenre) => {
    setSelected(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };

  const handleNext = () => {
    if (selected.length === 0) return alert('장르를 하나 이상 선택해주세요!');
    update({ genreCategories: selected.map(v => UI_TO_API[v]) });
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
      category="web"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">
            어떤 장르의 베타서비스인가요?
            <br />
            선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
          </p>
          <p className="text-body-02 text-Gray-300">나중에 수정 가능하니 너무 걱정하지 마세요.</p>
          <div className="flex items-center gap-2 mt-1">
            <CheckTag>중복 선택 가능</CheckTag>
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
      </div>
    </TestAddLayout>
  );
}
