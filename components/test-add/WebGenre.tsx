'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StepNextButton from '@/components/common/molecules/StepNextButton';
import CarouselBar from '@/components/common/molecules/CarouselBar';
import Chip from '@/components/common/atoms/Chip';

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
];

export default function WebGenre() {
  const router = useRouter();
  const STEP_INDEX = 2;
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const storageKey = `temp-genre-web`;
  const handleNext = () => {
    if (!selectedGenre) return alert('장르를 선택해주세요!');
    console.log('선택된 장르:', selectedGenre);
    router.push('/test-add/web/name');
  };

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved && WEB_GENRES.includes(saved)) {
      setSelectedGenre(saved);
    }
  }, []);

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
            {WEB_GENRES.map(genre => (
              <Chip
                key={genre}
                variant={selectedGenre === genre ? 'active' : 'solid'}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
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
