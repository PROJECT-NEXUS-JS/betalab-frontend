import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

interface CreateReviewReplyRequest {
  content: string;
}

interface CreateReviewReplyResponse {
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

const createReviewReply = async (
  reviewId: number,
  data: CreateReviewReplyRequest,
): Promise<CreateReviewReplyResponse> => {
  const response = await instance.post(`/v1/users/reviews/${reviewId}/replies`, data);
  return response.data;
};

export const useCreateReviewReplyMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: CreateReviewReplyRequest }) =>
      createReviewReply(reviewId, data),
    onSuccess: () => {
      // 리뷰 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.post(postId) });
    },
    onError: (error: unknown) => {},
  });
};

