import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GetMyPostsRequestType, GetMyPostsResponseType } from '../dto/myPosts';
import { instance } from '@/apis/instance';

const BASE_PATH = '/v1/users/posts/my';

const getMyPosts = async (params: GetMyPostsRequestType): Promise<GetMyPostsResponseType> => {
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

  const response = await instance.get(`${BASE_PATH}?${searchParams.toString()}`);
  return response.data;
};

export const useMyPostsQuery = (
  params: GetMyPostsRequestType = { page: 0, size: 9 },
): UseQueryResult<GetMyPostsResponseType> => {
  return useQuery({
    queryKey: ['myPosts', params],
    queryFn: () => getMyPosts(params),
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: false,
  });
};
