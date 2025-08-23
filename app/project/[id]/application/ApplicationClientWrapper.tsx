'use client';

import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import RemindCard from '@/components/common/atoms/RemindCard';

import { transformToApplyCardProps } from '@/lib/mapper/apply-card';
import { useGetRightSidebar } from '@/hooks/posts/query/usePostRightSidebar';

export default function ApplicationClientWrapper({ id }: { id: number }) {
  const {
    data: rightSidebarData,
    isLoading: isRightSidebarLoading,
    isError: isRightSidebarError,
  } = useGetRightSidebar(Number(id));

  const applyCardData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> = {
    ...transformToApplyCardProps(
      rightSidebarData?.data ?? {
        testName: '',
        recruiterName: '',
        testSummary: '',
        daysRemaining: 0,
        scrapCount: 0,
        currentParticipants: 0,
        participationTarget: '',
        requiredDuration: '',
        rewardInfo: '',
        participationMethod: '',
        qnaMethod: '',
      },
    ),
    scrapedAndRegisterShow: false,
  };

  if (isRightSidebarLoading) return <div>로딩 중...</div>;
  if (isRightSidebarError) return <div>에러 발생</div>;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl mt-10 gap-10">
        <aside className="flex">
          <ApplyCard {...applyCardData} />
        </aside>
        <div className="flex flex-1 flex-col">
          <h2>신청서</h2>
          <RemindCard />
        </div>
      </div>
    </div>
  );
}
