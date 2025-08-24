import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  GetMyWritableReviewsRequestType,
  GetMyWritableReviewsResponseType,
} from '../dto/myWritableReviews';
import { instance } from '@/apis/instance';

const BASE_PATH = '/v1/users/reviews/writable';

const getMyWritableReviews = async (
  params: GetMyWritableReviewsRequestType,
): Promise<GetMyWritableReviewsResponseType> => {
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

export const useMyWritableReviewsQuery = (
  params: GetMyWritableReviewsRequestType = { page: 0, size: 9 },
): UseQueryResult<GetMyWritableReviewsResponseType> => {
  return useQuery({
    queryKey: ['myWritableReviews', params],
    queryFn: () => getMyWritableReviews(params),
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
