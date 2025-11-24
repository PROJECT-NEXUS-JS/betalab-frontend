import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

import StatsCardClientWrapper from './StatsCardClientWrapper';
import BarChartClientWrapper from './BarChartClientWrapper';
import TestTitleClient from './TestTitleClient';
import RecruitmentStatusToggle from './RecruitmentStatusToggle';

import Logger from '@/lib/logger';
import { StatsResponseSchema } from '@/hooks/dashboard/quries/useStatsQuery';
import { BarChartResponseSchema } from '@/hooks/dashboard/quries/useBarChartQuery';
import QuickActionSheet from '@/components/admin/QuickActionSheet';

export default async function AdminDashboardPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.stats(id),
      queryFn: () => getStats(id),
    });
  } catch (err) {
    Logger.error('Stats prefetch 실패:', err);
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.barChart(id),
      queryFn: () => getBarChart(id),
    });
  } catch (err) {
    Logger.error('BarChart prefetch 실패:', err);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col w-full max-w-[854px] mb-40">
      <section className="flex justify-between items-center w-full">
        <TestTitleClient id={id} />
        <RecruitmentStatusToggle postId={id} />
      </section>
      <section className="flex flex-col items-start gap-3 mt-5">
        <h3 className="text-base font-bold text-Dark-Gray">베타서비스 분석</h3>
        <HydrationBoundary state={dehydratedState}>
          <StatsCardClientWrapper postId={id} />
        </HydrationBoundary>
      </section>
      <section className="flex flex-col items-start gap-3 mt-10">
        <h3 className="text-base font-bold text-Dark-Gray">데이터 분석 그래프</h3>
        <div className="w-full">
          <HydrationBoundary state={dehydratedState}>
            <BarChartClientWrapper postId={id} />
          </HydrationBoundary>
        </div>
      </section>
      <HydrationBoundary state={dehydratedState}>
        <QuickActionSheet postId={id} />
      </HydrationBoundary>
    </div>
  );
}

async function getStats(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    Logger.error('토큰이 없습니다:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    });
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/dashboard/${postId}/stats`,
    );
    const parsedData = StatsResponseSchema.parse(response.data);
    Logger.log('ProjectData 파싱 성공:', parsedData);
    return response.data;
  } catch (err: any) {
    Logger.error('ProjectData 파싱 실패:', err);
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}

async function getBarChart(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    Logger.error('토큰이 없습니다:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    });
    throw new Error('Authentication required');
  }

  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/users/dashboard/${postId}/analytics/bar-chart`,
    );
    const parsedData = BarChartResponseSchema.parse(response.data);
    Logger.log('BarChartData 파싱 성공:', parsedData);
    return response.data;
  } catch (err: any) {
    Logger.error('BarChartData 파싱 실패:', err);
    if (err.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw err;
  }
}
