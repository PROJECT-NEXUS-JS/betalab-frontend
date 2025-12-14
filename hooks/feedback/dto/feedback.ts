import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

export const BugTypeEnum = z.enum([
  'UI_UX_ERROR',
  'FUNCTIONAL_ERROR',
  'DATA_INPUT_ERROR',
  'CRASH',
  'TYPO',
  'NOTIFICATION_ISSUE',
  'OTHER',
]);

export type BugType = z.infer<typeof BugTypeEnum>;

export const MostInconvenientEnum = z.enum([
  'UI_UX',
  'SPEED',
  'FUNCTION',
  'TEXT_GUIDE',
  'GUIDE',
  'OTHER',
]);

export type MostInconvenientType = z.infer<typeof MostInconvenientEnum>;

// ========== 요청 ===========
export const FeedbackRequestSchema = z
  .object({
    participationId: z.number().int(),

    // 만족도 (1~5점)
    overallSatisfaction: z.number().int().min(1).max(5), // 전반적 만족도
    recommendationIntent: z.number().int().min(1).max(5), // 추천 의향
    reuseIntent: z.number().int().min(1).max(5), // 재사용 의향

    // 기능별 사용성 평가 (1~5점)
    functionalityScore: z.number().int().min(1).max(5), // 기능 점수
    comprehensibilityScore: z.number().int().min(1).max(5), // 기능 설명 이해도 점수
    speedScore: z.number().int().min(1).max(5), // 로딩 속도 점수
    responseTimingScore: z.number().int().min(1).max(5), // 반응 타이밍 점수

    // 가장 불편했던 점
    mostInconvenient: MostInconvenientEnum,

    // 버그 유무 및 상세
    hasBug: z.boolean(),
    bugTypes: z.array(BugTypeEnum).optional(),
    bugLocation: z.string().optional(), // TODO: 발생 위치, 설명 한 번에 받음
    bugDescription: z.string().optional(), // TODO: 입력 부분 없음
    screenshotUrls: z.array(z.string()).optional(), // TODO: 입력 부분 없음

    // 서술형 항목
    // goodPoints: z.string().optional(), // 좋았던 점
    // improvementSuggestions: z.string().optional(), // 개선 제안
    // additionalComments: z.string().optional(), // 추가 의견
    goodPoints: z.string().min(1), // 좋았던 점
    improvementSuggestions: z.string().min(1), // 개선 제안
    additionalComments: z.string().min(1), // 추가 의견
  })
  .refine(
    data => {
      if (!data.hasBug) return true;
      return !!data.bugTypes && data.bugTypes.length > 0;
    },
    {
      message: '버그 유형을 하나 이상 선택해주세요.',
      path: ['bugTypes'],
    },
  )
  .refine(
    data => {
      if (!data.hasBug) return true;
      return !!data.bugLocation && data.bugLocation.trim().length > 0;
    },
    {
      message: '문제 발생 위치를 입력해주세요.',
      path: ['bugLocation'],
    },
  );

export type FeedbackRequestType = z.infer<typeof FeedbackRequestSchema>;

// ========== 응답 ===========

// 공통으로 사용되는 핵심 데이터 (설문 내용)
const FeedbackBaseSchema = z.object({
  participationId: z.number().int(),

  // 만족도 & 의향
  overallSatisfaction: z.number().int().min(0).max(5),
  recommendationIntent: z.number().int().min(0).max(5),
  reuseIntent: z.number().int().min(0).max(5),

  // 버그 관련
  mostInconvenient: MostInconvenientEnum,
  hasBug: z.boolean(),
  bugTypes: z.array(BugTypeEnum),
  bugLocation: z.string(),
  bugDescription: z.string(),
  screenshotUrls: z.array(z.string()),

  // 사용성 점수
  functionalityScore: z.number().int().min(0).max(5),
  comprehensibilityScore: z.number().int().min(0).max(5),
  speedScore: z.number().int().min(0).max(5),
  responseTimingScore: z.number().int().min(0).max(5),

  // 서술형
  goodPoints: z.string(),
  improvementSuggestions: z.string(),
  additionalComments: z.string(),

  // 날짜
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const DraftSchema = FeedbackBaseSchema.extend({
  draftId: z.number().int().positive(),
});

export const FeedbackSchema = FeedbackBaseSchema.extend({
  feedbackId: z.number().int().positive(),
  averageSatisfaction: z.number().min(0).max(5),
  averageUsabilityScore: z.number().min(0).max(5),
});

export const FeedbackDetailResponseSchema = BaseModelSchema(FeedbackSchema);

export const MyFeedbackResponseSchema = BaseModelSchema(
  z.object({
    participationId: z.number().int(),
    hasSubmitted: z.boolean(),
    hasDraft: z.boolean(),
    feedback: FeedbackSchema.nullable(),
    draft: DraftSchema.nullable(),
  }),
);
