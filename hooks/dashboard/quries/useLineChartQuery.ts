import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { LineChartSchema } from '../dto/lineChart';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const LineChartResponseSchema = BaseModelSchema(LineChartSchema);
export type LineChartResponseModel = z.infer<typeof LineChartResponseSchema>;

const BASE_PATH = (postId: number) => `/v1/users/dashboard/${postId}/analytics/line-chart`;

export const getLineChart = async (postId: number) => {
  try {
    const response = await instance.get<any>(`${BASE_PATH(postId)}`);
    return LineChartResponseSchema.parse(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod 파싱 에러:', error.issues);
    } else {
      console.error('getLineChart 함수 에러:', error);
    }
    throw error;
  }
};

export const useLineChartQuery = (postId: number): UseQueryResult<LineChartResponseModel> => {
  return useQuery({
    queryKey: queryKeys.dashboard.lineChart(postId),
    queryFn: () => getLineChart(postId),
    staleTime: 0, // 항상 stale로 간주하여 즉시 refetch
    refetchOnMount: true, // 마운트 시 refetch
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch
    refetchInterval: 30000, // 30초마다 자동 refetch
  });
};
