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
import { useState } from 'react';

export default function HomePage() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();

  const [recommendPage, setRecommendPage] = useState(0);
  const [deadlinePage, setDeadlinePage] = useState(0);
  const [popularPage, setPopularPage] = useState(0);

  const {
    data: recommendPosts,
    isLoading: recommendPostsLoading,
    error: recommendPostsError,
  } = useUsersPostsListQuery({ sortBy: 'latest', page: recommendPage, size: 4 });
  const {
    data: deadlinePosts,
    isLoading: deadlinePostsLoading,
    error: deadlinePostsError,
  } = useUsersPostsListQuery({ sortBy: 'deadline', page: deadlinePage, size: 4 });
  const {
    data: popularPosts,
    isLoading: popularPostsLoading,
    error: popularPostsError,
  } = useUsersPostsListQuery({ sortBy: 'popular', page: popularPage, size: 4 });

  const isLoading =
    isAuthLoading || recommendPostsLoading || deadlinePostsLoading || popularPostsLoading;

  const isError = recommendPostsError || deadlinePostsError || popularPostsError;

  // 페이지 변경 핸들러들
  const handleRecommendPageChange = (page: number) => {
    setRecommendPage(page);
  };

  const handleDeadlinePageChange = (page: number) => {
    setDeadlinePage(page);
  };

  const handlePopularPageChange = (page: number) => {
    setPopularPage(page);
  };

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
          <CardScroll
            currentPage={recommendPage}
            totalPages={recommendPosts?.totalPages || 1}
            onPageChange={handleRecommendPageChange}
          >
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
          <CardScroll
            currentPage={deadlinePage}
            totalPages={deadlinePosts?.totalPages || 1}
            onPageChange={handleDeadlinePageChange}
          >
            {deadlinePosts?.content.length === 0 && (
              <div className="h-[146px] flex justify-center items-center">
                <p className="text-body-01 text-Gray-300">곧 마감되는 테스트가 없어요.</p>
              </div>
            )}
            {deadlinePosts?.content.map(post => (
              <PostCardMini key={post.id} post={post} />
            ))}
          </CardScroll>
          <ViewAllButton href="/category?category=deadline">
            마감 임박 테스트 전체보기
          </ViewAllButton>
        </HomeSection>
        <HomeSection>
          <SectionTitle className="w-full text-left">인기있는 테스트에요</SectionTitle>
          <CardScroll
            currentPage={popularPage}
            totalPages={popularPosts?.totalPages || 1}
            onPageChange={handlePopularPageChange}
          >
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
