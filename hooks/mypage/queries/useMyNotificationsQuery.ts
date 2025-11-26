import { QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { usePostsQueryDto } from '@/hooks/posts/usePostsQueryDto';
import {
  getMyNotificationsResponseSchema,
  GetMyNotificationsResponseType,
  GetMyNotificationsDataType,
} from '../dto/notifications';

const BASE_PATH = '/v1/users/my/notifications';

async function fetchMyNotifications(): Promise<GetMyNotificationsResponseType> {
  const res = await instance.get(BASE_PATH);
  return res.data as GetMyNotificationsResponseType;
}

export function useMyNotificationsQuery(options?: { enabled?: boolean }) {
  const key: QueryKey = ['get-my-notifications'];

  return usePostsQueryDto<GetMyNotificationsDataType, GetMyNotificationsResponseType>(
    key,
    fetchMyNotifications,
    getMyNotificationsResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled ?? true,
      retry: false,
      staleTime: 1 * 60 * 1000, // 1분
    },
  );
}

