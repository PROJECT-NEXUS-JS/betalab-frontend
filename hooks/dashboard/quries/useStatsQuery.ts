import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { StatsSchema } from '../dto/stats';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const StatsResponseSchema = BaseModelSchema(StatsSchema);
export type StatsResponseModel = z.infer<typeof StatsResponseSchema>;

const BASE_PATH = (postId: number) => `/v1/users/dashboard/${postId}/stats`;

export const getStats = async (postId: number) => {
  const response = await instance.get<any>(`${BASE_PATH(postId)}`);
  return StatsResponseSchema.parse(response.data);
};

export const useStatsQuery = (postId: number): UseQueryResult<StatsResponseModel> => {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(postId),
    queryFn: () => getStats(postId),
    staleTime: 0, // 항상 stale로 간주하여 즉시 refetch
    refetchOnMount: true, // 마운트 시 refetch
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch
    refetchInterval: 30000, // 30초마다 자동 refetch
  });
};
