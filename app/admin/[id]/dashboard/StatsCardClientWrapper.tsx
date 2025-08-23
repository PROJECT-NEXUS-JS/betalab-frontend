'use client';
import DashBoardCard from '@/components/admin/DashBoardCard';
import { useStatsQuery } from '@/hooks/dashboard/quries/useStatsQuery';
import { STATS_CONFIG } from '@/constants/dashboardConfig';

export default function StatsCardClientWrapper({ postId }: { postId: number }) {
  const { data: stats, isLoading, isError } = useStatsQuery(postId);
  if (isLoading) return <div className="grid grid-cols-3 gap-4">{/* 스켈레톤 UI */}</div>;
  if (isError || !stats?.data) return <p>통계 정보를 불러오는 데 실패했습니다.</p>;
  const statsData = stats.data;

  const { unreadMessages } = statsData;
  return (
    <div className="grid grid-cols-3 gap-10">
      {STATS_CONFIG.map(config => {
        const statValue = statsData[config.key];

        return (
          <DashBoardCard
            key={config.key}
            current={statValue.current}
            previousDay={statValue.previousDay}
            changeAmount={statValue.changeAmount}
            type={config.key}
          />
        );
      })}
    </div>
  );
}
