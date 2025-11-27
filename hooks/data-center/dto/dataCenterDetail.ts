import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

export type StatusEnum = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED';

const InsightItemSchema = z.object({
  feedbackId: z.number(),
  summary: z.string(),
  fullContent: z.string(),
  emoji: z.string(),
});

const ProblemLocationSchema = z.object({
  location: z.string(),
  problemType: z.string(),
  reportCount: z.number(),
});

const SummarySchema = z.object({
  totalParticipants: z.number(),
  participantChangeRate: z.number(),
  thisWeekParticipants: z.number(),
  averageSatisfaction: z.number(),
  satisfactionChangeRate: z.number(),
  bugOccurrenceRate: z.number(),
  bugRateChangeRate: z.number(),
  totalFeedbacks: z.number(),
  bugCount: z.number(),
  positiveFeedbackRate: z.number(),
  positiveFeedbackChangeRate: z.number(),
  positiveFeedbackCount: z.number(),
});

const OverallEvaluationSchema = z.object({
  averageSatisfaction: z.number(),
  averageRecommendation: z.number(),
  averageReuse: z.number(),
  satisfactionDistribution: z.record(z.string(), z.number()),
  recommendationDistribution: z.record(z.string(), z.number()),
  reuseDistribution: z.record(z.string(), z.number()),
});

const QualityFeedbackSchema = z.object({
  topInconvenientElements: z.record(z.string(), z.number()),
  bugExistenceRate: z.number(),
  bugExistCount: z.number(),
  noBugCount: z.number(),
  satisfactionScoreDistribution: z.record(z.string(), z.number()),
  problemTypeProportions: z.record(z.string(), z.number()),
  topProblemLocations: z.array(ProblemLocationSchema),
  screenshotPreviews: z.array(z.string()),
});

const UsabilityEvaluationSchema = z.object({
  functionalityScore: z.number(),
  comprehensibilityScore: z.number(),
  loadingSpeedScore: z.number(),
  responseTimingScore: z.number(),
  stabilityScore: z.number(),
});

const InsightsSchema = z.object({
  positiveFeedbacks: z.array(InsightItemSchema),
  improvementSuggestions: z.array(InsightItemSchema),
  keywords: z.record(z.string(), z.number()),
});

// 전체 데이터 구조
const AnalyticsDataSchema = z.object({
  summary: SummarySchema,
  overallEvaluation: OverallEvaluationSchema,
  qualityFeedback: QualityFeedbackSchema,
  usabilityEvaluation: UsabilityEvaluationSchema,
  insights: InsightsSchema,
});

export const DataCenterDetailResponseModel = BaseModelSchema(AnalyticsDataSchema);
