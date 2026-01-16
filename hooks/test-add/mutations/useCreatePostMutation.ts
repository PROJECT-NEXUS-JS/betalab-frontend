'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserPost } from '@/lib/test-add/api';
import type { TestAddState } from '@/types/test-add';
import type { UserPostModel } from '@/hooks/test-add/api/dto/post';
import { buildCreatePostPayload } from '@/lib/test-add/buildCreatePostPayload';

type CreateFiles = { thumbnail?: File | null; images?: File[] | null };

interface CreatePostVariables {
  form: TestAddState;
  files?: CreateFiles;
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation<UserPostModel, Error, CreatePostVariables>({
    mutationFn: async ({ form, files }) => {
      const payload = buildCreatePostPayload(form);
      return createUserPost(payload, files?.thumbnail ?? null, files?.images ?? null);
    },

    onSuccess: () => {
      // 'myPosts'로 시작하는 모든 쿼리 키를 무효화하여 목록을 새로고침
      queryClient.invalidateQueries({
        queryKey: ['myPosts'],
      });
    },
  });
}
