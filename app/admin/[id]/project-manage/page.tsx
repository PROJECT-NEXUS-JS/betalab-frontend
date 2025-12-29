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
import { updatePost } from './project-manage-api';

type TestType = 'game' | 'app' | 'web';

const TEST_TYPES: { label: string; value: TestType }[] = [
  { label: '게임', value: 'game' },
  { label: '앱', value: 'app' },
  { label: '웹', value: 'web' },
];

const DURATIONS = [
  { label: '하루 미만', value: '하루 미만' },
  { label: '3일 미만 사용', value: '3일 미만 사용' },
  { label: '일주일 이상 사용', value: '일주일 이상 사용' },
  { label: '하루 미만 사용', value: '하루 미만 사용' },
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

const APP_PLATFORM_OPTIONS = [
  { label: 'iOS', value: 'ios' },
  { label: 'Android', value: 'android' },
  { label: '무관', value: 'any' },
];

const FEEDBACKS: CheckOption[] = [
  { label: '구글폼 제출', value: '구글폼 제출' },
  { label: '앱 내 피드백 경로', value: '앱 내 피드백 경로' },
  { label: '이메일 회신', value: '이메일 회신' },
  { label: '슬랙/디스코드 커뮤니티 댓글', value: '슬랙/디스코드 커뮤니티 댓글' },
  { label: '직접 입력', value: '직접 입력' },
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
  GOOGLE_FORM: '구글폼 제출',
  EMAIL: '이메일 회신',
  TOOL: '설문 도구',
  '구글폼 제출': '구글폼 제출',
  '앱 내 피드백 경로': '앱 내 피드백 경로',
  '이메일 회신': '이메일 회신',
  '슬랙/디스코드 커뮤니티 댓글': '슬랙/디스코드 커뮤니티 댓글',
  '직접 입력': '직접 입력',
};

function Row({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4 min-w-0">
      <div className="text-body-01 text-Dark-Gray">{label}</div>
      <div className="min-w-0 overflow-visible">{children}</div>
    </div>
  );
}

const parseISOorNull = (s?: string | null) => (s ? new Date(s) : undefined);
const firstArray = <T,>(...cands: unknown[]): T[] => {
  const arr = cands.find(Array.isArray) as unknown[] | undefined;
  return (arr ?? []) as T[];
};

type ConditionInitial = {
  genderRequired: boolean;
  gender?: 'male' | 'female' | null;
  ageRequired: boolean;
  ageMin?: number | null;
  ageMax?: number | null;
  extraRequired: boolean;
  extraText?: string;
  rewardRequired: boolean;
  rewardText?: string;
};

export default function Page() {
  const searchParams = useSearchParams();
  const routeParams = useParams<{ id?: string }>();
  const postId = useMemo(() => {
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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [conditionInitial, setConditionInitial] = useState<ConditionInitial>({
    genderRequired: false,
    gender: null,
    ageRequired: false,
    ageMin: null,
    ageMax: null,
    extraRequired: false,
    extraText: '',
    rewardRequired: false,
    rewardText: '',
  });

  const [showDetail, setShowDetail] = useState(false);
  const [detailInitial, setDetailInitial] = useState<DetailInitial>({
    title: '',
    serviceSummary: '',
    mediaUrl: '',
    privacyItems: [],
  });

  const genreOptions = useMemo<CheckOption[]>(() => GENRES_BY_TYPE[testType], [testType]);
  const isWeb = testType === 'web';

  useEffect(() => {
    if (isWeb) {
      setPlatforms([]);
    }
  }, [isWeb]);
  useEffect(() => {
    setGenres(prev => prev.filter(v => genreOptions.some(o => o.value === v)));
  }, [testType, genreOptions]);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const { data } = await instance.get(`/v1/users/posts/${postId}`);
        const d = data?.data ?? data;

        // 개인정보 항목
        type PIItem = string | { code?: string; value?: string; name?: string };
        const rawPI = firstArray<PIItem>(
          d?.feedback?.privacyItems,
          d?.privacyItems,
          d?.requirements?.privacyItems,
        );
        const piCodes = rawPI.map(x =>
          typeof x === 'string' ? x : (x?.code ?? x?.value ?? x?.name ?? ''),
        );
        const PI_API_TO_UI: Record<string, string> = {
          NAME: '이름',
          EMAIL: '이메일',
          CONTACT: '연락처',
          ETC: '기타',
          이름: '이름',
          이메일: '이메일',
          연락처: '연락처',
          기타: '기타',
        };
        const mappedPI = piCodes
          .map(k => (PI_API_TO_UI as Record<string, string>)[String(k)] ?? String(k))
          .filter(Boolean);

        setDetailInitial({
          title: d?.title ?? '',
          serviceSummary: d?.serviceSummary ?? '',
          mediaUrl: d?.creatorProfileUrl ?? d?.mediaUrl ?? '',
          privacyItems: mappedPI,
          thumbnailUrl: d?.thumbnailUrl ?? d?.thumbnail ?? undefined,
          mediaUrls:
            d?.content?.mediaUrls ??
            d?.mediaImages ??
            d?.images ??
            (Array.isArray(d?.galleryUrls) ? d.galleryUrls : undefined),
        });
        if (d?.title) setTitle(d.title);

        // 메인 카테고리 → 테스트 타입
        const mainCode: string | undefined = d?.mainCategories?.[0]?.code;
        const tt: TestType = MAIN_API_TO_UI[mainCode ?? ''] ?? 'web';
        setTestType(tt);

        // 플랫폼
        const platformCodes = firstArray<string>(
          d?.platformCategories?.map((x: any) => x?.code ?? x),
          d?.platforms,
        );
        setPlatforms(platformCodes.map(c => PLATFORM_API_TO_UI[c] ?? c).filter(Boolean));

        // 장르
        const genreCodes = firstArray<string>(
          d?.genreCategories?.map((x: any) => x?.code ?? x),
          d?.genres,
        );
        const genreMap = pickGenreMap(tt);
        setGenres(genreCodes.map(c => genreMap[c] ?? c).filter(Boolean));

        // 피드백 방식
        const fbMethod = d?.feedback?.feedbackMethod ?? d?.feedbackMethod;
        if (fbMethod) {
          const mappedFb =
            FEEDBACK_API_TO_UI[fbMethod] ?? FEEDBACK_API_TO_UI[fbMethod.toUpperCase()] ?? fbMethod;
          setFeedbacks([mappedFb].filter(Boolean));
        }

        // 소요시간
        const durServer =
          d?.schedule?.durationTime ??
          d?.durationTime ??
          d?.durationTimeCode ??
          d?.duration ??
          d?.testDuration;
        if (typeof durServer === 'string' && durServer.trim()) {
          setDuration(durServer);
        }

        // 인원
        const maxP =
          d?.requirement?.maxParticipants ??
          d?.recruitment?.maxParticipants ??
          d?.participants ??
          d?.recruitCount ??
          d?.maxParticipants ??
          50;
        setPeople(Number(maxP) || 50);

        // 일정
        const start = d?.schedule?.startDate ?? d?.startDate;
        const end = d?.schedule?.endDate ?? d?.endDate;
        setRange({
          from: parseISOorNull(start) ?? new Date(),
          to: parseISOorNull(end) ?? addDays(new Date(), 7),
        });

        // 참여 조건/리워드 초기값
        const req = d?.requirement ?? {};
        const rwd = d?.reward ?? {};

        const genderStr = String(req?.genderRequirement ?? '').toUpperCase();
        const isAllOrNone = genderStr === 'ALL' || genderStr === '무관' || genderStr === '';
        const genderRequired = req?.genderRequirement != null && !isAllOrNone;
        const gender =
          genderStr === 'MALE' || genderStr === '남성'.toUpperCase()
            ? 'male'
            : genderStr === 'FEMALE' || genderStr === '여성'.toUpperCase()
              ? 'female'
              : null;

        const ageMin = Number(req?.ageMin);
        const ageMax = Number(req?.ageMax);
        const ageRequired = Number.isFinite(ageMin) || Number.isFinite(ageMax);

        const extraText = req?.additionalRequirements ?? '';
        const extraRequired = Boolean(extraText && extraText.trim());

        const rewardText =
          rwd?.rewardDescription ?? (rwd?.rewardType ? String(rwd.rewardType) : '');
        const rewardRequired = Boolean(rewardText && rewardText.trim());

        setConditionInitial({
          genderRequired: Boolean(genderRequired),
          gender,
          ageRequired,
          ageMin: Number.isFinite(ageMin) ? ageMin : null,
          ageMax: Number.isFinite(ageMax) ? ageMax : null,
          extraRequired,
          extraText,
          rewardRequired,
          rewardText,
        });
      } catch (e) {}
    })();
  }, [postId]);

  const save = async () => {
    if (!postId) {
      alert('postId가 없습니다.');
      return;
    }

    try {
      const payload = {
        title,
        serviceSummary: detailInitial.serviceSummary ?? undefined,
        mediaUrl: detailInitial.mediaUrl ?? undefined,
        privacyItems:
          detailInitial.privacyItems?.map(pi => {
            if (pi === '이름') return 'NAME';
            if (pi === '이메일') return 'EMAIL';
            if (pi === '연락처') return 'CONTACT';
            if (pi === '기타') return 'ETC';
            return pi;
          }) ?? undefined,
        mainCategory: [
          Object.keys(MAIN_API_TO_UI).find(k => MAIN_API_TO_UI[k] === testType) ?? 'GAME',
        ],
        genreCategories: genres.map(g => {
          const map = pickGenreMap(testType);
          return Object.keys(map).find(k => map[k] === g) ?? g;
        }),
        platformCategory: platforms.map(p => {
          return Object.keys(PLATFORM_API_TO_UI).find(k => PLATFORM_API_TO_UI[k] === p) ?? p;
        }),
        feedbackMethod: feedbacks[0]?.toUpperCase(),
        durationTime: duration,
        maxParticipants: people,
        startDate: range?.from?.toISOString(),
        endDate: range?.to?.toISOString(),
        requirement: {
          genderRequirement: conditionInitial.gender
            ? conditionInitial.gender.toUpperCase()
            : 'ALL',
          ageMin: conditionInitial.ageMin ?? undefined,
          ageMax: conditionInitial.ageMax ?? undefined,
          additionalRequirements: Initial.extraText,
        },
        reward: {
          rewardDescription: conditionInitial.rewardText,
        },
      };

      const data = await updatePost(postId, payload, thumbnailFile, galleryFiles);

      alert('저장 성공!');
    } catch (e: any) {
      alert(e?.response?.data?.message ?? '저장 실패');
    }
  };

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-8 overflow-x-hidden">
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

      <div className="space-y-5">
        <Row label="테스트 종류">
          <div className="w-[340px]">
            <Dropdown
              value={testType}
              onChange={(v: unknown) => setTestType(v as TestType)}
              options={TEST_TYPES}
              placeholder="선택하세요"
            />
          </div>
        </Row>

        <Row label="플랫폼 종류">
          <div className="w-[340px]">
            {testType === 'app' ? (
              <Dropdown
                value={platforms[0]}
                onChange={(v: unknown) => setPlatforms(v ? [String(v)] : [])}
                options={APP_PLATFORM_OPTIONS}
                placeholder="선택하세요"
              />
            ) : (
              <CheckDropDown
                widthClass="w-[340px]"
                key={`platforms-${platforms.join('|')}`}
                options={PLATFORMS}
                value={platforms}
                disabled={isWeb}
                onChange={
                  isWeb
                    ? undefined
                    : (v: unknown) => setPlatforms(Array.isArray(v) ? (v as string[]) : [])
                }
              />
            )}
          </div>
        </Row>

        <Row label="장르 종류">
          <div className="w-[540px]">
            <CheckDropDown
              key={`genres-${testType}`}
              options={genreOptions}
              value={genres}
              onChange={(v: unknown) => setGenres(Array.isArray(v) ? (v as string[]) : [])}
            />
          </div>
        </Row>

        <Row label="피드백 방식">
          <div className="w-[540px]">
            <CheckDropDown
              key={`feedbacks-${feedbacks.join('|')}`}
              options={FEEDBACKS}
              value={feedbacks}
              onChange={(v: unknown) => setFeedbacks(Array.isArray(v) ? (v as string[]) : [])}
            />
          </div>
        </Row>

        <Row label="테스트 소요 시간">
          <div className="w-[340px]">
            <Dropdown
              value={duration}
              onChange={(v: unknown) => setDuration(String(v))}
              options={DURATIONS}
              placeholder="선택하세요"
            />
          </div>
        </Row>

        <Row label="모집 인원">
          <div className="w-[340px]">
            <ParticipationCheck
              value={people}
              onChange={(v: unknown) => setPeople(Number(v))}
              step={10}
              min={0}
              suffix="명"
            />
          </div>
        </Row>

        <Row label="모집 마감일">
          <div className="w-[420px]">
            <DateCheck value={range} onChange={(v: DateRange | undefined) => setRange(v)} />
          </div>
        </Row>

        <Row label="참여 조건">
          <ConditionCheck className="!mx-0" initial={conditionInitial} />
        </Row>
      </div>

      {showDetail && (
        <div className="mt-10">
          <DetailCheck
            key={`${postId ?? 'new'}:${(detailInitial.privacyItems ?? []).join('|')}`}
            initial={detailInitial}
          />
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
