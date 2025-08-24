import { useState } from 'react';
import { useMyApplicationsQuery } from '@/hooks/posts/queries/useMyApplicationsQuery';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { TestCardType } from '@/types/models/testCard';

export default function MyApplicationContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: myApplicationsData, isLoading } = useMyApplicationsQuery({
    page: currentPage,
    size: 9,
  });
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
        ) : !myApplicationsData?.data?.content || myApplicationsData.data.content.length === 0 ? (
          <EmptyCard
            className="w-full py-[100px]"
            title={
              <>
                아직 참여한 테스트가 없어요 !<br />
                관심있는 테스트를 찾아 첫 참여를 시작해보세요
              </>
            }
            buttonLabel="테스트 보러가기"
            onClick={() => {
              router.push('/');
            }}
          />
        ) : (
          myApplicationsData.data.content.map(application => {
            const postCardData: TestCardType = {
              id: application.post.id,
              title: application.post.title,
              serviceSummary: application.post.serviceSummary,
              thumbnailUrl: application.post.thumbnailUrl,
              mainCategories: application.post.mainCategories,
              platformCategories: application.post.platformCategories,
              genreCategories: application.post.genreCategories,
              schedule: application.post.schedule,
              reward: application.post.reward,
            };

            return (
              <div key={application.id} onClick={() => handlePostClick(application.post.id)}>
                <PostCard post={postCardData} />
              </div>
            );
          })
        )}
      </div>

      {!isLoading &&
        myApplicationsData?.data?.content &&
        myApplicationsData.data.content.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={myApplicationsData.data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
    </div>
  );
}
