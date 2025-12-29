import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';
import { ScreenerQuestionsResponseSchema } from '../dto/screenerQuestions';

async function getScreenerQuestions(postId: number) {
  const response = await instance.get(`/v1/users/posts/${postId}/questions`);
  return ScreenerQuestionsResponseSchema.parse(response.data);
}

export default function useGetScreenerQuestions(postId: number) {
  return useQuery({
    queryKey: queryKeys.posts.screenerQuestions(postId),
    queryFn: () => getScreenerQuestions(postId),
    staleTime: 1000 * 60 * 5, // 5분
  });
}
