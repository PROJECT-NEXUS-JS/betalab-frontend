'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/common/atoms/Button';
import Chip from '@/components/common/atoms/Chip';
import CarouselBar from '@/components/common/molecules/CarouselBar';
import StepNextButton from '@/components/common/molecules/StepNextButton';
import Image from 'next/image';

const PURPOSE_GROUPS = [
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
];

const STEP_INDEX = 6;

export default function TestAddPurposePage() {
  const { category } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const savedTitle = localStorage.getItem(`temp-title-${category}`);
    if (savedTitle) {
      setTitle(savedTitle);
    }
    const savedPurpose = localStorage.getItem(`temp-purpose-${category}`);
    if (savedPurpose) {
      setSelectedItems(JSON.parse(savedPurpose));
    }
  }, [category]);

  const toggleItem = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  const handleNext = () => {
    if (selectedItems.length === 0) return alert('최소 한 가지 목적을 선택해주세요!');
    localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(selectedItems));
    router.push(`/test-add/${category}/condition`);
  };

  return (
    <main className="flex min-h-screen w-full">
      <div className="w-1/4 bg-gradient-to-b from-white to-[#D4EED8] relative">
        <Image src="/test2.png" alt="테스트 이미지" fill className="object-center" priority />
      </div>

      <div className="w-3/4 flex flex-col justify-between px-12 py-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-subtitle-01 font-bold">
              참여자들에게서 어떤 걸 알아보면 도움이 될까요 ?
            </p>
          </div>
          {PURPOSE_GROUPS.map(({ title, items }) => (
            <section key={title} className="flex flex-col gap-4">
              <p className="text-body-01 font-semibold">{title}</p>
              <div className="flex gap-3 flex-wrap">
                {items.map(item => (
                  <Chip
                    key={item}
                    variant={selectedItems.includes(item) ? 'active' : 'solid'}
                    size="sm"
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            State="Sub"
            Size="xl"
            label="임시 저장"
            onClick={() =>
              localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(selectedItems))
            }
          />
          <CarouselBar activeIndex={STEP_INDEX} total={10} />
          <StepNextButton onClick={handleNext} />
        </div>
      </div>
    </main>
  );
}
