import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import { ProjectDetailResponseSchema } from '@/hooks/posts/queries/usePostDetailQuery';

import StatsCardClientWrapper from './StatsCardClientWrapper';
import ChartToggleWrapper from './ChartToggleWrapper';
import TestTitleClient from './TestTitleClient';
import RecruitmentStatusToggle from './RecruitmentStatusToggle';
import { getStats, getBarChart, getPieChart, getLineChart } from './dashboard-api';
import QuickActionSheet from '@/components/admin/QuickActionSheet';
import Logger from '@/lib/logger';

export default async function AdminDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      redirect('/');
    }

    let postResponse;
    let postData;
    let postCreatorId;
    let profileResponse;
    let currentUserId;

    try {
      postResponse = await serverInstance(accessToken, refreshToken).get(
        `/v1/users/posts/${postId}`,
      );
      postData = ProjectDetailResponseSchema.parse(postResponse.data);
      postCreatorId = postData.data.createdBy;
    } catch (err: any) {
      Logger.error('Post 조회 실패:', err?.message, err?.response?.status, err?.response?.data);
      throw err;
    }

    try {
      profileResponse = await serverInstance(accessToken, refreshToken).get('/v1/users/profile');
      currentUserId = profileResponse.data.data.userId || profileResponse.data.data.id;
    } catch (err: any) {
      Logger.error('Profile 조회 실패:', err?.message, err?.response?.status, err?.response?.data);
      throw err;
    }

    // 작성자만 접근 가능하게
    if (postCreatorId !== currentUserId) {
      Logger.error('권한 없음:', postId, postCreatorId, currentUserId);
      redirect('/');
    }
  } catch (err: any) {
    Logger.error(
      '권한 확인 실패:',
      err?.message || 'Unknown error',
      err?.response?.status,
      err?.response?.data,
      postId,
    );
    redirect('/');
  }

  // 권한 검증 통과 후에만 QueryClient 사용
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.stats(postId),
      queryFn: () => getStats(postId),
    });
  } catch (err) {
    Logger.error('Stats prefetch 실패:', err);
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.barChart(postId),
      queryFn: () => getBarChart(postId),
    });
  } catch (err) {
    Logger.error('BarChart prefetch 실패:', err);
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.pieChart(postId),
      queryFn: () => getPieChart(postId),
    });
  } catch (err) {
    Logger.error('PieChart prefetch 실패:', err);
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.lineChart(postId),
      queryFn: () => getLineChart(postId),
    });
  } catch (err) {
    Logger.error('LineChart prefetch 실패:', err);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col w-full max-w-[854px] mb-40">
      <section className="flex justify-between items-center w-full">
        <TestTitleClient id={postId} />
        <RecruitmentStatusToggle postId={postId} />
      </section>
      <section className="flex flex-col items-start gap-3 mt-5">
        <h3 className="text-base font-bold text-Dark-Gray">베타서비스 분석</h3>
        <HydrationBoundary state={dehydratedState}>
          <StatsCardClientWrapper postId={postId} />
        </HydrationBoundary>
      </section>
      <section className="flex flex-col items-start gap-3 mt-10">
        <ChartToggleWrapper postId={postId} dehydratedState={dehydratedState} />
      </section>
      <HydrationBoundary state={dehydratedState}>
        <QuickActionSheet postId={postId} />
      </HydrationBoundary>
    </div>
  );
}
