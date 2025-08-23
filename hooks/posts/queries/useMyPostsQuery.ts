import { useQuery } from '@tanstack/react-query';
import { GetMyPostsRequestType, GetMyPostsResponseType } from '../dto/myPosts';
import { serverInstance } from '@/apis/server-instance';

const fetchMyPosts = async (params: GetMyPostsRequestType): Promise<GetMyPostsResponseType> => {
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

  const response = await serverInstance().get(`/v1/users/posts/my?${searchParams.toString()}`);
  return response.data;
};

export const useMyPostsQuery = (params: GetMyPostsRequestType = { page: 0, size: 9 }) => {
  return useQuery({
    queryKey: ['myPosts', params],
    queryFn: () => fetchMyPosts(params),
    staleTime: 5 * 60 * 1000,
  });
};
