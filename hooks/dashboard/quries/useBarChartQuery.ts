import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { BarChartSchema } from '../dto/barChart';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const BarChartResponseSchema = BaseModelSchema(BarChartSchema);
export type BarChartResponseModel = z.infer<typeof BarChartResponseSchema>;

const BASE_PATH = (postId: number) => `/v1/users/dashboard/${postId}/analytics/bar-chart`;

export const getBarChart = async (postId: number) => {
  const response = await instance.get<any>(`${BASE_PATH(postId)}`);
  return BarChartResponseSchema.parse(response.data);
};

export const useBarChartQuery = (postId: number): UseQueryResult<BarChartResponseModel> => {
  return useQuery({
    queryKey: queryKeys.dashboard.barChart(postId),
    queryFn: () => getBarChart(postId),
    staleTime: 0, // 항상 stale로 간주하여 즉시 refetch
    refetchOnMount: true, // 마운트 시 refetch
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch
    refetchInterval: 30000, // 30초마다 자동 refetch
  });
};
