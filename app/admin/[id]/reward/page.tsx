import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import Logger from '@/lib/logger';
import { ProjectDetailResponseSchema } from '@/hooks/posts/queries/usePostDetailQuery';
import { getStatistics, getParticipants } from './reward-api';
import RewardListClient from './RewardListClient';
import ParticipantsTableClient from './ParticipantsTableClient';

export default async function AdminRewardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      redirect('/');
    }

    const postResponse = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/posts/${postId}`,
    );
    const postData = ProjectDetailResponseSchema.parse(postResponse.data);
    const postCreatorId = postData.data.createdBy;

    const profileResponse = await serverInstance(accessToken, refreshToken).get(
      '/v1/users/profile',
    );
    const currentUserId = profileResponse.data.data.userId || profileResponse.data.data.id;

    if (postCreatorId !== currentUserId) {
      Logger.error('권한 없음:', {
        postId,
        postCreatorId,
        currentUserId,
      });
      redirect('/');
    }
  } catch (err: any) {
    Logger.error('권한 확인 실패:', err);
    redirect('/');
  }
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['reward', 'statistics', postId],
      queryFn: () => getStatistics(postId),
    });
  } catch (err) {
    Logger.error('Statistics prefetch 실패:', err);
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: ['reward', 'participants', postId, { page: 0, size: 20, sortDirection: 'DESC' }],
      queryFn: () => getParticipants(postId, { page: 0, size: 20, sortDirection: 'DESC' }),
    });
  } catch (err) {
    Logger.error('Participants prefetch 실패:', err);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1 className="text-subtitle-01 font-semibold text-Black mb-10">리워드 지급관리</h1>
        <RewardListClient postId={postId} />
        <ParticipantsTableClient postId={postId} />
      </div>
    </HydrationBoundary>
  );
}
