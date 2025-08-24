'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';
import CheckTag from '@/components/common/atoms/CheckTag';
import Chip from '@/components/common/atoms/Chip';

type PurposeGroup = { title: string; items: readonly string[] };

const PURPOSE_GROUPS: readonly PurposeGroup[] = [
  {
    title: '사용성 및 인터페이스 피드백',
    items: [
      'UI/UX 전반에 대한 의견',
      '앱 사용 편의성',
      '디자인 관련 피드백',
      '기능 구조에 대한 이해도',
      '온보딩 흐름에 대한 피드백',
    ],
  },
  {
    title: '기능 테스트 및 오류 리포트',
    items: [
      '특정 기능 작동 여부 확인',
      '예외 상황 테스트',
      '버그 리포트 수집',
      '앱 속도/퍼포먼스 평가',
    ],
  },
  {
    title: '리서치 및 행동 데이터',
    items: [
      '특정 행동 유도 여부 (e.g., 구매 버튼 클릭)',
      '사용 빈도/체류 시간',
      '특정 기능 사용 여부',
      '사용자 행동 흐름 분석',
    ],
  },
  {
    title: '주관적/정성적 피드백',
    items: ['서비스 만족도', '추천 의향 (NPS)', '개선이 필요한 점', '불편했던 순간'],
  },
  {
    title: '기타 수집 데이터',
    items: [
      '서비스 만족도',
      '인터뷰 참여',
      '스크린레코딩(화면 녹화) 동의',
      '사용 로그 데이터 수집 동의',
    ],
  },
] as const;

const STEP_INDEX = 7;

export default function TestAddPurposePage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const init = Array.isArray(form.feedbackItems) ? form.feedbackItems : [];
    setSelected(init);
  }, [form.feedbackItems]);

  const toggle = (value: string) =>
    setSelected(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));

  const handleNext = () => {
    const missingGroup = PURPOSE_GROUPS.some(group => !group.items.some(i => selected.includes(i)));
    if (missingGroup) {
      alert('각 그룹에서 최소 1개 이상 선택해주세요!');
      return;
    }
    update({ feedbackItems: selected });
    router.push(`/test-add/${category}/setting`);
  };

  const handleSave = () => {
    update({ feedbackItems: selected });
    save();
  };

  return (
    <TestAddLayout
      leftImageSrc="/test2.png"
      stepIndex={STEP_INDEX}
      onNext={handleNext}
      showSave
      onSave={handleSave}
      saveLabel="임시 저장"
    >
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <p className="text-subtitle-01 font-semibold">
            참여자들에게서 어떤 걸 알아보면 도움이 될까요?
          </p>
          <CheckTag>중복 선택 가능</CheckTag>
        </div>

        {PURPOSE_GROUPS.map(({ title, items }) => (
          <section key={title} className="flex flex-col gap-3">
            <p className="text-body-01 font-semibold">{title}</p>
            <div className="flex flex-wrap gap-2">
              {items.map(option => (
                <Chip
                  key={option}
                  variant={selected.includes(option) ? 'active' : 'solid'}
                  size="sm"
                  onClick={() => toggle(option)}
                  showArrowIcon={false}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </section>
        ))}
      </div>
    </TestAddLayout>
  );
}
