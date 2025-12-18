import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { UpdateBasicInfoResponseType, UpdateBasicInfoResponseSchema } from '../dto/basicInfo';

const getBasicInfo = async (): Promise<UpdateBasicInfoResponseType> => {
  const response = await instance.get('/auth/account/basic-info');
  return UpdateBasicInfoResponseSchema.parse(response.data);
};

export const useBasicInfoQuery = () => {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['basic-info'],
    queryFn: getBasicInfo,
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
