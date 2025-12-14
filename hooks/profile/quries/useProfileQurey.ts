import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { ProfileSchema } from '../dto';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const ProfileResponseSchema = BaseModelSchema(ProfileSchema);
export type ProfileResponseModel = z.infer<typeof ProfileResponseSchema>;

const BASE_PATH = 'v1/users/profile';

export const getProfile = async () => {
  const response = await instance.get<any>(`${BASE_PATH}`);
  return ProfileResponseSchema.parse(response.data);
};
export const useProfileQuery = (): UseQueryResult<ProfileResponseModel> => {
  return useQuery({
    queryKey: [queryKeys.dashboard.profile],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
