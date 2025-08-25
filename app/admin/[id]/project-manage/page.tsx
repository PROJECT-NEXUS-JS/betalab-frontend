'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import type { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import Dropdown from '@/components/admin/project-manage/DropDown';
import CheckDropDown, { CheckOption } from '@/components/admin/project-manage/CheckDropDown';
import ParticipationCheck from '@/components/admin/project-manage/ParticipationCheck';
import DateCheck from '@/components/admin/project-manage/DateCheck';
import Button from '@/components/common/atoms/Button';
import ConditionCheck from '@/components/admin/project-manage/ConditionCheck';
import DetailCheck, { DetailInitial } from '@/components/admin/project-manage/DetailCheck';
import { instance } from '@/apis/instance';

type TestType = 'game' | 'app' | 'web';

const TEST_TYPES: { label: string; value: TestType }[] = [
  { label: '게임', value: 'game' },
  { label: '앱', value: 'app' },
  { label: '웹', value: 'web' },
];

const DURATIONS = [
  { label: '하루 사용', value: '1d' },
  { label: '3일 미만 사용', value: '3d-' },
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

const MAIN_API_TO_UI: Record<string, TestType> = {
  WEB: 'web',
  APP: 'app',
  GAME: 'game',
};

const PLATFORM_API_TO_UI: Record<string, string> = {
  ANDROID: 'android',
  IOS: 'ios',
  PC_CLIENT: 'pc',
  STEAM_VR: 'steamvr',
  PLAY_STATION: 'ps',
  XBOX: 'xbox',
  META_QUEST: 'quest',
  ETC: 'etc',
};

const GENRE_API_TO_UI_WEB: Record<string, string> = {
  PRODUCTIVITY_COLLAB: 'productivity-collab',
  COMMERCE_SHOPPING_WEB: 'commerce',
  MARKETING: 'marketing',
  COMMUNITY_SOCIAL_WEB: 'community-social',
  EDUCATION_CONTENT: 'education-content',
  FINANCE: 'finance',
  AI_AUTOMATION: 'ai-automation',
  EXPERIMENTAL_WEB: 'experimental-web',
  LIFESTYLE_HOBBY: 'lifestyle-hobby',
  RECRUITING_HR: 'recruiting-hr',
  CRM_SALES: 'crm-sales',
  ETC: 'etc',
};

const GENRE_API_TO_UI_APP: Record<string, string> = {
  LIFESTYLE: 'lifestyle',
  EDUCATION: 'edu',
  SOCIAL: 'social',
  AI_EXPERIMENTAL: 'ai-experimental',
  PRODUCTIVITY_TOOLS: 'productivity-tools',
  COMMERCE: 'commerce',
  HEALTH_FITNESS: 'health-fitness',
  ENTERTAINMENT: 'entertainment',
  FINANCE: 'finance',
  BUSINESS: 'business',
  PHOTO_VIDEO: 'photo-video',
  ETC: 'etc',
};

const GENRE_API_TO_UI_GAME: Record<string, string> = {
  CASUAL: 'casual',
  PUZZLE_BOARD: 'puzzle-board',
  RPG_ADVENTURE: 'rpg-adventure',
  SIMULATION: 'simulation',
  STRATEGY_CARD: 'strategy-card',
  SPORTS_RACING: 'sports-racing',
  MULTIPLAYER_SOCIAL: 'multiplayer-social',
  ETC: 'etc',
};

const pickGenreMap = (tt: TestType) =>
  tt === 'web' ? GENRE_API_TO_UI_WEB : tt === 'app' ? GENRE_API_TO_UI_APP : GENRE_API_TO_UI_GAME;

const FEEDBACK_API_TO_UI: Record<string, string> = {
  GOOGLE_FORM: 'googleform',
  EMAIL: 'email',
  TOOL: 'tool',
};

const DUR_API_TO_UI: Record<string, string> = {
  '1D': '1d',
  '3D_PLUS': '3d+',
  '1W_PLUS': '1w+',
};
function Row({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <div className="text-body-01 text-Dark-Gray">{label}</div>
      <div>{children}</div>
    </div>
  );
}

const parseISOorNull = (s?: string | null) => (s ? new Date(s) : undefined);
export default function Page() {
  const searchParams = useSearchParams();
  const routeParams = useParams<{ id?: string }>();
  const productId = React.useMemo(() => {
    const q = searchParams?.get('id');
    const p = routeParams?.id;
    const num = Number(q ?? p);
    return Number.isFinite(num) ? num : undefined;
  }, [searchParams, routeParams]);

  const [title, setTitle] = useState('제목을 적어주세요');
  const [editingTitle, setEditingTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (editingTitle) inputRef.current?.focus();
  }, [editingTitle]);

  const [testType, setTestType] = useState<TestType>('game');
  const [duration, setDuration] = useState<string>('3d+');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [people, setPeople] = useState<number>(50);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 64),
  });

  const [showDetail, setShowDetail] = useState(false);
  const [detailInitial, setDetailInitial] = useState<DetailInitial>({
    title: '',
    serviceSummary: '',
    mediaUrl: '',
    privacyItems: [],
  });

  const genreOptions = useMemo<CheckOption[]>(() => GENRES_BY_TYPE[testType], [testType]);
  useEffect(() => {
    setGenres(prev => prev.filter(v => genreOptions.some(o => o.value === v)));
  }, [testType, genreOptions]);
  useEffect(() => {
    if (!productId) return;

    (async () => {
      try {
        const { data } = await instance.get(`/v1/users/posts/${productId}`);
        const d = data?.data ?? data;
        const PI_API_TO_UI: Record<string, string> = {
          NAME: '이름',
          EMAIL: '이메일',
          CONTACT: '연락처',
          ETC: '기타',
        };
        setDetailInitial({
          title: d?.title ?? '',
          serviceSummary: d?.serviceSummary ?? '',
          mediaUrl: d?.mediaUrl ?? '',
          privacyItems: Array.isArray(d?.privacyItems)
            ? d.privacyItems.map((k: string) => PI_API_TO_UI[k] ?? k)
            : [],
          thumbnailUrl: d?.thumbnailUrl ?? undefined,
          galleryUrls:
            d?.mediaImages ??
            d?.images ??
            (Array.isArray(d?.galleryUrls) ? d.galleryUrls : undefined),
        });
        if (d?.title) setTitle(d.title);
        const mainCode: string | undefined = d?.mainCategories?.[0]?.code;
        const tt: TestType = MAIN_API_TO_UI[mainCode ?? ''] ?? 'web';
        setTestType(tt);

        const platformCodes: string[] = Array.isArray(d?.platformCategories)
          ? d.platformCategories.map((x: any) => x?.code ?? x)
          : [];
        setPlatforms(platformCodes.map(c => PLATFORM_API_TO_UI[c]).filter(Boolean));

        const genreCodes: string[] = Array.isArray(d?.genreCategories)
          ? d.genreCategories.map((x: any) => x?.code ?? x)
          : [];
        const genreMap = pickGenreMap(tt);
        setGenres(genreCodes.map(c => genreMap[c]).filter(Boolean));

        const fb = Array.isArray(d?.feedbacks) ? d.feedbacks : [];
        setFeedbacks(fb.map((k: string) => FEEDBACK_API_TO_UI[k]).filter(Boolean));

        const durServer = d?.durationTimeCode || d?.durationTime;
        setDuration(DUR_API_TO_UI[durServer] ?? '3d+');

        const maxP = d?.recruitment?.maxParticipants ?? d?.participants ?? d?.recruitCount ?? 50;
        setPeople(Number(maxP) || 50);

        const start = d?.schedule?.startDate ?? d?.startDate;
        const end = d?.schedule?.endDate ?? d?.endDate;
        setRange({
          from: parseISOorNull(start) ?? new Date(),
          to: parseISOorNull(end) ?? addDays(new Date(), 7),
        });
      } catch (e) {
        console.error('GET /v1/users/posts/:id error', e);
      }
    })();
  }, [productId]);

  useEffect(() => console.log('testType:', testType), [testType]);
  useEffect(() => console.log('duration:', duration), [duration]);
  useEffect(() => console.log('platforms:', platforms), [platforms]);
  useEffect(() => console.log('genres:', genres), [genres]);
  useEffect(() => console.log('feedbacks:', feedbacks), [feedbacks]);
  useEffect(() => console.log('people:', people), [people]);
  useEffect(() => console.log('range:', range), [range]);

  const save = () => {
    console.log({ title, testType, duration, platforms, genres, feedbacks, people, range });
    alert('임시로 상태를 콘솔에 출력했어요!');
  };

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-8">
      {/* 제목 */}
      <div className="mb-8">
        {!editingTitle ? (
          <p
            className="text-subtitle-01 font-semibold text-Black cursor-text"
            onClick={() => setEditingTitle(true)}
            title="클릭하여 제목 수정"
          >
            {title}
          </p>
        ) : (
          <input
            ref={inputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              if (e.key === 'Escape') setEditingTitle(false);
            }}
            className="w-full rounded-[1px] border border-Gray-100 bg-White px-4 py-3 text-subtitle-01 text-Black"
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
      {showDetail && (
        <div className="mt-10">
          <DetailCheck key={productId ?? 'new'} initial={detailInitial} />
        </div>
      )}
      <div className="mt-10 space-y-3">
        <Button
          State="Default"
          Size="xl"
          label={showDetail ? '프로젝트 설명 닫기' : '프로젝트 설명 더보기'}
          className="w-full rounded-[8px]"
          onClick={() => setShowDetail(v => !v)}
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
