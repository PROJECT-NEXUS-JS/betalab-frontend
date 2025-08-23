import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { ProfileSchema } from '../dto';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const ProfileResponseSchema = BaseModelSchema(ProfileSchema);
export type ProfileResponseModel = z.infer<typeof ProfileResponseSchema>;

const BASE_PATH = 'v1/users/profile';

export const getProfile = async () => {
  try {
    const response = await instance.get<any>(`${BASE_PATH}`);
    console.log('실제 API 응답 데이터:', response.data);
    return ProfileResponseSchema.parse(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // ZodError일 경우, 상세한 에러 이슈를 출력
      console.error('Zod 파싱 에러:', error.issues);
    } else {
      // 그 외의 에러는 일반 에러로 출력
      console.error('getProfile 함수 에러:', error);
    }
    throw error;
  }
};
export const useProfileQuery = (): UseQueryResult<ProfileResponseModel> => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
