import { useMutation } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { WithdrawRequestType, WithdrawResponseType } from '../dto/withdraw';

const withdraw = async (data: WithdrawRequestType): Promise<WithdrawResponseType> => {
  const params = new URLSearchParams();
  params.append('confirmation', data.confirmation);

  if (data.kakaoAccessToken) {
    params.append('kakaoAccessToken', data.kakaoAccessToken);
  }

  const response = await instance.delete(`/auth/withdraw?${params.toString()}`);
  return response.data;
};

export const useWithdrawMutation = () => {
  return useMutation({
    mutationFn: withdraw,
  });
};
