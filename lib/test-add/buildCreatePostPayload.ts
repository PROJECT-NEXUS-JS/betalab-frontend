import type { TestAddState } from '@/types/test-add';
import { isValid, parseISO } from 'date-fns';

const toISO = (v?: string | null) => {
  if (!v) return undefined;
  const d = v.includes('T') ? new Date(v) : parseISO(v);
  return isValid(d) ? d.toISOString() : undefined;
};
const mustISO = (name: string, v?: string | null) => {
  const iso = toISO(v);
  if (!iso) throw new Error(`${name}이(가) 필요하거나 형식이 잘못되었습니다.`);
  return iso;
};

const compact = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null));

export type CreatePostPayload = {
  title: string;
  serviceSummary: string;
  creatorIntroduction: string;
  description: string;
  mainCategory: string[];
  genreCategories: string[];
  platformCategory?: string[];
  startDate: string;
  endDate: string;
  recruitmentDeadline: string;
  durationTime: string;
  feedbackMethod: string;
  participationMethod: string;
  maxParticipants?: number;
  ageMin?: number;
  ageMax?: number;
  genderRequirement?: string;
  additionalRequirements?: string;
  screenerQuestions?: string[];
  rewardType?: 'CASH' | 'GIFT_CARD' | 'PRODUCT' | 'ETC';
  rewardDescription?: string;
  feedbackItems?: string[];
  qnaMethod?: string;
  storyGuide?: string;
  privacyItems?: Array<'NAME' | 'EMAIL' | 'CONTACT' | 'ETC'>;
  privacyPurpose?: string;
  mediaUrl?: string;
  teamMemberCount?: number;
};

export function buildCreatePostPayload(form: TestAddState): CreatePostPayload {
  if (!form.title) throw new Error('title이 없습니다.');
  if (!form.serviceSummary) throw new Error('serviceSummary가 없습니다.');
  if (!form.creatorIntroduction) throw new Error('creatorIntroduction이 없습니다.');
  if (!form.description) throw new Error('description이 없습니다.');
  if (!form.mainCategory?.length) throw new Error('mainCategory가 비어있습니다.');
  if (!form.durationTime) throw new Error('durationTime이 없습니다.');
  if (!form.feedbackMethod) throw new Error('feedbackMethod가 없습니다.');
  if (!form.participationMethod) throw new Error('participationMethod가 없습니다.');
  if (!form.genreCategories || form.genreCategories.length === 0) {
    throw new Error('genreCategories가 비어있습니다.');
  }

  const payload: CreatePostPayload = {
    //필수 필드
    title: form.title,
    serviceSummary: form.serviceSummary,
    creatorIntroduction: form.creatorIntroduction,
    description: form.description,
    mainCategory: form.mainCategory,
    genreCategories: form.genreCategories,
    startDate: mustISO('startDate', form.startDate),
    endDate: mustISO('endDate', form.endDate),
    recruitmentDeadline: mustISO('recruitmentDeadline', form.recruitmentDeadline),
    durationTime: form.durationTime,
    feedbackMethod: form.feedbackMethod,
    participationMethod: form.participationMethod,

    //선택 필드
    platformCategory: form.platformCategory,
    maxParticipants: form.maxParticipants,
    ageMin: form.ageMin,
    ageMax: form.ageMax,
    genderRequirement: form.genderRequirement ?? '무관',
    additionalRequirements: form.additionalRequirements,
    screenerQuestions: form.screenerQuestions,
    rewardType: form.rewardType as CreatePostPayload['rewardType'],
    rewardDescription: form.rewardDescription,
    feedbackItems: form.feedbackItems ?? [],
    qnaMethod: form.qnaMethod,
    storyGuide: form.storyGuide,
    privacyItems: (form.privacyItems as CreatePostPayload['privacyItems']) ?? [],
    privacyPurpose: form.privacyPurpose,
    mediaUrl: form.mediaUrl,
    teamMemberCount: form.teamMemberCount,
  };
  return compact(payload) as CreatePostPayload;
}
