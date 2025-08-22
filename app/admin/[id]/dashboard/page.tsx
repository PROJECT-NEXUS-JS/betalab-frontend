import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Toggle from '@/components/common/atoms/Toggle';
import StatsCardClientWrapper from './StatsCardClientWrapper';
import BarChartClientWrapper from './BarChartClientWrapper';

export default async function AdminDashboardPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats', id],
    queryFn: () => getStats(id),
  });

  await queryClient.prefetchQuery({
    queryKey: ['barChart', id],
    queryFn: () => getBarChart(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col w-full max-w-[854px] mb-40">
      <section className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold text-Black">
          테스트의 제목을 적어주세요 최대 두줄까지 보여집니다(추후 수정 예정)
        </h2>
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
    </div>
  );
}

async function getStats(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await serverInstance(accessToken).get(`/v1/users/dashboard/${postId}/stats`);
  return response.data;
}

async function getBarChart(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await serverInstance(accessToken).get(
    `/v1/users/dashboard/${postId}/analytics/bar-chart`,
  );
  return response.data;
}
