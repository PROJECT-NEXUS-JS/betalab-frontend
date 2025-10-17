import { useMutation } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { WithdrawRequestType, WithdrawResponseType } from '../dto/withdraw';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

const withdraw = async (data: WithdrawRequestType): Promise<WithdrawResponseType> => {
  const params = new URLSearchParams();
  params.append('confirmation', data.confirmation);

  if (data.kakaoAccessToken) {
    params.append('kakaoAccessToken', data.kakaoAccessToken);
  }

  const response = await instance.delete(`/auth/withdraw?${params.toString()}`);
  return response.data;
};

export const useWithdrawMutation = (closeModal:  Dispatch<SetStateAction<boolean>>) => {
  const router = useRouter();
  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      closeModal(false);
      router.replace('/login');
    },
  });
};
