import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { categorySchema, scheduleSchema, rewardSchema } from '@/types/models/testCard';

// 관심 목록 테스트 아이템 스키마 (TestCardType과 동일)
const watchlistTestSchema = z
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
  })
  .strict();

export type WatchlistTestType = z.infer<typeof watchlistTestSchema>;

// 관심 목록 응답 데이터 스키마
const watchlistDataSchema = z
  .object({
    testsNearingDeadline: z.array(watchlistTestSchema),
  })
  .strict();

export type WatchlistDataType = z.infer<typeof watchlistDataSchema>;

// 관심 목록 응답 스키마
export const getWatchlistResponseSchema = BaseModelSchema(watchlistDataSchema);

export type GetWatchlistResponseType = z.infer<typeof getWatchlistResponseSchema>;
export type GetWatchlistDataType = z.infer<typeof watchlistDataSchema> | undefined;
