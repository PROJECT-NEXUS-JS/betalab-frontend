import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { z } from 'zod';

type MutationFn<TVariables, TResponse> = (variables: TVariables) => Promise<TResponse>;

export function usePostsMutationDto<TVariables, TData, TResponse, TError = unknown>(
  mutationFn: MutationFn<TVariables, TResponse>,
  responseSchema: z.ZodType<any>,
  options?: Omit<
    UseMutationOptions<TResponse, TError, TVariables, unknown>,
    'mutationFn' | 'onSuccess'
  > & {
    onSuccess?: (data: TResponse, variables: TVariables, context: unknown) => void;
    select?: (data: TResponse) => TData;
  },
) {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const data = await mutationFn(variables);
      const parsed = responseSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `Response schema validation failed: ${JSON.stringify(parsed.error.issues)}`,
        );
      }
      return parsed.data as TResponse;
    },
    ...options,
  });
}
