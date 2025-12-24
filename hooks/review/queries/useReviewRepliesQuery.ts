import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { z } from 'zod';

const ReviewReplyItemSchema = z.object({
  id: z.number(),
  reviewId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  writer: z.object({
    id: z.number(),
    nickname: z.string(),
    profileUrl: z.string(),
  }),
});

export const ReviewRepliesResponseSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  data: z.array(ReviewReplyItemSchema),
});

export type ReviewReplyItemType = z.infer<typeof ReviewReplyItemSchema>;
export type ReviewRepliesResponseType = z.infer<typeof ReviewRepliesResponseSchema>;

export const getReviewReplies = async (reviewId: number): Promise<ReviewRepliesResponseType> => {
  const response = await instance.get(`/v1/users/reviews/${reviewId}/replies`);
  return ReviewRepliesResponseSchema.parse(response.data);
};

export const useReviewRepliesQuery = (
  reviewId: number,
  options?: { enabled?: boolean },
): UseQueryResult<ReviewRepliesResponseType> => {
  return useQuery({
    queryKey: ['reviewReplies', reviewId],
    queryFn: () => getReviewReplies(reviewId),
    enabled: options?.enabled ?? !!reviewId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

