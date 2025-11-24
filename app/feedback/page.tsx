import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { serverInstance } from '@/apis/server-instance';
import { FeedbackDetailResponseSchema } from '@/hooks/feedback/dto/feedback';
import Logger from '@/lib/logger';

export default async function FeebackPage({
  params,
}: {
  params: Promise<{
    feedbackId: string;
  }>;
}) {
  const { feedbackId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.feedback.detail(Number(feedbackId)),
    queryFn: () => fetchFeedbackData(Number(feedbackId), accessToken, refreshToken),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>피드백 페이지</div>
    </HydrationBoundary>
  );
}

async function fetchFeedbackData(feedbackId: number, accessToken?: string, refreshToken?: string) {
  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/feedbacks/${feedbackId}`,
    );
    const parsedData = FeedbackDetailResponseSchema.parse(response.data);

    return parsedData;
  } catch (err) {
    Logger.error('ProjectData 파싱 실패:', err);
    throw err;
  }
}
