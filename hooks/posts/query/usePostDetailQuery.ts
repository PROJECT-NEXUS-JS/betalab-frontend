import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { ProjectDataSchema } from '@/hooks/posts/dto/postDetail';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

const ProjectDetailResponseSchema = BaseModelSchema(ProjectDataSchema);

type ProjectDetailResponseModel = z.infer<typeof ProjectDetailResponseSchema>;

const BASE_PATH = '/v1/users/posts';

export const getPostDetail = async (postId: number) => {
  const response = await instance.get(`${BASE_PATH}/${postId}`);
  return ProjectDetailResponseSchema.parse(response.data);
};

// useQuery 훅: 데이터 사용 용도 (반환값 있음)
export const useGetPostDetailQuery = (
  postId: number,
): UseQueryResult<ProjectDetailResponseModel> => {
  return useQuery({
    queryKey: queryKeys.posts.detail(postId),
    queryFn: () => getPostDetail(postId),
  });
};
