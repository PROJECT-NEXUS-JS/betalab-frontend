import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

import StatsCardClientWrapper from './StatsCardClientWrapper';
import ChartToggleWrapper from './ChartToggleWrapper';
import TestTitleClient from './TestTitleClient';
import RecruitmentStatusToggle from './RecruitmentStatusToggle';
import { getStats, getBarChart, getPieChart, getLineChart } from './dashboard-api';
import QuickActionSheet from '@/components/admin/QuickActionSheet';
import Logger from '@/lib/logger';

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

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.pieChart(id),
      queryFn: () => getPieChart(id),
    });
  } catch (err) {
    Logger.error('PieChart prefetch 실패:', err);
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.lineChart(id),
      queryFn: () => getLineChart(id),
    });
  } catch (err) {
    Logger.error('LineChart prefetch 실패:', err);
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
        <ChartToggleWrapper postId={id} dehydratedState={dehydratedState} />
      </section>
      <HydrationBoundary state={dehydratedState}>
        <QuickActionSheet postId={id} />
      </HydrationBoundary>
    </div>
  );
}
