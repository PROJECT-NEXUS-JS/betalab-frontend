import { instance } from '@/apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { FeedbackRequestType } from '../../feedback/dto/feedback';

const BASE_PATH = `/v1/feedbacks`;

const postFeedback = (data: FeedbackRequestType) => {
  return instance.post(BASE_PATH, data);
};

/** 피드백 제출 훅 */
export default function useSubmitFeedbackMutation(feedbackId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeedbackRequestType) => postFeedback(data),
    onSuccess: () => {
      // 피드백 정보 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.feedback.my(feedbackId) });
      // 내 전체 신청 내역 목록 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.myApplications.all });
    },
  });
}
