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
      queryClient.invalidateQueries({
        queryKey: ['reward', 'participants', postId],
      });
    },
    onError: (error: unknown) => {},
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
    onError: (error: unknown) => {},
  });
};

const completeApplication = async (participationId: number): Promise<void> => {
  const response = await instance.patch(`/v1/users/participations/${participationId}/complete`);
  return response.data;
};

export const useCompleteApplicationMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reward', 'participants', postId],
      });
    },
    onError: (error: unknown) => {},
  });
};
