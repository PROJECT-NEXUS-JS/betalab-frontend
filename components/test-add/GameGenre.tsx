'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';

const GAME_GENRES = [
  '캐주얼',
  '퍼즐/보드',
  'RPG/어드벤처',
  '시뮬레이션',
  '전략/카드',
  '스포츠/레이싱',
  '멀티플레이/소셜',
  '기타',
];

export default function GameGenre() {
  const router = useRouter();
  const STEP_INDEX = 2;
  const storageKey = `temp-genre-game`;
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedGenre) return alert('장르를 선택해주세요!');
    router.push('/test-add/game/name');
  };

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved && GAME_GENRES.includes(saved)) {
      setSelectedGenre(saved);
    }
  }, []);

  return (
    <TestAddLayout leftImageSrc="/test1.png" stepIndex={STEP_INDEX} onNext={handleNext}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">
            어떤 장르의 베타서비스인가요?
            <br />
            선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
          </p>
          <p className="text-body-02 text-Gray-300">나중에 수정 가능하니 너무 걱정하지 마세요.</p>
        </div>

        <Selector
          options={GAME_GENRES}
          selected={selectedGenre}
          onSelect={genre => setSelectedGenre(genre)}
        />
      </div>
    </TestAddLayout>
  );
}
