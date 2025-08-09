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
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const {
    data: recommendPosts,
    isLoading: recommendPostsLoading,
    error: recommendPostsError,
  } = useUsersPostsListQuery({ sortBy: 'latest', page: 0, size: 4 });
  const {
    data: deadlinePosts,
    isLoading: deadlinePostsLoading,
    error: deadlinePostsError,
  } = useUsersPostsListQuery({ sortBy: 'deadline', page: 0, size: 4 });
  const {
    data: popularPosts,
    isLoading: popularPostsLoading,
    error: popularPostsError,
  } = useUsersPostsListQuery({ sortBy: 'popular', page: 0, size: 4 });

  const isLoading =
    isAuthLoading || recommendPostsLoading || deadlinePostsLoading || popularPostsLoading;

  const isError = recommendPostsError || deadlinePostsError || popularPostsError;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>홈페이지에 문의하세요.</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <Header isLogin={isLoggedIn} />
      <HomeHeader />
      <main className="px-14 flex flex-col gap-10 mb-30">
        <HomeSection>
          <SectionTitle className="w-full text-left">오늘의 추천 테스트</SectionTitle>
          <CardScroll>
            {recommendPosts?.content.length === 0 && (
              <div className="h-[146px] flex justify-center items-center">
                <p className="text-body-01 text-Gray-300">오늘의 추천 테스트가 없어요.</p>
              </div>
            )}
            {recommendPosts?.content.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </CardScroll>
          <ViewAllButton href="/category?category=recommend">
            오늘의 추천 테스트 전체보기
          </ViewAllButton>
        </HomeSection>
        <HomeSection>
          <SectionTitle className="w-full text-left">곧 마감되는 테스트에요</SectionTitle>
          <CardScroll>
            {deadlinePosts?.content.length === 0 && (
              <div className="h-[146px] flex justify-center items-center">
                <p className="text-body-01 text-Gray-300">곧 마감되는 테스트가 없어요.</p>
              </div>
            )}
            {deadlinePosts?.content.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </CardScroll>
          <ViewAllButton href="/category?category=deadline">
            마감 임박 테스트 전체보기
          </ViewAllButton>
        </HomeSection>
        <HomeSection>
          <SectionTitle className="w-full text-left">인기있는 테스트에요</SectionTitle>
          <CardScroll>
            {popularPosts?.content.length === 0 && (
              <div className="h-[146px] flex justify-center items-center">
                <p className="text-body-01 text-Gray-300">인기 테스트가 없어요.</p>
              </div>
            )}
            {popularPosts?.content.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </CardScroll>
          <ViewAllButton href="/category?category=popular">인기 테스트 전체보기</ViewAllButton>
        </HomeSection>
      </main>
    </div>
  );
}
