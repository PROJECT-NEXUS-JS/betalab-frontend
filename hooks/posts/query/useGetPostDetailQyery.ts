import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { ProjectDataSchema } from '@/hooks/posts/dto/postDetail';

import { usePrefetchQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

const ProjectDetailResponseSchema = BaseModelSchema(
  z.object({
    data: ProjectDataSchema,
  }),
);

type ProjectDetailResponseModel = z.infer<typeof ProjectDetailResponseSchema>;

const BASE_PATH = '/v1/users/posts/';

const getPostDetail = async (postId: number) => {
  const response = await instance.get(`/${BASE_PATH}/${postId}`);
  return ProjectDetailResponseSchema.parse(response.data);
};

export const useGetPostDetailQuery = (postId: number) => {
  return usePrefetchQuery<ProjectDetailResponseModel>({
    queryKey: queryKeys.posts.detail(postId),
    queryFn: () => getPostDetail(postId),
  });
};
