import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { BarChartSchema } from '../dto/barChart';

import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const BarChartResponseSchema = BaseModelSchema(BarChartSchema);
export type BarChartResponseModel = z.infer<typeof BarChartResponseSchema>;

const BASE_PATH = (postId: number) => `v1/users/dashboard/${postId}/stats`;

export const getBarChart = async (postId: number) => {
  try {
    const response = await instance.get<any>(`${BASE_PATH(postId)}`);
    console.log('실제 API 응답 데이터:', response.data);
    return BarChartResponseSchema.parse(response.data);
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

export const useBarChartQuery = (postId: number): UseQueryResult<BarChartResponseModel> => {
  return useQuery({
    queryKey: ['barChart', postId],
    queryFn: () => getBarChart(postId),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
