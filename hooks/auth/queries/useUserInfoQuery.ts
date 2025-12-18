import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { MeResponseSchema } from '../dto/auth';

export const useUserInfoQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await instance.get('/auth/me');

      const parsed = MeResponseSchema.safeParse(res.data);
      if (!parsed.success) {
        throw new Error(`유저 정보 파싱 실패: ${parsed.error.toString()}`);
      }

      return parsed.data.data;
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failureCount: number, error: any) => {
      if (error?.response?.status === 401 || error?.response?.data?.code === 'AUTH401') {
        return false;
      }
      return failureCount < 3;
    },
  });
};
