'use client';
import { usePieChartQuery } from '@/hooks/dashboard/quries/usePieChartQuery';
import EmptyCard from '@/components/mypage/molecules/EmptyCard';
import { useRouter } from 'next/navigation';
import {
  StatusPieChart,
  RewardDonutChart,
  STATUS_COLORS,
  REWARD_COLORS,
} from '@/components/admin/CustomPieChart';
import { PieChartModel } from '@/hooks/dashboard/dto/pieChart';

export default function PieChartClientWrapper({ postId }: { postId: number }) {
  const router = useRouter();
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
  if (isError)
    return <p className="text-center text-red-500">통계 정보를 불러오는 데 실패했습니다.</p>;

  const chartData = data?.data;
  if (!chartData) {
    return (
      <EmptyCard
        className="py-20"
        title="아직 데이터가 없어요"
        buttonLabel="내 테스트 보러가기"
        onClick={() => router.push('/mypage')}
      />
    );
  }

  const hasStatusData =
    chartData.statusChart?.items && chartData.statusChart.items.length > 0
      ? chartData.statusChart.items.some(
          (item: PieChartModel['statusChart']['items'][number]) => item.value > 0,
        )
      : false;
  const hasRewardData =
    chartData.rewardChart?.items && chartData.rewardChart.items.length > 0
      ? chartData.rewardChart.items.some(
          (item: PieChartModel['rewardChart']['items'][number]) => item.value > 0,
        )
      : false;

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {hasStatusData && chartData.statusChart ? (
        <StatusPieChart
          data={chartData.statusChart}
          colors={STATUS_COLORS}
          title={chartData.statusChart.title}
        />
      ) : (
        <EmptyCard
          className="py-20"
          title="아직 데이터가 없어요"
          buttonLabel="내 테스트 보러가기"
          onClick={() => router.push('/mypage')}
        />
      )}
      {hasRewardData && chartData.rewardChart ? (
        <RewardDonutChart
          data={chartData.rewardChart}
          colors={REWARD_COLORS}
          title={chartData.rewardChart.title}
        />
      ) : (
        <EmptyCard
          className="py-20"
          title="아직 데이터가 없어요"
          buttonLabel="내 테스트 보러가기"
          onClick={() => router.push('/mypage')}
        />
      )}
    </div>
  );
}
