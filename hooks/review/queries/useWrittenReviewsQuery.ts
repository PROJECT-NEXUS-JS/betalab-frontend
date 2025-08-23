import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  GetWrittenReviewsRequestType,
  GetWrittenReviewsResponseType,
  getWrittenReviewsResponseSchema,
} from '../dto/writtenReviews';
import { instance } from '@/apis/instance';

const BASE_PATH = '/v1/users/reviews/written';

const getWrittenReviews = async (
  params: GetWrittenReviewsRequestType,
): Promise<GetWrittenReviewsResponseType> => {
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
  return getWrittenReviewsResponseSchema.parse(response.data);
};

export const useWrittenReviewsQuery = (
  params: GetWrittenReviewsRequestType = { page: 0, size: 9 },
): UseQueryResult<GetWrittenReviewsResponseType> => {
  return useQuery({
    queryKey: ['writtenReviews', params],
    queryFn: () => getWrittenReviews(params),
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
