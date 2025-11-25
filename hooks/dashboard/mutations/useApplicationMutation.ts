import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

const approveApplication = async (participationId: number): Promise<void> => {
  const response = await instance.patch(`/v1/users/participations/${participationId}/approve`);
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
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.dashboard.all, 'waitingParticipants', postId],
      });
    },
    onError: error => {
      console.error('신청서 승인 실패:', error);
    },
  });
};

const rejectApplication = async (participationId: number): Promise<void> => {
  const response = await instance.patch(`/v1/users/participations/${participationId}/reject`);
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
      // waitingParticipants 쿼리 전체 invalidate (params 포함)
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.dashboard.all, 'waitingParticipants', postId],
      });
    },
    onError: error => {
      console.error('신청서 거절 실패:', error);
    },
  });
};
