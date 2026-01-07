import { instance } from '@/apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { FeedbackRequestType } from '../../feedback/dto/feedback';

const BASE_PATH = `/v1/feedbacks/draft`;

const postFeedback = (data: FeedbackRequestType) => {
  return instance.post(BASE_PATH, data);
};

/** 피드백 임시저장 훅 */
export default function useSaveFeedbackDraftMutation(feedbackId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeedbackRequestType) => postFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feedback.my(feedbackId) });
    },
  });
}
