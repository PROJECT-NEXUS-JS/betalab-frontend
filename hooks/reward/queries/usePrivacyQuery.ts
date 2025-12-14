import { useQuery, QueryKey } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { PrivacyResponseSchema, PrivacyResponseType } from '../dto/privacy';

const BASE_PATH = '/v1/users/participations/posts';

interface PrivacyQueryOptions {
  postId: number;
  page?: number;
  size?: number;
  sort?: string[];
}

async function fetchPrivacy({
  postId,
  page = 0,
  size = 10,
  sort = [],
}: PrivacyQueryOptions): Promise<PrivacyResponseType> {
  const params = new URLSearchParams();
  params.append('pageable', JSON.stringify({ page, size, sort }));

  const res = await instance.get(`${BASE_PATH}/${postId}/privacy?${params.toString()}`);
  return PrivacyResponseSchema.parse(res.data);
}

export function usePrivacyQuery(options: PrivacyQueryOptions) {
  const { postId, page = 0, size = 10, sort = [] } = options;
  const key: QueryKey = ['reward', 'privacy', postId, { page, size, sort }];

  return useQuery({
    queryKey: key,
    queryFn: () => fetchPrivacy({ postId, page, size, sort }),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

