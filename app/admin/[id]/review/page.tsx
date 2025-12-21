'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { usePostReviewQuery } from '@/hooks/review/queries/usePostReviewQuery';
import { ReviewDataModel } from '@/hooks/review/dto';
import ReviewCard from '@/components/common/molecules/ReviewCard';
import ReviewCountCard from '@/components/admin/ReviewCountCard';
import ReviewDetailSidebar from '@/components/admin/ReviewDetailSidebar';
import { useCreateReviewReplyMutation } from '@/hooks/review/mutations/useCreateReviewReplyMutation';
import { useUpdateReviewReplyMutation } from '@/hooks/review/mutations/useUpdateReviewReplyMutation';
import { useDeleteReviewReplyMutation } from '@/hooks/review/mutations/useDeleteReviewReplyMutation';

export default function AdminReviewPage() {
  const params = useParams();
  const postId = Number(params.id);
  const [repliedReviews, setRepliedReviews] = useState<
    Record<number, { replyId: number; content: string; date: string }>
  >({});
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: reviewData, isLoading, isError } = usePostReviewQuery(postId);
  const createReplyMutation = useCreateReviewReplyMutation(postId);
  const updateReplyMutation = useUpdateReviewReplyMutation(postId);
  const deleteReplyMutation = useDeleteReviewReplyMutation(postId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const reviews = reviewData?.data || [];

  const handleReviewClick = (reviewId: number) => {
    setSelectedReview(reviewId);
    setSidebarOpen(true);
  };

  const handleReplySubmit = async (content: string) => {
    if (!selectedReview) return;

    try {
      const response = await createReplyMutation.mutateAsync({
        reviewId: selectedReview,
        data: { content },
      });
      const now = new Date(response.data.createdAt);
      const dateString = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      setRepliedReviews(prev => ({
        ...prev,
        [selectedReview]: {
          replyId: response.data.id,
          content: response.data.content,
          date: dateString,
        },
      }));
    } catch (error) {
      console.error('답변 생성 실패:', error);
    }
  };

  const handleReplyEdit = async (content: string) => {
    if (!selectedReview || !repliedReviews[selectedReview]) return;

    try {
      const replyId = repliedReviews[selectedReview].replyId;
      const response = await updateReplyMutation.mutateAsync({
        replyId,
        data: { content },
      });
      const now = new Date(response.data.updatedAt);
      const dateString = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      setRepliedReviews(prev => ({
        ...prev,
        [selectedReview]: {
          replyId: response.data.id,
          content: response.data.content,
          date: dateString,
        },
      }));
    } catch (error) {
      console.error('답변 수정 실패:', error);
    }
  };

  const handleReplyDelete = async () => {
    if (!selectedReview || !repliedReviews[selectedReview]) return;

    try {
      const replyId = repliedReviews[selectedReview].replyId;
      await deleteReplyMutation.mutateAsync(replyId);
      setRepliedReviews(prev => {
        const newReplies = { ...prev };
        delete newReplies[selectedReview];
        return newReplies;
      });
    } catch (error) {
      console.error('답변 삭제 실패:', error);
    }
  };

  const selectedReviewData = selectedReview
    ? reviews.find((r: ReviewDataModel) => r.id === selectedReview)
    : null;

  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-subtitle-01 font-semibold text-Black">리뷰 / Q&A</h1>
      <div className="flex flex-row gap-10">
        <ReviewCountCard title="전체 리뷰" count={reviews.length} />
      </div>
      <h2 className="text-body-01 font-semibold text-Dark-Gray">받은 리뷰</h2>

      <div className="flex flex-col w-full gap-5">
        {reviews.length === 0 ? (
          <div className="text-center text-Light-Gray text-subtitle-02 font-semibold w-full">
            등록된 리뷰가 없어요
          </div>
        ) : (
          reviews.map((review: ReviewDataModel) => {
            const hasReply = repliedReviews[review.id] !== undefined;
            return (
              <ReviewCard
                key={review.id}
                content={review.content}
                author={{
                  name: review.writer.nickname,
                  imageUrl: review.writer.profileUrl,
                }}
                rating={review.rating}
                date={review.createdAt}
                state="default"
                showReplyButton={true}
                isReplied={hasReply}
                onClick={() => handleReviewClick(review.id)}
              />
            );
          })
        )}
      </div>

      {selectedReviewData && (
        <ReviewDetailSidebar
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          review={{
            id: selectedReviewData.id,
            content: selectedReviewData.content,
            author: {
              name: selectedReviewData.writer.nickname,
              imageUrl: selectedReviewData.writer.profileUrl,
            },
            rating: selectedReviewData.rating,
            date: selectedReviewData.createdAt,
          }}
          replyContent={repliedReviews[selectedReviewData.id]?.content}
          replyDate={repliedReviews[selectedReviewData.id]?.date}
          onReplySubmit={handleReplySubmit}
          onReplyEdit={handleReplyEdit}
          onReplyDelete={handleReplyDelete}
        />
      )}
    </section>
  );
}
