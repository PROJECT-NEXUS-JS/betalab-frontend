import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { DeleteReviewResponseType } from '../dto/writtenReviews';

const BASE_PATH = '/v1/users/reviews';

const deleteReview = async (reviewId: number): Promise<DeleteReviewResponseType> => {
  const response = await instance.delete(`${BASE_PATH}/${reviewId}`);
  return response.data;
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      // 작성한 리뷰 목록 초기화
      queryClient.invalidateQueries({ queryKey: ['writtenReviews'] });
    },
    onError: error => {
      console.error('리뷰 삭제 실패:', error);
    },
  });
};
