'use client';

import { useEffect, useState } from 'react';
import PopularHeader from '@/components/category/molecules/PopularHeader';
import Tabbar from '@/components/category/molecules/Tabbar';
import Button from '@/components/common/atoms/Button';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import PostCardLong, { PostCardLongSkeleton } from '@/components/category/molecules/PostCardLong';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUsersPostsListQuery } from '@/hooks/posts/queries/useUsersPostsListQuery';
import { useCategoryStore } from '@/stores/categoryStore';
import { getApiParams } from './utils';

export default function PopularPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initializeFromURL } = useCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '전체');

  // 검색어 가져오기
  const keyword = searchParams.get('q') || '';

  useEffect(() => {
    initializeFromURL(searchParams);

    const categoryFromURL = searchParams.get('category');
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [searchParams, initializeFromURL]);

  const { data: topPostsData, isLoading: isLoadingTop } = useUsersPostsListQuery({
    sortBy: 'popular',
    ...getApiParams(selectedCategory),
    ...(keyword && { keyword }),
    page: 0,
    size: 4,
  });

  const { data: nextPostsData, isLoading: isLoadingNext } = useUsersPostsListQuery({
    sortBy: 'popular',
    ...getApiParams(selectedCategory),
    ...(keyword && { keyword }),
    page: 1,
    size: 4,
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());

    if (category !== '전체') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    router.push(`/category/popular?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col">
      <Tabbar className="px-16 py-5" />
      <main className="flex py-10 px-16 flex-col items-start w-full justify-start gap-10">
        <section className="flex flex-col items-start w-full gap-10">
          <PopularHeader
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          <div className="flex flex-row gap-10 w-full justify-start">
            {isLoadingTop
              ? Array.from({ length: 4 }, (_, index) => <PostCardSkeleton key={index} />)
              : topPostsData?.content
                  .slice(0, 4)
                  .map((post, index) => <PostCard key={post.id} post={post} ranking={index + 1} />)}
          </div>
          <div className="grid grid-cols-2 gap-10 justify-items-start">
            {isLoadingNext
              ? Array.from({ length: 4 }, (_, index) => <PostCardLongSkeleton key={index} />)
              : nextPostsData?.content.slice(0, 4).map((post, index) => (
                  <div key={post.id} className="flex-row flex items-start gap-6">
                    <h3 className="text-head text-Gray-300 font-bold">{index + 5}</h3>
                    <PostCardLong post={post} />
                  </div>
                ))}
          </div>
        </section>
      </main>
      <Button
        onClick={() => router.push('/test-add')}
        className="fixed bottom-[30px] right-[31px] cursor-pointer"
        label="테스트 등록"
        Size="xxl"
        State="Primary"
      />
    </div>
  );
}
