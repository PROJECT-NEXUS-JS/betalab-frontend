'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRecentReviewsQuery } from '@/hooks/dashboard/quries/useRecentReviewsQuery';
import UserProfile from '@/components/common/svg/UserProfile';
import Star from '@/components/common/svg/Star';
import Button from '@/components/common/atoms/Button';
import { useRouter } from 'next/navigation';

const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

function ReviewCardItem({
  review,
}: {
  review: {
    reviewId: number;
    reviewerNickname: string;
    reviewerProfileImageUrl: string | null;
    rating: number;
    content: string;
    createdAt: string;
  };
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
      const height = contentRef.current.scrollHeight;
      const maxHeight = lineHeight * 3;
      setShowMoreButton(height > maxHeight);
    }
  }, [review.content]);

  return (
    <div className="self-stretch p-3 bg-white rounded outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-start gap-3">
      <div className="flex-1 inline-flex flex-col justify-end items-end gap-2">
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div data-size="sm" className="w-6 h-6 relative">
            <div className="w-6 h-6 bg-sky-50 rounded-full overflow-hidden flex items-center justify-center">
              {review.reviewerProfileImageUrl ? (
                <Image
                  src={review.reviewerProfileImageUrl}
                  alt={review.reviewerNickname}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={e => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <UserProfile className="w-4 h-4 text-blue-400" />
              )}
            </div>
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start">
            <div className="self-stretch inline-flex justify-end items-start gap-2">
              <div className="flex-1 inline-flex flex-col justify-start items-start">
                <div className="self-stretch inline-flex justify-between items-start">
                  <div className="flex justify-start items-start gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        data-size="sm"
                        data-state={i < review.rating ? 'has value' : 'no value'}
                        className="w-6 h-6 relative"
                      >
                        <Star
                          width={24}
                          height={24}
                          fill={i < review.rating}
                          className={
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-400 outline-gray-400'
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="justify-end text-gray-400 text-xs font-bold font-['SUIT_Variable'] leading-4">
                    {formatReviewDate(review.createdAt)}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-1">
                  <div className="justify-end text-gray-400 text-xs font-bold font-['SUIT_Variable'] leading-4">
                    {review.reviewerNickname}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch max-h-16 pt-1 flex flex-col justify-start items-start">
              <div
                ref={contentRef}
                className={`self-stretch max-h-16 justify-start text-gray-600 text-sm font-medium font-['SUIT_Variable'] leading-5 ${
                  !isExpanded && showMoreButton ? 'line-clamp-3' : ''
                }`}
              >
                {review.content.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < review.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
            {showMoreButton && (
              <div
                data-chips="false"
                data-icon-r="false"
                data-size="sm"
                data-state="Text btn"
                className="self-stretch px-1 inline-flex justify-end items-center gap-2.5 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="justify-start text-gray-600 text-xs font-bold font-['SUIT_Variable'] underline leading-4">
                  {isExpanded ? '접기' : '더보기'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecentReviewsSection({ postId }: { postId: number }) {
  const router = useRouter();
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useRecentReviewsQuery(postId, { page: 0, size: 2 });

  const reviews = reviewsData?.data?.content || [];
  const isReviewsEmpty = reviews.length === 0;

  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      <div className="self-stretch justify-start text-gray-900 text-base font-bold font-['SUIT_Variable'] leading-6">
        최근 리뷰
      </div>

      {isReviewsLoading ? (
        <p className="text-sm text-Dark-Gray">로딩 중...</p>
      ) : isReviewsError ? (
        <p className="text-sm text-Dark-Gray">데이터를 불러오는 데 실패했습니다.</p>
      ) : isReviewsEmpty ? (
        <p className="text-sm text-Dark-Gray">최근 리뷰가 없습니다.</p>
      ) : (
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          {reviews.map(review => (
            <ReviewCardItem key={review.reviewId} review={review} />
          ))}
        </div>
      )}

      {!isReviewsEmpty && (
        <Button
          State="Solid"
          Size="sm"
          label="전체보기"
          onClick={() => router.push(`/admin/${postId}/review`)}
          className="self-stretch"
        />
      )}
    </div>
  );
}
