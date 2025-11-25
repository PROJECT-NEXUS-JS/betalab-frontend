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
  const queryKey = queryKeys.feedback.detail(feedbackId);

  return useMutation({
    mutationFn: (data: FeedbackRequestType) => postFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
