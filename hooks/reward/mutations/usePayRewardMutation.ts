import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';

interface PayRewardResponse {
  success: boolean;
  code: string;
  message: string;
  data: Record<string, never>;
}

const payReward = async (participationId: number): Promise<PayRewardResponse> => {
  const response = await instance.post(`/v1/users/rewards/${participationId}/pay`);
  return response.data;
};

export const usePayRewardMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payReward,
    onSuccess: () => {
      // 참여자 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['participants', postId] });
      // 리워드 통계 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reward', 'statistics', postId] });
    },
    onError: (error: unknown) => {
      console.error('리워드 지급 실패:', error);
    },
  });
};
