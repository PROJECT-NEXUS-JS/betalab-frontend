import { z } from 'zod';
import { PageableSchema, SortSchema } from './application';

export const RecentReviewSchema = z.object({
  reviewId: z.number(),
  reviewerNickname: z.string(),
  reviewerProfileImageUrl: z.string().nullable(),
  rating: z.number().min(0).max(5),
  content: z.string(),
  createdAt: z.string(),
});

export const RecentReviewsResponseSchema = z.object({
  totalElements: z.number(),
  totalPages: z.number(),
  pageable: PageableSchema,
  size: z.number(),
  content: z.array(RecentReviewSchema),
  number: z.number(),
  sort: SortSchema,
  numberOfElements: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  empty: z.boolean(),
});

export type RecentReviewModel = z.infer<typeof RecentReviewSchema>;
export type RecentReviewsResponseModel = z.infer<typeof RecentReviewsResponseSchema>;

