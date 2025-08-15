'use client';

import Header from '@/components/common/organisms/Header';
import { useAuth } from '@/hooks/useAuth';
import HomeHeader from '@/components/home/organisms/HomeHeader';
import HomeSection from '@/components/home/organisms/HomeSection';
import SectionTitle from '@/components/home/atoms/SectionTitle';
import CardScroll from '@/components/home/molecules/CardScroll';
import ViewAllButton from '@/components/home/atoms/ViewAllButton';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import PostCardMini, { PostCardMiniSkeleton } from '@/components/category/molecules/PostCardMini';
import { useUsersPostsListQuery } from '@/hooks/posts/query/useUsersPostsListQuery';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    console.log(recommendPostsError || deadlinePostsError || popularPostsError);
    return <div>홈페이지에 문의하세요.</div>;
  }
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
            onPageChange={setDeadlinePage}
          >
            {deadlinePostsLoading &&
              Array.from({ length: 4 }).map((_, index) => <PostCardMiniSkeleton key={index} />)}
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
          <CardScroll>
            {popularPosts?.content.length === 0 && (
              <div className="h-[146px] flex justify-center items-center">
                <p className="text-body-01 text-Gray-300">인기 테스트가 없어요.</p>
              </div>
            )}
            {popularPosts?.content.map((post, index) => (
              <PostCard key={post.id} post={post} ranking={index + 1 + popularPage * 4} />
            ))}
>>>>>>> b899b41 (feat: 홈페이지 api 연동중)
          </CardScroll>
          <ViewAllButton href="/category?category=popular">인기 테스트 전체보기</ViewAllButton>
        </HomeSection>
      </main>
    </div>
  );
}
