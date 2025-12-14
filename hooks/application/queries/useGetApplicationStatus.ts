import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';
import { GetApplicationStatusResponseSchema } from '../dto/apply';

const BASE_PATH = '/v1/users/participations/posts';

async function getApplicationStatus(postId: number) {
  const response = await instance.get(`${BASE_PATH}/${postId}/status`);
  return GetApplicationStatusResponseSchema.parse(response.data);
}

export default function useGetApplicationStatus(postId: number) {
  return useQuery({
    queryKey: queryKeys.application.status(postId),
    queryFn: () => getApplicationStatus(postId),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
  });
}
