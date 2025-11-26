import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { WaitingParticipantsResponseSchema } from '../dto/waitingParticipants';
import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const WaitingParticipantsApiResponseSchema = BaseModelSchema(WaitingParticipantsResponseSchema);
export type WaitingParticipantsApiResponseModel = z.infer<typeof WaitingParticipantsApiResponseSchema>;

const BASE_PATH = (postId: number) => `/v1/users/dashboard/${postId}/quick-actions/waiting`;

interface WaitingParticipantsParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export const getWaitingParticipants = async (
  postId: number,
  params: WaitingParticipantsParams = {},
): Promise<WaitingParticipantsApiResponseModel> => {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString());
  }
  if (params.size !== undefined) {
    searchParams.append('size', params.size.toString());
  }
  if (params.sort && params.sort.length > 0) {
    params.sort.forEach(sort => searchParams.append('sort', sort));
  }

  const queryString = searchParams.toString();
  const url = queryString ? `${BASE_PATH(postId)}?${queryString}` : BASE_PATH(postId);

  const response = await instance.get<any>(url);
  return WaitingParticipantsApiResponseSchema.parse(response.data);
};

export const useWaitingParticipantsQuery = (
  postId: number,
  params: WaitingParticipantsParams = { page: 0, size: 5 },
): UseQueryResult<WaitingParticipantsApiResponseModel> => {
  return useQuery({
    queryKey: queryKeys.dashboard.waitingParticipants(postId, params),
    queryFn: () => getWaitingParticipants(postId, params),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

