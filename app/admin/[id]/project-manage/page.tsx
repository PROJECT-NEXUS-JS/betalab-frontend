'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import Dropdown from '@/components/admin/project-manage/DropDown';
import CheckDropDown, { CheckOption } from '@/components/admin/project-manage/CheckDropDown';
import ParticipationCheck from '@/components/admin/project-manage/ParticipationCheck';
import DateCheck from '@/components/admin/project-manage/DateCheck';
import Button from '@/components/common/atoms/Button';
import ConditionCheck from '@/components/admin/project-manage/ConditionCheck';

type TestType = 'game' | 'app' | 'web';

const TEST_TYPES: { label: string; value: TestType }[] = [
  { label: '게임', value: 'game' },
  { label: '앱', value: 'app' },
  { label: '웹', value: 'web' },
];

const DURATIONS = [
  { label: '하루 사용', value: '1d' },
  { label: '3일 이상 사용', value: '3d+' },
  { label: '1주 이상 사용', value: '1w+' },
];

const PLATFORMS: CheckOption[] = [
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
  { label: 'PC 클라이언트', value: 'pc' },
  { label: 'Steam VR', value: 'steamvr' },
  { label: 'Play Station', value: 'ps' },
  { label: 'Xbox', value: 'xbox' },
  { label: 'Meta Quest', value: 'quest' },
  { label: '기타', value: 'etc' },
];

const FEEDBACKS: CheckOption[] = [
  { label: '구글폼 제출', value: 'googleform' },
  { label: '이메일 회신', value: 'email' },
  { label: '설문 도구', value: 'tool' },
];

const GENRES_APP: CheckOption[] = [
  { label: '라이프 스타일', value: 'lifestyle' },
  { label: '교육/학습', value: 'edu' },
  { label: '소셜/커뮤니티', value: 'social' },
  { label: 'AI/실험적 기능', value: 'ai-experimental' },
  { label: '생산성/도구', value: 'productivity-tools' },
  { label: '커머스/쇼핑', value: 'commerce' },
  { label: '건강/운동', value: 'health-fitness' },
  { label: '엔터테인먼트', value: 'entertainment' },
  { label: '금융/자산관리', value: 'finance' },
  { label: '비즈니스/직장인', value: 'business' },
  { label: '사진/영상', value: 'photo-video' },
  { label: '기타', value: 'etc' },
];

const GENRES_WEB: CheckOption[] = [
  { label: '생산성/협업툴', value: 'productivity-collab' },
  { label: '커머스/쇼핑', value: 'commerce' },
  { label: '마케팅/홍보툴', value: 'marketing' },
  { label: '커뮤니티/소셜', value: 'community-social' },
  { label: '교육/콘텐츠', value: 'education-content' },
  { label: '금융/자산관리', value: 'finance' },
  { label: 'AI/자동화 도구', value: 'ai-automation' },
  { label: '실험적 웹툴', value: 'experimental-web' },
  { label: '라이프 스타일/취미', value: 'lifestyle-hobby' },
  { label: '채용/HR', value: 'recruiting-hr' },
  { label: '고객관리/세일즈', value: 'crm-sales' },
  { label: '기타', value: 'etc' },
];

const GENRES_GAME: CheckOption[] = [
  { label: '캐주얼', value: 'casual' },
  { label: '퍼즐/보드', value: 'puzzle-board' },
  { label: 'RPG/어드벤처', value: 'rpg-adventure' },
  { label: '시뮬레이션', value: 'simulation' },
  { label: '전략/카드', value: 'strategy-card' },
  { label: '스포츠/레이싱', value: 'sports-racing' },
  { label: '멀티플레이/소셜', value: 'multiplayer-social' },
  { label: '기타', value: 'etc' },
];

const GENRES_BY_TYPE: Record<TestType, CheckOption[]> = {
  app: GENRES_APP,
  web: GENRES_WEB,
  game: GENRES_GAME,
};

