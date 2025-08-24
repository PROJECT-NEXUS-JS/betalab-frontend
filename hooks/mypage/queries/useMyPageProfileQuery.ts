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
  try {
    const res = await instance.get(BASE_PATH);
    return res.data as GetMyPageProfileResponseType;
  } catch (error: any) {
    if (error.response?.status === 403) {
      const res = await fetch(BASE_PATH);
      const data = await res.json();
      return data as GetMyPageProfileResponseType;
    }
    throw error;
  }
}

export function useMyPageProfileQuery(options?: { enabled?: boolean }) {
  const key: QueryKey = ['get-my-page-profile'];

  return usePostsQueryDto<GetMyPageProfileDataType, GetMyPageProfileResponseType>(
    key,
    fetchMyPageProfile,
    getMyPageProfileResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled,
    },
  );
}
