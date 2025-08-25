'use client';
import { instance } from '@/apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetTokenMutation } from './useSetTokenMutation';
import { UserProfileModel, UserProfileSchema } from '../dto/user';

export async function updateUserProfile(formData: UserProfileModel) {
  const parsed = UserProfileSchema.safeParse(formData);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }
  const { data } = await instance.post('/auth/me/change-role', formData);
  return data;
}

export function useProfileEditMutation() {
  const queryClient = useQueryClient();
  const setTokenMutation = useSetTokenMutation();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async data => {
      if (data.accessToken && data.refreshToken) {
        await setTokenMutation.mutateAsync({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      }
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });

      console.log('프로필 업데이트 성공:', data);
    },
    onError: error => {
      console.error('프로필 업데이트 실패:', error);
    },
  });
}
