import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { PieChartSchema } from '../dto/pieChart';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const PieChartResponseSchema = BaseModelSchema(PieChartSchema);
export type PieChartResponseModel = z.infer<typeof PieChartResponseSchema>;

const BASE_PATH = (postId: number) => `/v1/users/dashboard/${postId}/analytics/pie-chart`;

export const getPieChart = async (postId: number) => {
  try {
    const response = await instance.get<any>(`${BASE_PATH(postId)}`);
    console.log('실제 PieChart API 응답 데이터:', response.data);
    return PieChartResponseSchema.parse(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod 파싱 에러:', error.issues);
    } else {
      console.error('getPieChart 함수 에러:', error);
    }
    throw error;
  }
};

export const usePieChartQuery = (postId: number): UseQueryResult<PieChartResponseModel> => {
  return useQuery({
    queryKey: queryKeys.dashboard.pieChart(postId),
    queryFn: () => getPieChart(postId),
    staleTime: 0, // 항상 stale로 간주하여 즉시 refetch
    refetchOnMount: true, // 마운트 시 refetch
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch
    refetchInterval: 30000, // 30초마다 자동 refetch
  });
};
