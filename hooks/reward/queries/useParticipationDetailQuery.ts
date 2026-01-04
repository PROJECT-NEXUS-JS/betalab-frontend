import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import {
  ParticipationDetailResponseSchema,
  ParticipationDetailResponseType,
} from '../dto/participationDetail';

const BASE_PATH = '/v1/users/participations';

async function fetchParticipationDetail(
  participationId: number,
): Promise<ParticipationDetailResponseType> {
  const res = await instance.get(`${BASE_PATH}/${participationId}`);
  return ParticipationDetailResponseSchema.parse(res.data);
}

export function useParticipationDetailQuery(participationId: number | null) {
  return useQuery({
    queryKey: ['reward', 'participationDetail', participationId],
    queryFn: () => fetchParticipationDetail(participationId!),
    enabled: participationId !== null,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
