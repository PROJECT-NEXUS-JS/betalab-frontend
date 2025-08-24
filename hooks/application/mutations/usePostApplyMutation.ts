'use client';
import { instance } from '@/apis/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/react-query';
import { ApplicationFormData } from '../dto/apply';

import { useRouter } from 'next/navigation';

const BASE_PATH = (postId: number) => `/v1/users/posts/${postId}/apply`;

const postApply = (postId: number, data: ApplicationFormData) => {
  return instance.post(BASE_PATH(postId), data);
};

export const usePostApplyMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ApplicationFormData) => postApply(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] as QueryKey });
      router.push('/mypage');
      console.log('신청 성공');
    },
    onError: error => {
      alert(`신청 실패: ${error.message}`);
    },
  });
};
