import { useQuery, QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { ParticipantsResponseSchema, ParticipantsResponseType } from '../dto/participants';

const BASE_PATH = '/v1/users/participations/posts';

interface SearchRequest {
  status?: 'PENDING' | 'APPROVED' | 'FEEDBACK_COMPLETED' | 'TEST_COMPLETED' | 'REJECTED' | null;
  searchKeyword?: string;
  sortDirection?: 'ASC' | 'DESC';
}

interface ParticipantsQueryOptions {
  postId: number;
  searchRequest?: SearchRequest;
  page?: number;
  size?: number;
  sort?: string[];
}

async function fetchParticipants({
  postId,
  searchRequest,
  page = 0,
  size = 10,
  sort = [],
}: ParticipantsQueryOptions): Promise<ParticipantsResponseType> {
  const params = new URLSearchParams();
  
  if (searchRequest) {
    params.append('searchRequest', JSON.stringify(searchRequest));
  }
  
  params.append('pageable', JSON.stringify({ page, size, sort }));

  const res = await instance.get(`${BASE_PATH}/${postId}/participants?${params.toString()}`);
  return ParticipantsResponseSchema.parse(res.data);
}

export function useParticipantsQuery(options: ParticipantsQueryOptions) {
  const { postId, searchRequest, page = 0, size = 10, sort = [] } = options;
  const key: QueryKey = ['reward', 'participants', postId, { searchRequest, page, size, sort }];

  return useQuery({
    queryKey: key,
    queryFn: () => fetchParticipants({ postId, searchRequest, page, size, sort }),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

