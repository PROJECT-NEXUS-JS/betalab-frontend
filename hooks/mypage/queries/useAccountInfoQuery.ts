import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { GetKakaoAccountResponseType, getKakaoAccountResponseSchema } from '../dto/kakaoAccount';

const getAccountInfo = async (): Promise<GetKakaoAccountResponseType> => {
  const response = await instance.get('/auth/account/kakao');
  return getKakaoAccountResponseSchema.parse(response.data);
};

export const useAccountInfoQuery = () => {
  return useQuery({
    queryKey: ['kakao-account-info'],
    queryFn: getAccountInfo,
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
