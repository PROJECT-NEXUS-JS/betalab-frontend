'use client';

import { useStatisticsQuery } from '@/hooks/reward/queries/useStatisticsQuery';
import RewardList from '@/components/admin/reward/reward-list';

export default function RewardListClient({ postId }: { postId: number }) {
  const { data, isLoading, isError } = useStatisticsQuery(postId);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !data) {
    return <div>에러 발생</div>;
  }

  const statistics = data.data;

  const rewardItems = [
    { label: '승인대기', count: statistics.pendingCount, color: 'blue' as const },
    { label: '진행중', count: statistics.approvedCount, color: 'blue' as const },
    { label: '완료', count: statistics.completedCount, color: 'green' as const },
    { label: '리워드 지급 완료', count: statistics.paidCount, color: 'black' as const },
  ];

  return <RewardList items={rewardItems} />;
}

