import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { UpdateBasicInfoRequestType, UpdateBasicInfoResponseType } from '../dto/basicInfo';

const updateBasicInfo = async (
  data: UpdateBasicInfoRequestType,
): Promise<UpdateBasicInfoResponseType> => {
  const formData = new FormData();

  // basicInfo를 JSON 문자열로 변환하여 추가
  formData.append('basicInfo', JSON.stringify(data.basicInfo));

  // profileImage가 있으면 추가
  if (data.profileImage) {
    formData.append('profileImage', data.profileImage);
  }

  try {
    const response = await instance.put('/auth/account/basic-info', formData, {
      timeout: 60000,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 500) {
      throw new Error('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    throw error;
  }
};

export const useUpdateBasicInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBasicInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPageProfile'] });
    },
  });
};
