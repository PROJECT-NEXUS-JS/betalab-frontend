import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { PostLikeResponseType } from '../dto/postLike';
import { instance } from '@/apis/instance';

const BASE_PATH = '/v1/users/posts';

const togglePostLike = async (postId: number): Promise<PostLikeResponseType> => {
  const response = await instance.post(`${BASE_PATH}/${postId}/like`);
  return response.data;
};

export const usePostLikeMutation = (): UseMutationResult<
  PostLikeResponseType,
  Error,
  number,
  unknown
> => {
  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: data => {
      console.log('찜하기/찜하기 취소 성공:', data);
    },
    onError: error => {
      console.error('찜하기/찜하기 취소 실패:', error);
    },
  });
};
