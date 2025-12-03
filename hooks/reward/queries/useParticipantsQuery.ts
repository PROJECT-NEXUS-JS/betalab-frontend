import { useQuery, QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { ParticipantsResponseSchema, ParticipantsResponseType } from '../dto/participants';

const BASE_PATH = '/v1/users/participations/posts';

export interface ParticipantsQueryParams {
  postId: number;
  status?: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'PAID' | 'REJECTED' | null;
  searchKeyword?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
}

async function fetchParticipants(params: ParticipantsQueryParams): Promise<ParticipantsResponseType> {
  const { postId, status, searchKeyword, sortDirection = 'DESC', page = 0, size = 20 } = params;

  const queryParams = new URLSearchParams();
  if (status) {
    queryParams.append('searchRequest[status]', status);
  }
  if (searchKeyword) {
    queryParams.append('searchRequest[searchKeyword]', searchKeyword);
  }
  if (sortDirection) {
    queryParams.append('searchRequest[sortDirection]', sortDirection);
  }
  queryParams.append('pageable[page]', page.toString());
  queryParams.append('pageable[size]', size.toString());

  const res = await instance.get(`${BASE_PATH}/${postId}/participants?${queryParams.toString()}`);
  return ParticipantsResponseSchema.parse(res.data);
}

export function useParticipantsQuery(params: ParticipantsQueryParams) {
  const key: QueryKey = ['reward', 'participants', params.postId, params];

  return useQuery({
    queryKey: key,
    queryFn: () => fetchParticipants(params),
    enabled: !!params.postId,
  });
}

