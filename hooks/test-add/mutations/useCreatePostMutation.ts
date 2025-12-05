'use client';

import { useMutation } from '@tanstack/react-query';
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
  return useMutation<UserPostModel, Error, CreatePostVariables>({
    mutationFn: async ({ form, files }) => {
      const payload = buildCreatePostPayload(form);
      return createUserPost(payload, files?.thumbnail ?? null, files?.images ?? null);
    },
  });
}
