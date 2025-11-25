import { useQuery, QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { StatisticsResponseSchema, StatisticsResponseType } from '../dto/statistics';

const BASE_PATH = '/v1/users/participations/posts';

async function fetchStatistics(postId: number): Promise<StatisticsResponseType> {
  const res = await instance.get(`${BASE_PATH}/${postId}/statistics`);
  return StatisticsResponseSchema.parse(res.data);
}

export function useStatisticsQuery(postId: number) {
  const key: QueryKey = ['reward', 'statistics', postId];

  return useQuery({
    queryKey: key,
    queryFn: () => fetchStatistics(postId),
    enabled: !!postId,
  });
}

