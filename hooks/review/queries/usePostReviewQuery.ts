import z from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { ReviewDataSchema } from '@/hooks/review/dto';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

export const PostReviewResponseSchema = BaseModelSchema(ReviewDataSchema.array());
export type PostReviewResponseModel = z.infer<typeof PostReviewResponseSchema>;

const BASE_PATH = '/v1/users/reviews/post';

export const getPostReview = async (postId: number) => {
  const response = await instance.get(`${BASE_PATH}/${postId}`);
  return PostReviewResponseSchema.parse(response.data);
};

export const usePostReviewQuery = (postId: number): UseQueryResult<PostReviewResponseModel> => {
  return useQuery({
    queryKey: queryKeys.reviews.post(postId),
    queryFn: () => getPostReview(postId),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
