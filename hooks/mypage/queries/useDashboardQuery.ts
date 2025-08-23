import { QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { usePostsQueryDto } from '@/hooks/posts/usePostsQueryDto';
import {
  getDashboardResponseSchema,
  GetDashboardResponseType,
  GetDashboardDataType,
} from '../dto/dashboard';

const BASE_PATH = '/v1/users/mypage/dashboard';

async function fetchDashboard(): Promise<GetDashboardResponseType> {
  try {
    const res = await instance.get(BASE_PATH);
    return res.data as GetDashboardResponseType;
  } catch (error: any) {
    if (error.response?.status === 403) {
      const res = await fetch(BASE_PATH);
      const data = await res.json();
      return data as GetDashboardResponseType;
    }
    throw error;
  }
}

export function useDashboardQuery(options?: { enabled?: boolean }) {
  const key: QueryKey = ['get-dashboard'];

  return usePostsQueryDto<GetDashboardDataType, GetDashboardResponseType>(
    key,
    fetchDashboard,
    getDashboardResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled,
    },
  );
}
