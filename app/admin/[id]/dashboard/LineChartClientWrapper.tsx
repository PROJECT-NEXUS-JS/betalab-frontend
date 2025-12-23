'use client';
import { CustomLineChart } from '@/components/admin/CustomLineChart';
import { useLineChartQuery } from '@/hooks/dashboard/quries/useLineChartQuery';
import EmptyCard from '@/components/mypage/molecules/EmptyCard';
import { useRouter } from 'next/navigation';

export default function LineChartClientWrapper({ postId }: { postId: number }) {
  const router = useRouter();
  const { data, isLoading, isError } = useLineChartQuery(postId);

  if (isLoading)
    return (
      <div className="w-full p-12 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)] flex items-center justify-center min-h-[400px]">
        <div className="text-center text-Gray-300">로딩 중...</div>
      </div>
    );
  if (isError) return <p className="text-center text-red-500">통계 정보를 불러오는 데 실패했습니다.</p>;

  const chartData = data?.data;
  const hasSeriesData =
    chartData?.series && chartData.series.length > 0
      ? chartData.series.some(series => series.data && series.data.length > 0 && series.data.some(val => val > 0))
      : false;
  const hasLabels = chartData?.labels && chartData.labels.length > 0;

  if (!chartData || !hasSeriesData || !hasLabels) {
    return (
      <EmptyCard
        className="py-20"
        title="아직 데이터가 없어요"
        buttonLabel="내 테스트 보러가기"
        onClick={() => router.push('/mypage')}
      />
    );
  }

  return (
    <div className="w-full">
      <CustomLineChart series={chartData.series} labels={chartData.labels} />
    </div>
  );
}

