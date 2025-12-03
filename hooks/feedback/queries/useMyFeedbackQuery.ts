import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';
import { MyFeedbackResponseSchema } from '../dto/feedback';

const BASE_PATH = '/v1/feedbacks/my-status';
export async function getMyFeedback(postId: number) {
  const response = await instance.get(BASE_PATH, {
    params: {
      postId: postId,
    },
  });
  return MyFeedbackResponseSchema.parse(response.data);
}

/**
 * 특정 프로젝트의 내 feedback 상태 가져오는 훅
 */
export default function useMyFeedbackQuery(postId: number) {
  return useQuery({
    queryKey: queryKeys.feedback.my(postId),
    queryFn: () => getMyFeedback(postId),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    select: data => data.data,
    refetchOnWindowFocus: false, // 윈도우 포커스 시(Alt+Tab) 재요청 방지
    refetchOnMount: false, // 컴포넌트가 다시 마운트되더라도 즉시 재요청 방지 (캐시 활용)
  });
}
