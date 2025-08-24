import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GetPostLikeCountResponseType } from '../dto/postLikeCount';
import { instance } from '@/apis/instance';

const BASE_PATH = '/v1/users/posts';

const getPostLikeCount = async (postId: number): Promise<GetPostLikeCountResponseType> => {
  const response = await instance.get(`${BASE_PATH}/${postId}/like/count`);
  return response.data;
};

export const usePostLikeCountQuery = (
  postId: number,
): UseQueryResult<GetPostLikeCountResponseType> => {
  return useQuery({
    queryKey: ['postLikeCount', postId],
    queryFn: () => getPostLikeCount(postId),
    enabled: !!postId, // postId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
