import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GetMyBookmarksRequestType, GetMyBookmarksResponseType } from '../dto/myBookmarks';
import { instance } from '@/apis/instance';

const BASE_PATH = '/v1/users/posts/likes';

const getMyBookmarks = async (
  params: GetMyBookmarksRequestType,
): Promise<GetMyBookmarksResponseType> => {
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

export const useMyBookmarksQuery = (
  params: GetMyBookmarksRequestType = { page: 0, size: 9 },
): UseQueryResult<GetMyBookmarksResponseType> => {
  return useQuery({
    queryKey: ['myBookmarks', params],
    queryFn: () => getMyBookmarks(params),
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
