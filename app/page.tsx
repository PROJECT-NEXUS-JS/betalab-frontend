'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Header from '@/components/common/organisms/Header';
import { useAuth } from '@/hooks/useAuth';
import HomeHeader from '@/components/home/organisms/HomeHeader';
import HomeSection from '@/components/home/organisms/HomeSection';
import SectionTitle from '@/components/home/atoms/SectionTitle';
import CardScroll from '@/components/home/molecules/CardScroll';
import ViewAllButton from '@/components/home/atoms/ViewAllButton';
import PostCard from '@/components/category/molecules/PostCard';
import PostCardMini from '@/components/category/molecules/PostCardMini';

// 임시 mock 데이터 (추후 API 요청으로 대체)
const mockPostData = {
  id: '1',
  title: '샘플 테스트 제목',
  serviceSummary: '샘플 테스트 서비스 요약 설명입니다.',
  thumbnailUrl: '',
  mainCategories: [{ code: 'APP', name: '앱' }],
  platformCategories: [{ code: 'IOS', name: 'iOS' }],
  schedule: {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    recruitmentDeadline: '2024-12-31',
    durationTime: '30분',
  },
  reward: {
    rewardType: 'CASH',
    rewardDescription: 'CASH' as const,
  },
};

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HomeContent />
    </QueryClientProvider>
  );
}

function HomeContent() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <Header isLogin={isLoggedIn} />
      <HomeHeader />
      <main className="px-14 flex flex-col gap-10 mb-30">
        <HomeSection>
          <SectionTitle className="w-full text-left">오늘의 추천 테스트</SectionTitle>
          <CardScroll>
            <PostCard post={mockPostData} />
            <PostCard post={mockPostData} />
            <PostCard post={mockPostData} />
            <PostCard post={mockPostData} />
          </CardScroll>
          <ViewAllButton href="/category?category=recommend">
            오늘의 추천 테스트 전체보기
          </ViewAllButton>
        </HomeSection>
        <HomeSection>
          <SectionTitle className="w-full text-left">곧 마감되는 테스트에요</SectionTitle>
          <CardScroll>
            <PostCardMini post={mockPostData} />
            <PostCardMini post={mockPostData} />
            <PostCardMini post={mockPostData} />
            <PostCardMini post={mockPostData} />
          </CardScroll>
          <ViewAllButton href="/category?category=deadline">
            마감 임박 테스트 전체보기
          </ViewAllButton>
        </HomeSection>
        <HomeSection>
          <SectionTitle className="w-full text-left">인기있는 테스트에요</SectionTitle>
          <CardScroll>
            <PostCard post={mockPostData} />
            <PostCard post={mockPostData} />
            <PostCard post={mockPostData} />
            <PostCard post={mockPostData} />
          </CardScroll>
          <ViewAllButton href="/category?category=popular">인기 테스트 전체보기</ViewAllButton>
        </HomeSection>
      </main>
    </div>
  );
}
