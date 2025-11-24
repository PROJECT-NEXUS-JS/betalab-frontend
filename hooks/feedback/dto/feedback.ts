import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// TODO: 서버와 통일 필요
const BugTypeEnum = z.enum([
  'UI_UX_ERROR',
  'FUNCTIONAL_ERROR',
  'RESPONSE_SPEED',
  'DATA_INPUT_ERROR',
  'CRASH',
  'TYPO',
  'NOTIFICATION_ISSUE',
  'OTHER',
]);

const MostInconvenientEnum = z.enum([
  'UI_UX',
  'SPEED',
  'FUNCTION',
  'TEXT_GUIDE',
  'LOADING',
  'OTHER',
]);

// ========== 요청 ===========
export const FeedbackRequestSchema = z.object({
  participationId: z.number().int().positive(),

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
  bugTypes: z.array(BugTypeEnum),
  bugLocation: z.string(), // TODO: 발생 위치, 설명 한 번에 받음
  bugDescription: z.string(), // TODO: 발생 위치, 설명 한 번에 받음
  screenshotUrls: z.array(z.string()), // TODO: 입력 부분 없음

  // 서술형 항목
  goodPoints: z.string(), // 좋았던 점
  improvementSuggestions: z.string(), // 개선 제안
  additionalComments: z.string(), // 추가 의견
});

export type FeedbackRequestType = z.infer<typeof FeedbackRequestSchema>;

// ========== 응답 ===========

export const FeedbackSchema = z.object({
  participationId: z.number().int().positive(),
  overallSatisfaction: z.number().int().min(0).max(5), // 0~5점
  recommendationIntent: z.number().int().min(0).max(5),
  reuseIntent: z.number().int().min(0).max(5),
  mostInconvenient: MostInconvenientEnum,
  hasBug: z.boolean(),
  bugTypes: z.array(BugTypeEnum),
  bugLocation: z.string(),
  bugDescription: z.string(),
  screenshotUrls: z.array(z.string()),
  functionalityScore: z.number().int().min(0).max(5),
  comprehensibilityScore: z.number().int().min(0).max(5),
  speedScore: z.number().int().min(0).max(5),
  responseTimingScore: z.number().int().min(0).max(5),
  goodPoints: z.string(),
  improvementSuggestions: z.string(),
  additionalComments: z.string(),
  feedbackId: z.number().int().positive(),
  averageSatisfaction: z.number().min(0).max(5),
  averageUsabilityScore: z.number().min(0).max(5),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const FeedbackDetailResponseSchema = BaseModelSchema(FeedbackSchema);

