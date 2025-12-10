import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import Logger from '@/lib/logger';
import { getStatistics, getPostDetail, getProfile } from './reward-api';
import RewardListClient from './RewardListClient';
import RewardStateListClient from './RewardStateListClient';

export default async function AdminRewardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);

  try {
    const postData = await getPostDetail(postId);
    const postCreatorId = postData.data.createdBy;

    const profileData = await getProfile();
    const currentUserId = profileData.data.userId || profileData.data.id;

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1 className="text-subtitle-01 font-semibold text-Black mb-10">리워드 지급관리</h1>
        <RewardListClient postId={postId} />
        <div className="mt-10">
          <RewardStateListClient postId={postId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
