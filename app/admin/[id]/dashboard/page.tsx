import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

import Toggle from '@/components/common/atoms/Toggle';
import StatsCardClientWrapper from './StatsCardClientWrapper';
import BarChartClientWrapper from './BarChartClientWrapper';
import TestTitleClient from './TestTitleClient';

import Logger from '@/lib/logger';
import { StatsResponseSchema } from '@/hooks/dashboard/quries/useStatsQuery';
import { BarChartResponseSchema } from '@/hooks/dashboard/quries/useBarChartQuery';
import { ApplicationResponseSchema } from '@/hooks/dashboard/quries/useApplicationQuery';

import QuickActionSheet from '@/components/admin/QuickActionSheet';

export default async function AdminDashboardPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.dashboard.stats(id),
    queryFn: () => getStats(id),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.dashboard.barChart(id),
    queryFn: () => getBarChart(id),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.dashboard.application(id, 'PENDING'),
    queryFn: () => getApplication(id, 'PENDING'),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col w-full max-w-[854px] mb-40">
      <section className="flex justify-between items-center w-full">
        <TestTitleClient id={id} />
        <div className="flex gap-2 items-center">
          <p className="text-base font-bold text-Dark-Gray">모집중</p>
          <Toggle checked={true} />
        </div>
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
  try {
    const response = await serverInstance(accessToken).get(`/v1/users/dashboard/${postId}/stats`);
    const parsedData = StatsResponseSchema.parse(response.data);
    Logger.log('ProjectData 파싱 성공:', parsedData);
    return response.data;
  } catch (err) {
    Logger.error('ProjectData 파싱 실패:', err);
    throw err;
  }
}

async function getBarChart(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(
      `/v1/users/dashboard/${postId}/analytics/bar-chart`,
    );
    const parsedData = BarChartResponseSchema.parse(response.data);
    Logger.log('BarChartData 파싱 성공:', parsedData);
    return response.data;
  } catch (err) {
    Logger.error('BarChartData 파싱 실패:', err);
    throw err;
  }
}

async function getApplication(postId: number, status: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(
      `/v1/users/posts/${postId}/applications/${status}`,
    );
    const parsedData = ApplicationResponseSchema.parse(response.data);
    Logger.log('ApplicationData 파싱 성공:', parsedData);
    return response.data;
  } catch (err) {
    Logger.error('ApplicationData 파싱 실패:', err);
    throw err;
  }
}
