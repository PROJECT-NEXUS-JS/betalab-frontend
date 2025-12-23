import { z } from 'zod';

// 카테고리 스키마
export const categorySchema = z
  .object({
    code: z.string(),
    name: z.string(),
  })
  .strict();

export type CategoryType = z.infer<typeof categorySchema>;

// 일정 스키마
export const scheduleSchema = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
    recruitmentDeadline: z.string(),
    durationTime: z.string(),
  })
  .strict();

export type ScheduleType = z.infer<typeof scheduleSchema>;

// 보상 스키마
export const rewardSchema = z
  .object({
    rewardType: z.enum(['CASH', 'GIFT_CARD', 'PRODUCT', 'NONE']),
    rewardDescription: z.string().nullable(),
  })
  .strict();

export type RewardType = z.infer<typeof rewardSchema>;

// 공통 테스트 카드 스키마
export const testCardSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    serviceSummary: z.string(),
    thumbnailUrl: z.string().nullable(),
    mainCategories: z.array(categorySchema),
    platformCategories: z.array(categorySchema),
    genreCategories: z.array(categorySchema),
    schedule: scheduleSchema.optional(),
    reward: rewardSchema.optional(),
    hasReward: z.boolean().optional(),
  })
  .strict();

export type TestCardType = z.infer<typeof testCardSchema>;
