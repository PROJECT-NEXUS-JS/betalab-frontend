import React, { useState } from 'react';
import { useMyBookmarksQuery } from '@/hooks/posts/queries/useMyBookmarksQuery';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { TestCardType } from '@/types/models/testCard';

export default function MyBookmarkContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: myBookmarksData, isLoading } = useMyBookmarksQuery({ page: currentPage, size: 9 });
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    router.push(`/project/${postId}`);
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-wrap gap-10">
        {isLoading ? (
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : !myBookmarksData?.data?.content || myBookmarksData.data.content.length === 0 ? (
          <EmptyCard
            className="w-full py-[100px]"
            title={
              <>
                아직 스크랩한 테스트가 없어요! <br />
                마음에 드는 테스트를 스크랩 해보세요
              </>
            }
            buttonLabel="테스트 보러가기"
            onClick={() => {
              router.push('/category');
            }}
          />
        ) : (
          myBookmarksData.data.content.map(post => {
            const postCardData: TestCardType = {
              id: post.id,
              title: post.title,
              serviceSummary: post.serviceSummary,
              thumbnailUrl: post.thumbnailUrl,
              mainCategories: post.mainCategories,
              platformCategories: post.platformCategories,
              genreCategories: post.genreCategories,
              schedule: post.schedule,
              reward: post.reward,
            };

            return (
              <div key={post.id} onClick={() => handlePostClick(post.id)}>
                <PostCard post={postCardData} />
              </div>
            );
          })
        )}
      </div>

      {!isLoading && myBookmarksData?.data?.content && myBookmarksData.data.content.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={myBookmarksData.data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
