import Chip from '@/components/common/atoms/Chip';
import { useState } from 'react';
import { useMyWritableReviewsQuery } from '@/hooks/posts/queries/useMyWritableReviewsQuery';
import { WritableReviewItemType } from '@/hooks/posts/dto/myWritableReviews';
import { WrittenReviewItemType } from '@/hooks/review/dto/writtenReviews';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { TestCardType } from '@/types/models/testCard';
import { useWrittenReviewsQuery } from '@/hooks/review/queries/useWrittenReviewsQuery';
import MyReviewCard from '@/components/common/molecules/MyReviewCard';
import Button from '@/components/common/atoms/Button';
import ReviewModal from './ReviewModal';
import { useCreateReviewMutation } from '@/hooks/review/mutations/useCreateReviewMutation';
import { useQueries } from '@tanstack/react-query';
import { getReviewReplies } from '@/hooks/review/queries/useReviewRepliesQuery';

export default function MyReviewContent() {
  const [selectedTab, setSelectedTab] = useState<'writable' | 'written'>('writable');
  const [currentPage, setCurrentPage] = useState(0);
  const { data: writableReviewsData, isLoading } = useMyWritableReviewsQuery({
    page: currentPage,
    size: 9,
  });
  const { data: writtenReviewsData, isLoading: isWrittenReviewsLoading } = useWrittenReviewsQuery({
    page: currentPage,
    size: 10,
  });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const createReviewMutation = useCreateReviewMutation();

  const reviews = writtenReviewsData?.data?.content || [];
  const replyQueries = useQueries({
    queries: reviews.map((review: WrittenReviewItemType) => ({
      queryKey: ['reviewReplies', review.reviewId],
      queryFn: () => getReviewReplies(review.reviewId),
      enabled: !!review.reviewId && reviews.length > 0,
    })),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditReview = (review: any) => {
    if (review) {
      setSelectedPost({
        id: review.postId,
        title: review.postTitle || '제목 없음',
        thumbnailUrl: review.postThumbnail,
        startDate: review.approvedAt,
        endDate: review.approvedAt,
        existingReview: review,
      });
      setIsModalOpen(true);
    }
  };

  const handleSubmitReview = async (rating: number, content: string) => {
    if (!selectedPost) return;

    try {
      await createReviewMutation.mutateAsync({
        postId: selectedPost.id,
        rating,
        content,
      });
      setIsModalOpen(false);
      setSelectedPost(null);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
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
                  router.push('/');
                }}
              />
            ) : (
              writableReviewsData.data.content.map((review: WritableReviewItemType) => {
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
                  <div key={review.postId} className="group relative">
                    <div className="group-hover:brightness-75 transition-opacity duration-300">
                      <PostCard post={postCardData} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        label="리뷰 작성"
                        Size="lg"
                        State="Primary"
                        className="z-10"
                        onClick={() => handleEditReview(review)}
                      />
                    </div>
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
          {isWrittenReviewsLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full h-32 bg-gray-200 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : !writtenReviewsData?.data?.content || writtenReviewsData.data.content.length === 0 ? (
            <EmptyCard
              className="w-full py-[100px]"
              title="아직 작성한 리뷰가 없어요"
              buttonLabel="테스트 보러가기"
              onClick={() => {
                router.push('/category');
              }}
            />
          ) : (
            <>
              <div className="flex flex-col gap-10">
                {writtenReviewsData.data.content.map(
                  (review: WrittenReviewItemType, index: number) => {
                    const replyQuery = replyQueries[index];
                    const replyContent = replyQuery?.data?.data?.[0]?.content;

                    return (
                      <div key={review.reviewId}>
                        <MyReviewCard
                          review={review}
                          reply={replyContent ? { content: replyContent } : null}
                        />
                      </div>
                    );
                  },
                )}
              </div>

              {writtenReviewsData.data.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={writtenReviewsData.data.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      )}
      {isModalOpen && selectedPost && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          postData={selectedPost}
          onSubmit={handleSubmitReview}
          isLoading={createReviewMutation.isPending}
        />
      )}
    </div>
  );
}
