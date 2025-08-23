import Chip from '@/components/common/atoms/Chip';
import { useState } from 'react';
import { useMyWritableReviewsQuery } from '@/hooks/posts/queries/useMyWritableReviewsQuery';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { TestCardType } from '@/types/models/testCard';

export default function MyReviewContent() {
  const [selectedTab, setSelectedTab] = useState<'writable' | 'written'>('writable');
  const [currentPage, setCurrentPage] = useState(0);
  const { data: writableReviewsData, isLoading } = useMyWritableReviewsQuery({
    page: currentPage,
    size: 9,
  });
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    // 리뷰 작성 페이지로 이동 (예: /review/write/{postId})
    router.push(`/review/write/${postId}`);
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row gap-2">
        <Chip
          size="lg"
          variant={selectedTab === 'writable' ? 'primary' : 'default'}
          onClick={() => setSelectedTab('writable')}
          showArrowIcon={false}
        >
          작성 가능한 리뷰
        </Chip>
        <Chip
          size="lg"
          variant={selectedTab === 'written' ? 'primary' : 'default'}
          onClick={() => setSelectedTab('written')}
          showArrowIcon={false}
        >
          작성한 리뷰
        </Chip>
      </div>

      {/* 작성 가능한 리뷰 탭일 때만 내용 표시 */}
      {selectedTab === 'writable' && (
        <div className="flex flex-col mt-10">
          <div className="flex flex-wrap gap-10">
            {isLoading ? (
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 9 }).map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
              </div>
            ) : !writableReviewsData?.data?.content ||
              writableReviewsData.data.content.length === 0 ? (
              <EmptyCard
                className="w-full py-[100px]"
                title="아직 리뷰를 작성할 수 있는 테스트가 없어요"
                buttonLabel="테스트 보러가기"
                onClick={() => {
                  router.push('/category');
                }}
              />
            ) : (
              writableReviewsData.data.content.map(review => {
                const postCardData: TestCardType = {
                  id: review.postId,
                  title: review.postTitle,
                  serviceSummary: `카테고리: ${review.category}`,
                  thumbnailUrl: review.postThumbnail,
                  mainCategories: [{ code: review.category, name: review.category }],
                  platformCategories: [],
                  genreCategories: [],
                  schedule: {
                    startDate: review.approvedAt,
                    endDate: review.approvedAt,
                    recruitmentDeadline: review.approvedAt,
                    durationTime: '',
                  },
                  reward: undefined,
                };

                return (
                  <div key={review.postId} onClick={() => handlePostClick(review.postId)}>
                    <PostCard post={postCardData} />
                  </div>
                );
              })
            )}
          </div>

          {!isLoading &&
            writableReviewsData?.data?.content &&
            writableReviewsData.data.content.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={writableReviewsData.data.totalPages}
                onPageChange={handlePageChange}
              />
            )}
        </div>
      )}

      {selectedTab === 'written' && (
        <div className="flex flex-col mt-10">
          <EmptyCard
            className="w-full py-[100px]"
            title="아직 작성한 리뷰가 없어요"
            buttonLabel="테스트 보러가기"
            onClick={() => {
              router.push('/category');
            }}
          />
        </div>
      )}
    </div>
  );
}
