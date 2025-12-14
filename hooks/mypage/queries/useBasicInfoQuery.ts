import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { UpdateBasicInfoResponseType, UpdateBasicInfoResponseSchema } from '../dto/basicInfo';

const getBasicInfo = async (): Promise<UpdateBasicInfoResponseType> => {
  const response = await instance.get('/auth/account/basic-info');
  return UpdateBasicInfoResponseSchema.parse(response.data);
};

export const useBasicInfoQuery = () => {
  return useQuery({
    queryKey: ['basic-info'],
    queryFn: getBasicInfo,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
