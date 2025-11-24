'use client';
import { CustomPieChart } from '@/components/admin/CustomPieChart';
import { usePieChartQuery } from '@/hooks/dashboard/quries/usePieChartQuery';

export default function PieChartClientWrapper({ postId }: { postId: number }) {
  const { data, isLoading, isError } = usePieChartQuery(postId);

  if (isLoading)
    return (
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="flex-1 p-6 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)] flex items-center justify-center min-h-[400px]">
          <div className="text-center text-Gray-300">로딩 중...</div>
        </div>
        <div className="flex-1 p-6 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)] flex items-center justify-center min-h-[400px]">
          <div className="text-center text-Gray-300">로딩 중...</div>
        </div>
      </div>
    );
  if (isError) return <p className="text-center text-red-500">통계 정보를 불러오는 데 실패했습니다.</p>;

  const chartData = data?.data;
  if (!chartData || !chartData.statusChart || !chartData.rewardChart) {
    return <p className="text-center text-Gray-300">표시할 데이터가 없습니다.</p>;
  }

  return (
    <div className="w-full">
      <CustomPieChart statusChart={chartData.statusChart} rewardChart={chartData.rewardChart} />
    </div>
  );
}

