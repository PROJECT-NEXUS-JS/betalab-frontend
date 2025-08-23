'use client';
import ProfileCard from '@/components/mypage/atoms/ProfileCard';
import TestCard from '@/components/mypage/atoms/TestCard';
import Sidebar from '@/components/mypage/organisms/Sidebar';
import MainContent from '@/components/mypage/organisms/MainContent';
import MyPostContent from '@/components/mypage/organisms/MyPostContent';
import MyParticipateContent from '@/components/mypage/organisms/MyParticipateContent';
import Breadcrumb from '@/components/common/atoms/Breadcrumb';
import { useMyPageProfileQuery } from '@/hooks/mypage/queries/useMyPageProfileQuery';
import { MyPageMenuKey, getBreadcrumbItems } from '@/components/mypage/const';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Button from '@/components/common/atoms/Button';
import MyBookmarkContent from '@/components/mypage/organisms/MyBookmarkContent';

export default function MyPage() {
  const { data: profile, isLoading, isError, error } = useMyPageProfileQuery();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('');

  const isProfileLoading = isLoading || !profile || isError || error;

  useEffect(() => {
    const tab = searchParams.get('tab');
    setActiveTab(tab || '');
  }, [searchParams]);

  const handleMenuClick = (menuKey: MyPageMenuKey) => {
    setActiveTab(menuKey);
    router.push(`/mypage?tab=${menuKey}`, { scroll: false });
  };

  const tabComponents = {
    'posted-tests': <MyPostContent />,
    'participated-tests': <MyParticipateContent />,
    'bookmarked-tests': <MyBookmarkContent />,
  };

  const renderMainContent = () => {
    if (!activeTab) {
      return <MainContent />;
    }

    return tabComponents[activeTab as keyof typeof tabComponents] || activeTab;
  };

  return (
    <div className={cn('flex gap-10 py-10 px-16 min-h-screen')}>
      <div className="flex flex-col gap-10">
        {isProfileLoading ? (
          <div className="flex flex-col gap-10">
            <Skeleton className="w-[258px] h-[82px]" />
            <Skeleton className="w-[258px] h-[87px]" />
            <Skeleton className="w-[258px] h-[600px]" />
          </div>
        ) : (
          <>
            {(() => {
              const userData = {
                nickname: profile.name,
                avatar: profile.profileImageUrl || undefined,
                affiliation: profile.affiliation || '소속 없음',
                postedCount: profile.testsUploaded,
                participatingCount: profile.testsParticipating,
              };
              return (
                <>
                  <ProfileCard
                    avatar={userData.avatar}
                    nickname={userData.nickname}
                    affiliation={userData.affiliation}
                  />

                  <TestCard
                    postedCount={userData.postedCount}
                    participatingCount={userData.participatingCount}
                  />

                  <Sidebar
                    postedCount={userData.postedCount}
                    participatingCount={userData.participatingCount}
                    onMenuClick={handleMenuClick}
                    activeTab={activeTab}
                  />
                </>
              );
            })()}
          </>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col">
            {activeTab && <Breadcrumb className="mb-2" items={getBreadcrumbItems(activeTab)} />}
            <h1 className="text-subtitle-01 font-semibold text-Black">대시보드</h1>
          </div>
          <Button
            label="테스트 등록하기"
            Size="xl"
            State="Primary"
            className="cursor-pointer"
            onClick={() => {
              router.push('/test-add');
            }}
          />
        </div>
        {renderMainContent()}
      </div>
    </div>
  );
}