function Row({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="text-body-01 text-Dark-Gray">{label}</div>
      <div>{children}</div>
    </div>
  );
}

export default function Page() {
  const [title, setTitle] = useState('제목을 적어주세요');
  const [editingTitle, setEditingTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (editingTitle) inputRef.current?.focus();
  }, [editingTitle]);

  const [testType, setTestType] = useState<TestType>('game');

  const [duration, setDuration] = useState<string>('3d+');
  const [platforms, setPlatforms] = useState<string[]>(['android', 'ios']);

  const [genres, setGenres] = useState<string[]>(['casual', 'puzzle-board']); // 초기값(게임 기준)

  const [feedbacks, setFeedbacks] = useState<string[]>(['googleform', 'email']);
  const [people, setPeople] = useState<number>(50);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 64),
  });

  const genreOptions = useMemo<CheckOption[]>(() => GENRES_BY_TYPE[testType], [testType]);
  useEffect(() => {
    setGenres(prev => prev.filter(v => genreOptions.some(o => o.value === v)));
  }, [testType, genreOptions]);

  const save = () => {
    console.log({ title, testType, duration, platforms, genres, feedbacks, people, range });
    alert('임시로 상태를 콘솔에 출력했어요!');
  };

  return (
    <div className="mx-auto w/full max-w-[920px] px-6 py-8">
      {/* 제목 */}
      <div className="mb-8">
        {!editingTitle ? (
          <h1
            className="text-head font-[700] text-[var(--color-Black)] cursor-text"
            onClick={() => setEditingTitle(true)}
            title="클릭하여 제목 수정"
          >
            {title}
          </h1>
        ) : (
          <input
            ref={inputRef}
            defaultValue={title}
            onBlur={e => {
              setTitle(e.target.value.trim() || '제목을 적어주세요');
              setEditingTitle(false);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              if (e.key === 'Escape') setEditingTitle(false);
            }}
            className="w-full rounded-[1px] border border-gray-50
                       bg-white px-4 py-3 text-subtitle-01 text-black"
          />
        )}
      </div>

      {/* 폼 */}
      <div className="space-y-5">
        <Row label="테스트 종류">
          <div className="w-[340px]">
            <Dropdown
              value={testType}
              onChange={v => setTestType(v as TestType)}
              options={TEST_TYPES}
              placeholder="선택하세요"
            />
          </div>
        </Row>

        <Row label="플랫폼 종류">
          <div className="w-[540px]">
            <CheckDropDown options={PLATFORMS} value={platforms} onChange={setPlatforms} />
          </div>
        </Row>

        <Row label="장르 종류">
          <div className="w-[540px]">
            <CheckDropDown options={genreOptions} value={genres} onChange={setGenres} />
          </div>
        </Row>

        <Row label="피드백 방식">
          <div className="w-[540px]">
            <CheckDropDown options={FEEDBACKS} value={feedbacks} onChange={setFeedbacks} />
          </div>
        </Row>

        <Row label="테스트 소요 시간">
          <div className="w-[340px]">
            <Dropdown
              value={duration}
              onChange={setDuration}
              options={DURATIONS}
              placeholder="선택하세요"
            />
          </div>
        </Row>

        <Row label="모집 인원">
          <div className="w-[340px]">
            <ParticipationCheck value={people} onChange={setPeople} step={10} min={0} suffix="명" />
          </div>
        </Row>

        <Row label="모집 마감일">
          <div className="w-[420px]">
            <DateCheck value={range} onChange={setRange} />
          </div>
        </Row>

        <Row label="참여 조건">
          <ConditionCheck className="!mx-0" />
        </Row>
      </div>

      <div className="mt-10 space-y-3">
        <Button
          State="Default"
          Size="xl"
          label="프로젝트 설명 더보기"
          className="w-full rounded-[8px]"
        />
        <Button
          State="Primary"
          Size="xl"
          label="변경사항 저장하기"
          onClick={save}
          className="w-full rounded-[8px]"
        />
      </div>
    </div>
  );
}
