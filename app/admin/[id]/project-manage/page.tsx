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

import {
  TestType,
  ConditionInitial,
  TEST_TYPES,
  DURATIONS,
  PLATFORMS,
  APP_PLATFORM_OPTIONS,
  FEEDBACKS,
  GENRES_APP,
  GENRES_WEB,
  GENRES_GAME,
  GENRES_BY_TYPE,
  MAIN_API_TO_UI,
  PLATFORM_API_TO_UI,
  GENRE_API_TO_UI_WEB,
  GENRE_API_TO_UI_APP,
  GENRE_API_TO_UI_GAME,
  pickGenreMap,
  FEEDBACK_API_TO_UI,
  PIItem,
  PI_API_TO_UI,
  parseISOorNull,
  firstArray,
} from './types';

function Row({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4 min-w-0">
      <div className="text-body-01 text-Dark-Gray">{label}</div>
      <div className="min-w-0 overflow-visible">{children}</div>
    </div>
  );
}

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
        const rawPI = firstArray<PIItem>(
          d?.feedback?.privacyItems,
          d?.privacyItems,
          d?.requirements?.privacyItems,
        );
        const piCodes = rawPI.map(x =>
          typeof x === 'string' ? x : (x?.code ?? x?.value ?? x?.name ?? ''),
        );
        const mappedPI = piCodes.map(k => PI_API_TO_UI[String(k)] ?? String(k)).filter(Boolean);

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
      } catch (e) {
        console.error('프로젝트 상세 조회 실패', e);
      }
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
          additionalRequirements: conditionInitial.extraText,
        },
        reward: {
          rewardDescription: conditionInitial.rewardText,
        },
      };

      const data = await updatePost(postId, payload, thumbnailFile, galleryFiles);

      alert('저장 성공!');
      console.log('PATCH 결과:', data);
    } catch (e: any) {
      console.error('PATCH 실패:', e);
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
