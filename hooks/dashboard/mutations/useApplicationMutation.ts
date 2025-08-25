import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

const BASE_PATH = (participationId: number, type: 'approve' | 'reject') =>
  `/v1/users/posts/applications/${participationId}/${type}`;

const approveApplication = async (participationId: number): Promise<void> => {
  const response = await instance.patch(BASE_PATH(participationId, 'approve'));
  return response.data;
};

export const useApproveApplicationMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.application(postId, 'PENDING'),
      });
    },
    onError: error => {
      console.error('신청서 승인 실패:', error);
    },
  });
};

const rejectApplication = async (participationId: number): Promise<void> => {
  console.log(participationId, BASE_PATH(participationId, 'reject'));
  const response = await instance.patch(BASE_PATH(participationId, 'reject'));
  return response.data;
};

export const useRejectApplicationMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.application(postId, 'PENDING'),
      });
    },
    onError: error => {
      console.error('신청서 거절 실패:', error);
    },
  });
};
