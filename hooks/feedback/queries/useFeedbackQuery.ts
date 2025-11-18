import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';
import { FeedbackDetailResponseSchema } from '../dto/feedback';

const BASE_PATH = '/v1/users/posts';

export async function getFeedbackDetail(postId: number) {
  const response = await instance.get(`${BASE_PATH}/${postId}`);
  return FeedbackDetailResponseSchema.parse(response.data);
}

/**
 * feedback 디테일 가져오는 훅
 */
export default function useFeedbackQuery(FeedbackId: number) {
  return useQuery({
    queryKey: queryKeys.feedback.detail(FeedbackId),
    queryFn: () => getFeedbackDetail(FeedbackId),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
  });
}
