'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';

const GAME_GENRES = [
  '캐주얼',
  '퍼즐/보드',
  'RPG/어드벤처',
  '시뮬레이션',
  '전략/카드',
  '스포츠/레이싱',
  '멀티플레이/소셜',
  '기타',
] as const;

type GameGenre = (typeof GAME_GENRES)[number];

const UI_TO_API: Record<GameGenre, string> = {
  캐주얼: 'CASUAL',
  '퍼즐/보드': 'PUZZLE_BOARD',
  'RPG/어드벤처': 'RPG_ADVENTURE',
  시뮬레이션: 'SIMULATION',
  '전략/카드': 'STRATEGY_CARD',
  '스포츠/레이싱': 'SPORTS_RACING',
  '멀티플레이/소셜': 'MULTIPLAYER_SOCIAL',
  기타: 'ETC',
};

const API_TO_UI: Record<string, GameGenre> = Object.fromEntries(
  Object.entries(UI_TO_API).map(([ui, api]) => [api, ui as GameGenre]),
) as Record<string, GameGenre>;

export default function GameGenre() {
  const router = useRouter();
  const STEP_INDEX = 2;

  const { form, update, save } = useTestAddForm();

  const options = useMemo(() => [...GAME_GENRES] as GameGenre[], []);
  const [selectedGenre, setSelectedGenre] = useState<GameGenre | null>(null);

  useEffect(() => {
    const api = Array.isArray(form.genreCategories) ? form.genreCategories[0] : undefined;
    const ui = api ? API_TO_UI[api] : undefined;
    if (ui && options.includes(ui)) setSelectedGenre(ui);
  }, [form.genreCategories, options]);

  const handleNext = () => {
    if (!selectedGenre) return alert('장르를 선택해주세요!');
    update({ genreCategories: [UI_TO_API[selectedGenre]] });
    router.push('/test-add/game/name');
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

        <Selector<GameGenre>
          options={options}
          selected={selectedGenre}
          onSelect={setSelectedGenre}
        />
      </div>
    </TestAddLayout>
  );
}
