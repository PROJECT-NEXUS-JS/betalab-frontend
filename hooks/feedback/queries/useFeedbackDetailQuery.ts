import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';
import { FeedbackDetailResponseSchema } from '../dto/feedback';
export async function getFeedbackDetail(postId: number) {
  const response = await instance.get(`/v1/feedbacks/${postId}`);
  return FeedbackDetailResponseSchema.parse(response.data);
}

/**
 * 특정 프로젝트의 내 feedback 상태 가져오는 훅
 */
export default function useFeedbackDetailQuery(postId: number) {
  return useQuery({
    queryKey: queryKeys.feedback.detail(postId),
    queryFn: () => getFeedbackDetail(postId),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    select: data => data.data,
  });
}
