import { useState } from 'react';
import { useMyPostsQuery } from '@/hooks/posts/queries/useMyPostsQuery';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { PostSummaryType } from '@/hooks/posts/dto/postList';

export default function MyPostContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: myPostsData, isLoading } = useMyPostsQuery({ page: currentPage, size: 9 });
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    router.push(`/admin/${postId}`);
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
        ) : !myPostsData?.data?.content || myPostsData.data.content.length === 0 ? (
          <EmptyCard
            className="w-full py-[100px]"
            title={
              <>
                아직 올린 테스트가 없어요 !<br />
                첫번째 테스트를 등록하고 테스터들을 만나보세요.
              </>
            }
            buttonLabel="테스트 게시하기"
            onClick={() => {
              router.push('/test-add');
            }}
          />
        ) : (
          myPostsData.data.content.map(post => {
            const postCardData: PostSummaryType = {
              id: post.id,
              title: post.title,
              serviceSummary: post.serviceSummary,
              thumbnailUrl: post.thumbnailUrl,
              mainCategories: post.mainCategories,
              platformCategories: post.platformCategories,
              genreCategories: post.genreCategories,
              schedule: {
                startDate: '',
                endDate: '',
                recruitmentDeadline: '',
                durationTime: '',
              },
              reward: {
                rewardType: 'NONE',
                rewardDescription: 'NONE',
              },
            };

            return (
              <div key={post.id} onClick={() => handlePostClick(post.id)}>
                <PostCard post={postCardData} />
              </div>
            );
          })
        )}
      </div>

      {!isLoading && myPostsData?.data?.content && myPostsData.data.content.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={myPostsData.data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
