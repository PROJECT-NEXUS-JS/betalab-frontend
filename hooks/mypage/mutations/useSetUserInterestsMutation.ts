import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import {
  SetUserInterestsRequestType,
  SetUserInterestsResponseType,
} from '../dto/interests';

const setUserInterests = async (
  data: SetUserInterestsRequestType,
): Promise<SetUserInterestsResponseType> => {
  try {
    const response = await instance.post('/v1/users/interests', data, {
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

export const useSetUserInterestsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setUserInterests,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-interests'] });
    },
  });
};

