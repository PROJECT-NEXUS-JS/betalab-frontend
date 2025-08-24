import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GetPostLikeStatusResponseType } from '../dto/postLikeStatus';
import { instance } from '@/apis/instance';

const BASE_PATH = '/v1/users/posts';

const getPostLikeStatus = async (postId: number): Promise<GetPostLikeStatusResponseType> => {
  const response = await instance.get(`${BASE_PATH}/${postId}/like/status`);
  return response.data;
};

export const usePostLikeStatusQuery = (
  postId: number,
): UseQueryResult<GetPostLikeStatusResponseType> => {
  return useQuery({
    queryKey: ['postLikeStatus', postId],
    queryFn: () => getPostLikeStatus(postId),
    enabled: !!postId, // postId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
