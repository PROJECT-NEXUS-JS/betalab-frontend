import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';
import {
  ChangeRecruitmentStatusResponseType,
  ChangeRecruitmentStatusResponseSchema,
} from '../dto/recruitmentStatus';

const BASE_PATH = (postId: number) => `/v1/users/dashboard/${postId}/recruitment-status`;

async function changeRecruitmentStatus(
  postId: number,
): Promise<ChangeRecruitmentStatusResponseType> {
  const response = await instance.post(BASE_PATH(postId));
  return ChangeRecruitmentStatusResponseSchema.parse(response.data);
}

export function useChangeRecruitmentStatusMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => changeRecruitmentStatus(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats(postId) });
    },
  });
}
