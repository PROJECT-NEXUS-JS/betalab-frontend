import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

interface DeleteReviewReplyResponse {
  success: boolean;
  code: string;
  message: string;
  data: Record<string, never>;
}

const deleteReviewReply = async (replyId: number): Promise<DeleteReviewReplyResponse> => {
  const response = await instance.delete(`/v1/users/reviews/replies/${replyId}`);
  return response.data;
};

export const useDeleteReviewReplyMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyId: number) => deleteReviewReply(replyId),
    onSuccess: () => {
      // 리뷰 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.post(postId) });
      // 모든 답변 조회 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reviewReplies'] });
    },
    onError: (error: unknown) => {},
  });
};

