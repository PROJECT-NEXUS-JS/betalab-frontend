'use client';

import { useParams } from 'next/navigation';
import { usePostReviewQuery } from '@/hooks/review/queries/usePostReviewQuery';
import ReviewCard from '@/components/common/molecules/ReviewCard';
import ReviewCountCard from '@/components/admin/ReviewCountCard';

export default function AdminReviewPage() {
  const params = useParams();
  const postId = Number(params.id);

  const { data: reviewData, isLoading, isError } = usePostReviewQuery(postId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const reviews = reviewData?.data || [];

  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-subtitle-01 font-semibold text-Black">리뷰 / Q&A</h1>
      <div className="flex flex-row gap-10">
        <ReviewCountCard title="전체 리뷰" count={reviews.length} />
        {/* <ReviewCountCard
          title="답변을 기다리는 리뷰"
          count={reviews.filter(review => !review.content).length}
        /> */}
      </div>
      <h2 className="text-body-01 font-semibold text-Dark-Gray">받은 리뷰</h2>

      <div className="flex flex-col w-full gap-5">
        {reviews.length === 0 ? (
          <div className="text-center text-Light-Gray text-subtitle-02 font-semibold w-full">
            등록된 리뷰가 없어요
          </div>
        ) : (
          reviews.map(review => (
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
              showReplyButton={false}
            />
          ))
        )}
      </div>
    </section>
  );
}
