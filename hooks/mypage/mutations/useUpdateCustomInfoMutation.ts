import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import {
  UpdateCustomInfoRequestType,
  UpdateCustomInfoResponseType,
} from '../dto/customInfo';

const updateCustomInfo = async (
  data: UpdateCustomInfoRequestType,
): Promise<UpdateCustomInfoResponseType> => {
  try {
    const response = await instance.put('/auth/account/custom-info', data, {
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 500) {
      throw new Error('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    throw error;
  }
};

export const useUpdateCustomInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basic-info'] });
      queryClient.invalidateQueries({ queryKey: ['get-my-page-profile'] });
    },
  });
};

