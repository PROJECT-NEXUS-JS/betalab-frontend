import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useWatchlistQuery } from '@/hooks/mypage/queries/useWatchlistQuery';
import { useDashboardQuery } from '@/hooks/mypage/queries/useDashboardQuery';
import { useTotalParticipationQuery } from '@/hooks/mypage/queries/useTotalParticipationQuery';
import { useRouter } from 'next/navigation';
import CardScroll from '@/components/home/molecules/CardScroll';
import PostCard from '@/components/category/molecules/PostCard';
import PostCardMini from '@/components/category/molecules/PostCardMini';
import EmptyCard from '../molecules/EmptyCard';
import { mapToTestCard } from '@/lib/mapper/test-card';
import DonutChart from '../molecules/DonutChart';
import NotificationComponent from '../molecules/NotificationComponent';

interface MainContentProps {
  className?: string;
}

export default function MainContent({ className }: MainContentProps) {
  const [watchlistPage, setWatchlistPage] = useState(0);
  const [recentlyViewedPage, setRecentlyViewedPage] = useState(0);
  const { data: watchlistData, isLoading: watchlistLoading } = useWatchlistQuery();
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboardQuery();
  const { data: totalParticipationData, isLoading: totalParticipationLoading } =
    useTotalParticipationQuery();

  const router = useRouter();
  const donutChartData: DonutChartData[] = useMemo(() => {
    if (!totalParticipationData?.countByCategory) {
      return [];
    }
    return Object.entries(totalParticipationData.countByCategory)
      .map(([label, value]) => ({
        label,
        value,
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [totalParticipationData]);

  const handleWatchlistPageChange = (page: number) => {
    setWatchlistPage(page);
  };

  const handleRecentlyViewedPageChange = (page: number) => {
    setRecentlyViewedPage(page);
  };

  return (
    <section className={cn('gap-10 flex flex-col', className)}>
      <div className="flex flex-col gap-5 p-5">
        <h3 className="text-body-01 font-semibold text-Dark-Gray">최근 본 테스트</h3>

        {dashboardLoading ? (
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index + 'recentlyViewed'}
                className="w-[200px] h-[120px] bg-Gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : dashboardData?.recentlyViewedTests && dashboardData.recentlyViewedTests.length > 0 ? (
          <CardScroll
            currentPage={recentlyViewedPage}
            totalPages={Math.ceil(dashboardData.recentlyViewedTests.length / 3)}
            onPageChange={handleRecentlyViewedPageChange}
          >
            {dashboardData.recentlyViewedTests
              .slice(recentlyViewedPage * 3, recentlyViewedPage * 3 + 3)
              .map(test => {
                const mappedTest = mapToTestCard(test);
                return (
                  <div key={mappedTest.id} onClick={() => router.push(`/project/${mappedTest.id}`)}>
                    <PostCard post={mappedTest} />
                  </div>
                );
              })}
          </CardScroll>
        ) : (
          <EmptyCard
            className="w-full py-[100px]"
            title="아직 본 테스트가 없어요."
            buttonLabel="테스트 보러가기"
            onClick={() => {
              router.push('/');
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-5 p-5">
        <h3 className="text-body-01 font-semibold text-Dark-Gray">
          관심 목록중 <br /> 곧 마감되는 테스트에요!
        </h3>

        {watchlistLoading ? (
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index + 'watchlist'}
                className="w-[200px] h-[120px] bg-Gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : watchlistData?.testsNearingDeadline && watchlistData.testsNearingDeadline.length > 0 ? (
          <CardScroll
            currentPage={watchlistPage}
            totalPages={Math.ceil(watchlistData.testsNearingDeadline.length / 3)}
            onPageChange={handleWatchlistPageChange}
          >
            {watchlistData.testsNearingDeadline
              .slice(watchlistPage * 3, watchlistPage * 3 + 3)
              .map(test => (
                <div
                  key={test.postId}
                  className="cursor-pointer"
                  onClick={() => router.push(`/project/${test.postId}`)}
                >
                  <PostCardMini post={mapToTestCard(test)} />
                </div>
              ))}
          </CardScroll>
        ) : (
          <EmptyCard
            className="w-full py-[23.5px]"
            title="관심 목록이 없어요."
            buttonLabel="테스트 보러가기"
            onClick={() => {
              router.push('/category?mainCategory=마감임박');
            }}
          />
        )}
        <h3 className="text-body-01 font-semibold text-Dark-Gray">알림</h3>
        <div className="w-214 flex gap-10 items-start">
          <NotificationComponent useApi={true} />
          <div className="flex-1 flex justify-center bg-Gray-50">
            {(() => {
              const donutChartData = [
                { label: '게임', value: 1 },
                { label: '웹', value: 1 },
                { label: '앱', value: 2 },
              ];
              const total = donutChartData.reduce((sum, item) => sum + item.value, 0);
              if (total === 0) {
                return (
                  <EmptyCard
                    className="w-72"
                    title="아직 참여중인 테스트가 없어요"
                    buttonLabel="테스트 보러가기"
                    onClick={() => {
                      router.push('/');
                    }}
                  />
                );
              }
              return (
                <DonutChart data={donutChartData} total={total} totalLabel="총 참여 프로젝트" />
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
