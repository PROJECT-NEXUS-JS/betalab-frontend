import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 마감 임박 테스트 아이템 스키마 (API 스키마에 맞춤)
const testDeadlineSchema = z
  .object({
    postId: z.number(),
    category: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    deadline: z.string(), // "2025-08-24" 형태의 날짜 문자열
  })
  .strict();

export type TestDeadlineType = z.infer<typeof testDeadlineSchema>;

// 관심 목록 응답 데이터 스키마
const watchlistDataSchema = z
  .object({
    testsNearingDeadline: z.array(testDeadlineSchema),
  })
  .strict();

export type WatchlistDataType = z.infer<typeof watchlistDataSchema>;

// 관심 목록 응답 스키마
export const getWatchlistResponseSchema = BaseModelSchema(watchlistDataSchema);

export type GetWatchlistResponseType = z.infer<typeof getWatchlistResponseSchema>;
export type GetWatchlistDataType = z.infer<typeof watchlistDataSchema> | undefined;
