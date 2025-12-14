'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';
import CheckTag from '@/components/common/atoms/CheckTag';
import Chip from '@/components/common/atoms/Chip';

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
  시뮬레이션: 'SIMULATION_GAME',
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
  const [selected, setSelected] = useState<GameGenre[]>([]);

  useEffect(() => {
    if (Array.isArray(form.genreCategories)) {
      const mapped = form.genreCategories
        .map((api: string) => API_TO_UI[api])
        .filter((v): v is GameGenre => !!v && options.includes(v));
      setSelected(mapped);
    } else {
      setSelected([]);
    }
  }, [form.genreCategories, options]);
  const handleSelect = (value: GameGenre) => {
    setSelected(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };
  const handleNext = () => {
    if (selected.length === 0) return alert('장르를 하나 이상 선택해주세요!');
    update({ genreCategories: selected.map(v => UI_TO_API[v]) });
    save();
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
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-subtitle-01 font-bold">
            어떤 장르의 베타서비스인가요?
            <br />
            선택한 카테고리는 나중에 언제든 바꾸실 수 있어요.
          </p>
          <p className="text-body-02 text-Gray-300">나중에 수정 가능하니 너무 걱정하지 마세요.</p>
          <div className="flex items-center gap-2 mt-2">
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
