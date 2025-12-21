import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

interface UpdateReviewReplyRequest {
  content: string;
}

interface UpdateReviewReplyResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    id: number;
    reviewId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: {
      id: number;
      nickname: string;
      profileUrl: string;
    };
  };
}

const updateReviewReply = async (
  replyId: number,
  data: UpdateReviewReplyRequest,
): Promise<UpdateReviewReplyResponse> => {
  const response = await instance.put(`/v1/users/reviews/replies/${replyId}`, data);
  return response.data;
};

export const useUpdateReviewReplyMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ replyId, data }: { replyId: number; data: UpdateReviewReplyRequest }) =>
      updateReviewReply(replyId, data),
    onSuccess: () => {
      // 리뷰 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.post(postId) });
    },
    onError: (error: unknown) => {},
  });
};

