import { instance } from '@/apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/react-query';
import { FeedbackRequestType } from '../dto/feedback';

const BASE_PATH = `/v1/feedbacks/draft`;

const postFeedback = (data: FeedbackRequestType) => {
  return instance.post(BASE_PATH, data);
};

/** 피드백 제출 훅 */
export default function useSubmitFeedbackMutation(feedbackId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeedbackRequestType) => postFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback', feedbackId] as QueryKey });
    },
  });
}
