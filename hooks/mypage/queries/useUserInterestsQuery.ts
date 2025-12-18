import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { GetUserInterestsResponseType, GetUserInterestsResponseSchema } from '../dto/interests';

const getUserInterests = async (): Promise<GetUserInterestsResponseType> => {
  const response = await instance.get('/v1/users/interests');
  return GetUserInterestsResponseSchema.parse(response.data);
};

export const useUserInterestsQuery = () => {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['user-interests'],
    queryFn: getUserInterests,
    enabled: hasToken,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: (failureCount: number, error: any) => {
      if (error?.response?.status === 401 || error?.response?.data?.code === 'AUTH401') {
        return false;
      }
      return failureCount < 3;
    },
  });
};
