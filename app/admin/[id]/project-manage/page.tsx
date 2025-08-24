'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import Dropdown from '@/components/admin/project-manage/DropDown';
import CheckDropDown, { CheckOption } from '@/components/admin/project-manage/CheckDropDown';
import ParticipationCheck from '@/components/admin/project-manage/ParticipationCheck';
import DateCheck from '@/components/admin/project-manage/DateCheck';
import Button from '@/components/common/atoms/Button';

const TEST_TYPES = [
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

const GENRES: CheckOption[] = [
  { label: '캐주얼', value: 'casual' },
  { label: '퍼즐/보드', value: 'puzzle' },
  { label: '액션', value: 'action' },
  { label: 'RPG', value: 'rpg' },
  { label: '전략', value: 'strategy' },
];

const FEEDBACKS: CheckOption[] = [
  { label: '구글폼 제출', value: 'googleform' },
  { label: '이메일 회신', value: 'email' },
  { label: '설문 도구', value: 'tool' },
];

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
  useEffect(() => {
    if (editingTitle) inputRef.current?.focus();
  }, [editingTitle]);
  const [testType, setTestType] = useState<string>('game');
  const [duration, setDuration] = useState<string>('3d+');
  const [platforms, setPlatforms] = useState<string[]>(['android', 'ios']);
  const [genres, setGenres] = useState<string[]>(['casual', 'puzzle']);
  const [feedbacks, setFeedbacks] = useState<string[]>(['googleform', 'email']);
  const [people, setPeople] = useState<number>(50);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 64),
  });

  const save = () => {
    console.log({ title, testType, duration, platforms, genres, feedbacks, people, range });
    alert('임시로 상태를 콘솔에 출력했어요!');
  };

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-8">
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
            className="w-full rounded-[12px] border border-[var(--color-Gray-100)]
                       bg-[var(--color-White)] px-4 py-3 text-subtitle-01 text-[var(--color-Black)]
                       focus:outline-none focus:ring-4 focus:ring-[color:oklch(0.85_0.05_240/0.3)]"
          />
        )}
      </div>

      <div className="space-y-5">
        <Row label="테스트 종류">
          <div className="w-[340px]">
            <Dropdown
              value={testType}
              onChange={setTestType}
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
            <CheckDropDown options={GENRES} value={genres} onChange={setGenres} />
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
