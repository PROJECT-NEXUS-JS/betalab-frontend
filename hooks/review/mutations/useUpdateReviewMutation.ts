import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { UpdateReviewRequestType, UpdateReviewResponseType } from '../dto/writtenReviews';

const BASE_PATH = '/v1/users/reviews';

const updateReview = async (
  reviewId: number,
  data: UpdateReviewRequestType,
): Promise<UpdateReviewResponseType> => {
  const response = await instance.put(`${BASE_PATH}/${reviewId}`, data);
  return response.data;
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: UpdateReviewRequestType }) =>
      updateReview(reviewId, data),
    onSuccess: () => {
      // 작성한 리뷰 목록 초기화
      queryClient.invalidateQueries({ queryKey: ['writtenReviews'] });
    },
    onError: error => {},
  });
};
