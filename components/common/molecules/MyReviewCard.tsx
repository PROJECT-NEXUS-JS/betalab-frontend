'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Star from '../svg/Star';
import { cn } from '@/lib/utils';
import { WrittenReviewItemType } from '@/hooks/review/dto/writtenReviews';
import { Pencil, Trash, Save, X } from 'lucide-react';
import { useDeleteReviewMutation } from '@/hooks/review/mutations/useDeleteReviewMutation';
import { useUpdateReviewMutation } from '@/hooks/review/mutations/useUpdateReviewMutation';

export interface MyReviewCardProps {
  review: WrittenReviewItemType;
  className?: string;
}

export default function MyReviewCard({ review, className }: MyReviewCardProps) {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(review.content);
  const [editRating, setEditRating] = useState(review.rating);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const deleteReviewMutation = useDeleteReviewMutation();
  const updateReviewMutation = useUpdateReviewMutation();

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
      const height = contentRef.current.scrollHeight;
      const maxHeight = lineHeight * 3;
      setShowMoreButton(height > maxHeight);
    }
  }, [review.content]);

  useEffect(() => {
    setEditRating(review.rating);
  }, [review.rating]);

  const handleDelete = async () => {
    try {
      await deleteReviewMutation.mutateAsync(review.reviewId);
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(review.content);
    setEditRating(review.rating);
  };

  const handleSave = async () => {
    try {
      const result = await updateReviewMutation.mutateAsync({
        reviewId: review.reviewId,
        data: {
          rating: editRating,
          content: editContent,
        },
      });

      if (result.success) {
        setIsEditing(false);
        setEditContent(result.data.content);
        setEditRating(result.data.rating);
      }
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(review.content);
    setEditRating(review.rating);
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-3 flex-col bg-White rounded-sm shadow-[0_0_10px_0_rgba(26,30,39,0.08)]',
        className,
      )}
    >
      <div className="gap-3 flex flex-row items-start">
        {review.postThumbnail ? (
          <Image alt="review thumbnail" src={review.postThumbnail} width={91} height={64} />
        ) : (
          <div className="w-[91px] h-[64px] bg-Gray-100" />
        )}
        <h2 className="text-body-01 text-semibold text-Black">{review.postTitle}</h2>
      </div>
      <div className="w-full h-[1.5px] bg-Gray-100" />
      <section className="flex-1 w-full justify-between items-start">
        <div className="flex-1 flex-col w-full">
          <div className="w-full flex-1 flex gap-3 justify-between items-center">
            <div className="flex h-6 items-center justify-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  width={24}
                  height={24}
                  fill={i < (isEditing ? editRating : review.rating)}
                  className={cn(
                    'inline-block',
                    isEditing
                      ? 'cursor-pointer hover:scale-110 transition-transform'
                      : 'cursor-default',
                    i < (isEditing ? editRating : review.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300',
                  )}
                  onClick={() => {
                    if (isEditing) {
                      setEditRating(i + 1);
                    }
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">{review.reviewCreatedAt}</p>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-row justify-between">
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
            }}
            className="text-sm text-Dark-Gray w-full border-none rounded resize-none focus:outline-none"
            rows={2}
            placeholder="리뷰 내용을 입력하세요"
          />
        ) : (
          <p
            ref={contentRef}
            className={cn('text-sm text-Dark-Gray max-w-[714px]', showMoreButton && 'line-clamp-3')}
          >
            {review.content}
          </p>
        )}
        <div className="flex flex-row gap-2 items-end">
          {isEditing ? (
            <>
              <button
                className="p-2.5 size-fit text-Gray-300 border-1 border-Gray-100 rounded-[4px] group hover:border-Dark-Gray hover:bg-gray-50"
                onClick={handleCancel}
              >
                <X className="size-4 text-Gray-500 group-hover:text-Dark-Gray" />
              </button>
              <button
                className="p-2.5 size-fit border-1 border-Gray-100 rounded-[4px] group hover:border-Primary-500 hover:bg-Primary-50"
                onClick={handleSave}
                disabled={updateReviewMutation.isPending}
              >
                <Save className="size-4 text-Gray-300 group-hover:text-Primary-500" />
              </button>
            </>
          ) : (
            <button
              className="p-2.5 size-fit border-1 group hover:border-Primary-500 hover:bg-Primary-50 border-Gray-100 rounded-[4px]"
              onClick={handleEdit}
            >
              <Pencil className="size-4 text-Gray-300 group-hover:text-Primary-500" />
            </button>
          )}
          <button
            className="p-2.5 size-fit border-1 border-Gray-100 rounded-[4px] group hover:border-red-500 hover:bg-red-50 transition-colors"
            onClick={handleDelete}
            disabled={deleteReviewMutation.isPending}
          >
            <Trash className="size-4 text-Gray-300 group-hover:text-red-500" />
          </button>
        </div>
      </section>
    </div>
  );
}
