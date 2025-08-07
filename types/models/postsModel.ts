import { z } from 'zod';

// 일정 정보를 위한 스키마
export const PostScheduleResponseSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  recruitmentDeadline: z.string(),
  durationTime: z.string(),
});

// GET/v1/users/posts/list 응답에서 PostCard 컴포넌트에 사용되는 데이터 타입입니다.
export const PostCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  serviceSummary: z.string(),
  thumbnailUrl: z.string(),
  mainCategories: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
    }),
  ),
  platformCategories: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
    }),
  ),
  reward: z.object({
    rewardType: z.string(),
    rewardDescription: z.enum(['CASH', 'GIFT_CARD', 'PRODUCT', 'NONE']),
  }),
  schedule: PostScheduleResponseSchema,
});

export type PostCardModel = z.infer<typeof PostCardSchema>;
