import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';

interface CreateReviewRequest {
  postId: number;
  rating: number;
  content: string;
}

interface CreateReviewResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    id: number;
    postId: number;
    rating: number;
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

const createReview = async (data: CreateReviewRequest): Promise<CreateReviewResponse> => {
  const response = await instance.post('/v1/users/reviews', data);
  return response.data;
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      // 리뷰 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['writtenReviews'] });
      queryClient.invalidateQueries({ queryKey: ['myWritableReviews'] });
      queryClient.invalidateQueries({ queryKey: ['postReviews'] });
    },
  });
};
