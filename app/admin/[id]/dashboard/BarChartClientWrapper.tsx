'use client';
import { CustomBarChart } from '@/components/admin/CustomBarChart';
import { useBarChartQuery } from '@/hooks/dashboard/quries/useBarChartQuery';
import EmptyCard from '@/components/mypage/molecules/EmptyCard';
import { useRouter } from 'next/navigation';

export default function BarChartClientWrapper({ postId }: { postId: number }) {
  const router = useRouter();
  const { data, isLoading, isError } = useBarChartQuery(postId);

  if (isLoading) return <div className="grid grid-cols-3 gap-4">{/* 스켈레톤 UI */}</div>;
  if (isError) return <p>통계 정보를 불러오는 데 실패했습니다.</p>;

  const chartData = data?.data;
  if (!chartData || !chartData.items || chartData.items.length === 0) {
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
      <CustomBarChart chartData={chartData.items} />
    </div>
  );
}
