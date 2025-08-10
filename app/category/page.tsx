'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/category/molecules/Sidebar';
import Tabbar from '@/components/category/molecules/Tabbar';
import Header from '@/components/common/organisms/Header';
import { useCategoryStore } from '@/stores/categoryStore';
import { usePagination } from '@/hooks/usePagination';
import Button from '@/components/common/atoms/Button';
import Pagination from '@/components/category/molecules/Pagination';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useUsersPostsListQuery } from '@/hooks/posts/query/useUsersPostsListQuery';
import { useAuth } from '@/hooks/useAuth';

function CategoryPageContent() {
  const router = useRouter();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const searchParams = useSearchParams();
  const { initializeFromURL } = useCategoryStore();
  const { currentPage, pageSize, setCurrentPage, setTotalPages, setTotalElements } =
    usePagination();

  useEffect(() => {
    initializeFromURL(searchParams);
  }, [searchParams, initializeFromURL]);

  const {
    data: postsData,
    isLoading,
    error,
  } = useUsersPostsListQuery({
    mainCategory: 'APP',
    page: currentPage - 1,
    size: pageSize,
    sortBy: 'latest',
  });

  useEffect(() => {
    if (postsData) {
      setTotalPages(postsData.totalPages);
      setTotalElements(postsData.totalElements);
    }
  }, [postsData, setTotalPages, setTotalElements]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (error) {
      router.push('/');
    }
  }, [error, router]);

  if (error) {
    return (
      <div className="flex flex-col">
        <Header isSearchbar isLogin={isLoggedIn} isAuthLoading={isAuthLoading} />
        <Tabbar className="px-16 py-5" />
        <main className="flex pb-30 flex-row py-5 px-16 items-start justify-start gap-10">
          <Sidebar />
          <section className="flex flex-col items-center gap-10">
            <div className="text-center text-red-500">
              인증이 필요합니다. 홈페이지로 이동합니다.
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header isSearchbar isLogin={isLoggedIn} isAuthLoading={isAuthLoading} />
      <Tabbar className="px-16 py-5" />
      <main className="flex pb-30 flex-row py-5 px-16 items-start justify-start gap-10">
        <Sidebar />
        <section className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-3 gap-x-4 gap-y-10 w-full">
            {isLoading
              ? Array.from({ length: 12 }, (_, index) => <PostCardSkeleton key={index} />)
              : postsData?.content.map(post => <PostCard key={post.id} post={post} />)}
          </div>

          {postsData && postsData.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={postsData.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>
      <Button
        onClick={() => router.push('/test-add')}
        className="fixed bottom-[30px] right-[31px]"
        label="테스트 등록"
        Size="xxl"
        State="Primary"
      />
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent />
    </Suspense>
  );
}
