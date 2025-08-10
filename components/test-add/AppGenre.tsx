'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StepNextButton from '@/components/common/molecules/StepNextButton';
import CarouselBar from '@/components/common/molecules/CarouselBar';
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
];

export default function AppGenreStep() {
  const router = useRouter();
  const STEP_INDEX = 2;
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const storageKey = `temp-genre-app`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved && APP_GENRES.includes(saved)) {
      setSelectedGenre(saved);
    }
  }, []);
  const handleNext = () => {
    if (!selectedGenre) return alert('장르를 선택해주세요!');
    console.log('선택된 장르:', selectedGenre);
    router.push('/test-add/app/name');
  };

  return (
    <main className="flex min-h-screen w-full">
      <div className="w-1/4 bg-gradient-to-b from-white to-[#D4EED8] relative">
        <Image src="/test1.png" alt="테스트 이미지" fill className="object-center" priority />
      </div>
      <div className="w-1/2 flex flex-col justify-between px-12 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-subtitle-01 font-bold">
              어떤 장르의 베타서비스인가요?
              <br />
              선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
            </p>
            <p className="text-body-02 text-Gray-300">나중에 수정 가능하니 너무 걱정하지 마세요.</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {APP_GENRES.map(genre => (
              <Chip
                key={genre}
                variant={selectedGenre === genre ? 'active' : 'solid'}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                showArrowIcon={false}
              >
                {genre}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <CarouselBar activeIndex={STEP_INDEX} total={10} />

          <StepNextButton
            onClick={() => {
              handleNext();
            }}
          />
        </div>
      </div>
    </main>
  );
}
