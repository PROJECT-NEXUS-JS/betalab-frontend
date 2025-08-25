'use client';
import { instance } from '@/apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { ProfileUpdatePayload } from '../dto';

const BASE_PATH = `/v1/users/profile/complete`;

function toFormData(payload: ProfileUpdatePayload): FormData {
  const fd = new FormData();
  fd.append(
    'profile',
    JSON.stringify({
      nickname: payload.nickname,
      introduction: payload.introduction,
    }),
  );
  if (payload.profileImage) {
    fd.append('image', payload.profileImage);
  }
  return fd;
}

const postApply = (data: ProfileUpdatePayload) => {
  const formData = toFormData(data);
  return instance.patch(BASE_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useProfileMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileUpdatePayload) => postApply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.posts.detail(postId)] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.dashboard.profile] });
      alert('프로필이 성공적으로 업데이트되었습니다.');
    },
    onError: error => {
      const message =
        // @ts-ignore
        error.response?.data?.message || error.message || '프로필 업데이트에 실패했습니다.';
      alert(message);
    },
  });
};
