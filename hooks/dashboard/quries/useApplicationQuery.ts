import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { ApplicationSchema, StatusEnum } from '../dto/application';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const ApplicationResponseSchema = BaseModelSchema(ApplicationSchema);
export type ApplicationResponseModel = z.infer<typeof ApplicationResponseSchema>;

const BASE_PATH = (postId: number, status: StatusEnum) =>
  `/v1/users/posts/${postId}/applications/${status}`;

export const getApplication = async (postId: number, status: StatusEnum) => {
  const response = await instance.get<any>(`${BASE_PATH(postId, status)}`);
  return ApplicationResponseSchema.parse(response.data);
};

export const useApplicationQuery = (
  postId: number,
  status: StatusEnum,
): UseQueryResult<ApplicationResponseModel> => {
  return useQuery({
    queryKey: queryKeys.dashboard.application(postId, status),
    queryFn: () => getApplication(postId, status),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
