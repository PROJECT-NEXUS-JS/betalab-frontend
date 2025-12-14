import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';
import { MyFeedbackResponseSchema, MyFeedbackResponseType } from '../dto/feedback';

const BASE_PATH = '/v1/feedbacks/my-status';
export async function getMyFeedback(postId: number) {
  const response = await instance.get(BASE_PATH, {
    params: {
      postId: postId,
    },
  });

  const parsed = MyFeedbackResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    throw parsed.error;
  }

  return parsed.data;
}

/**
 * 특정 프로젝트의 내 feedback 상태 가져오는 훅
 */
export default function useMyFeedbackQuery(postId: number) {
  return useQuery({
    queryKey: queryKeys.feedback.my(postId),
    queryFn: () => getMyFeedback(postId),
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    select: (data: MyFeedbackResponseType) => data.data,
    enabled: !!postId,
  });
}
