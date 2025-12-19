import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { z } from 'zod';

type QueryFn<TResponse> = () => Promise<TResponse>;

export function usePostsQueryDto<TData, TResponse, TError = unknown>(
  key: QueryKey,
  queryFn: QueryFn<TResponse>,
  responseSchema: z.ZodType<any>,
  options?: Omit<
    UseQueryOptions<TResponse, TError, TData, QueryKey>,
    'queryKey' | 'queryFn' | 'select'
  > & {
    select?: (data: TResponse) => TData;
  },
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const data = await queryFn();
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
