import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { MeResponseSchema } from '@/types/models/auth';

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await instance.get('/auth/me');

      const parsed = MeResponseSchema.safeParse(res.data);
      if (!parsed.success) {
        throw new Error('유저 정보 파싱 실패');
      }

      return parsed.data.data;
    },
  });
};
