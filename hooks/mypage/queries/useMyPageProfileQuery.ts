import { QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { usePostsQueryDto } from '@/hooks/posts/usePostsQueryDto';
import {
  getMyPageProfileResponseSchema,
  GetMyPageProfileResponseType,
  GetMyPageProfileDataType,
} from '../dto/profile';

const BASE_PATH = '/v1/users/mypage/profile';

async function fetchMyPageProfile(): Promise<GetMyPageProfileResponseType> {
  const res = await instance.get(BASE_PATH);
  return res.data as GetMyPageProfileResponseType;
}

export function useMyPageProfileQuery(options?: { enabled?: boolean }) {
  const key: QueryKey = ['get-my-page-profile'];

  return usePostsQueryDto<GetMyPageProfileDataType, GetMyPageProfileResponseType>(
    key,
    fetchMyPageProfile,
    getMyPageProfileResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled ?? false, // 기본값을 false로 설정
      retry: false, // 401 에러 시 재시도하지 않음
    },
  );
}
