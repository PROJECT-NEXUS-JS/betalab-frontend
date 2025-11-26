import { QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { usePostsQueryDto } from '@/hooks/posts/usePostsQueryDto';
import {
  getTotalParticipationResponseSchema,
  GetTotalParticipationResponseType,
  GetTotalParticipationDataType,
} from '../dto/totalParticipation';

const BASE_PATH = '/v1/users/mypage/total-participation';

async function fetchTotalParticipation(): Promise<GetTotalParticipationResponseType> {
  const res = await instance.get(BASE_PATH);
  return res.data as GetTotalParticipationResponseType;
}

export function useTotalParticipationQuery(options?: { enabled?: boolean }) {
  const key: QueryKey = ['get-total-participation'];

  return usePostsQueryDto<GetTotalParticipationDataType, GetTotalParticipationResponseType>(
    key,
    fetchTotalParticipation,
    getTotalParticipationResponseSchema,
    {
      select: data => data.data,
      enabled: options?.enabled ?? true,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  );
}

