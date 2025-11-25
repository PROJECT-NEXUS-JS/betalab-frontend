import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';
import { RecentReviewsResponseSchema, RecentReviewsResponseModel } from '../dto/recentReviews';
import { instance } from '@/apis/instance';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

export const RecentReviewsApiResponseSchema = BaseModelSchema(RecentReviewsResponseSchema);
export type RecentReviewsApiResponseModel = z.infer<typeof RecentReviewsApiResponseSchema>;

const BASE_PATH = (postId: number) => `/v1/users/dashboard/${postId}/quick-actions/reviews`;

interface RecentReviewsParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export const getRecentReviews = async (
  postId: number,
  params: RecentReviewsParams = {},
): Promise<RecentReviewsApiResponseModel> => {
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
  return RecentReviewsApiResponseSchema.parse(response.data);
};

export const useRecentReviewsQuery = (
  postId: number,
  params: RecentReviewsParams = { page: 0, size: 2 },
): UseQueryResult<RecentReviewsApiResponseModel> => {
  return useQuery({
    queryKey: queryKeys.dashboard.recentReviews(postId, params),
    queryFn: () => getRecentReviews(postId, params),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

