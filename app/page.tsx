'use client';

import Header from '@/components/common/organisms/Header';
import { useAuth } from '@/hooks/useAuth';
import HomeHeader from '@/components/home/organisms/HomeHeader';
import HomeSection from '@/components/home/organisms/HomeSection';
import SectionTitle from '@/components/home/atoms/SectionTitle';
import CardScroll from '@/components/home/molecules/CardScroll';
import ViewAllButton from '@/components/home/atoms/ViewAllButton';
import PostCard from '@/components/category/molecules/PostCard';
import PostCardMini from '@/components/category/molecules/PostCardMini';
import { useUsersPostsListQuery } from '@/hooks/posts/query/useUsersPostsListQuery';

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
  const { isLoggedIn, isLoading } = useAuth();
  const {
    data: postsPage,
    isLoading: isPostsLoading,
    error: postsError,
  } = useUsersPostsListQuery({ sortBy: 'latest', page: 0, size: 8 });

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
            {isPostsLoading && <div className="px-3 py-4 text-Gray-300">불러오는 중...</div>}
            {!isPostsLoading && !!postsError && (
              <div className="px-3 py-4 text-Error">목록을 불러오지 못했어요</div>
            )}
            {!isPostsLoading &&
              !postsError &&
              (postsPage?.content ?? []).map(post => <PostCard key={post.id} post={post} />)}
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
            <PostCardMini post={mockPostData} />
            <PostCardMini post={mockPostData} />
            <PostCardMini post={mockPostData} />
            <PostCardMini post={mockPostData} />
          </CardScroll>
          <ViewAllButton href="/category?category=popular">인기 테스트 전체보기</ViewAllButton>
        </HomeSection>
      </main>
    </div>
  );
}
