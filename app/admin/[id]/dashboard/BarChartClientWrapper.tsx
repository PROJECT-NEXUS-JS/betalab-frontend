'use client';
import { CustomBarChart } from '@/components/admin/CustomBarChart';
import { useBarChartQuery } from '@/hooks/dashboard/quries/useBarChartQuery';

export default function BarChartClientWrapper({ postId }: { postId: number }) {
  const { data, isLoading, isError } = useBarChartQuery(postId);

  if (isLoading) return <div className="grid grid-cols-3 gap-4">{/* 스켈레톤 UI */}</div>;
  if (isError) return <p>통계 정보를 불러오는 데 실패했습니다.</p>;

  const chartData = data?.data;
  if (!chartData || chartData.items.length === 0) {
    return <p>표시할 데이터가 없습니다.</p>;
  }
  return (
    <div className="w-full">
      <CustomBarChart chartData={chartData.items} />
    </div>
  );
}
