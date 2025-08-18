import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { RightSidebarSchema } from '../dto/postRightSidebar';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

export const RightSidebarResponseSchema = BaseModelSchema(RightSidebarSchema);

export type RightSidebarModel = z.infer<typeof RightSidebarResponseSchema>;

const BASE_PATH = (postId: string) => `/v1/users/posts/${postId}/right-sidebar`;

const getPostRightSidebar = async (postId: string) => {
  const response = await instance.get(BASE_PATH(postId));
  return RightSidebarResponseSchema.parse(response.data);
};

export const useGetRightSidebar = (postId: string): UseQueryResult<RightSidebarModel> => {
  return useQuery({
    queryKey: queryKeys.posts.rightSidebar(postId),
    queryFn: () => getPostRightSidebar(postId),
  });
};
