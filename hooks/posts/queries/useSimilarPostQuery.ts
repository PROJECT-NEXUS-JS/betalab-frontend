import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { SimilarPostSchema } from '../dto/similarPost';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

export const SimilarPostResponseSchema = BaseModelSchema(SimilarPostSchema.array());

export type SimilarPostModel = z.infer<typeof SimilarPostResponseSchema>;

const BASE_PATH = (postId: number) => `/v1/users/posts/${postId}/similar`;

const getSimilarPosts = async (postId: number) => {
  const response = await instance.get(BASE_PATH(postId));
  return SimilarPostResponseSchema.parse(response.data);
};

export const useSimilarPosts = (postId: number): UseQueryResult<SimilarPostModel> => {
  return useQuery({
    queryKey: queryKeys.posts.similarPosts(postId),
    queryFn: () => getSimilarPosts(postId),
  });
};
