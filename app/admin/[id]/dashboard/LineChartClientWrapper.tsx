'use client';
import { CustomLineChart } from '@/components/admin/CustomLineChart';
import { useLineChartQuery } from '@/hooks/dashboard/quries/useLineChartQuery';

export default function LineChartClientWrapper({ postId }: { postId: number }) {
  const { data, isLoading, isError } = useLineChartQuery(postId);

  if (isLoading)
    return (
      <div className="w-full p-12 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)] flex items-center justify-center min-h-[400px]">
        <div className="text-center text-Gray-300">로딩 중...</div>
      </div>
    );
  if (isError) return <p className="text-center text-red-500">통계 정보를 불러오는 데 실패했습니다.</p>;

  const chartData = data?.data;
  if (!chartData || !chartData.series || !chartData.labels || chartData.series.length === 0) {
    return <p className="text-center text-Gray-300">표시할 데이터가 없습니다.</p>;
  }

  return (
    <div className="w-full">
      <CustomLineChart series={chartData.series} labels={chartData.labels} />
    </div>
  );
}

