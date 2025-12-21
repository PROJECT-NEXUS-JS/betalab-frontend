'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import UserProfile from '@/components/common/svg/UserProfile';
import Star from '@/components/common/svg/Star';
import Button from '@/components/common/atoms/Button';
import ReviewReplySection from './ReviewReplySection';

interface ReviewDetail {
  id: number;
  content: string;
  author: {
    name: string;
    imageUrl: string | undefined;
  };
  rating: number;
  date: Date | string;
}

interface ReviewDetailSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: ReviewDetail | null;
  replyContent?: string | null;
  replyDate?: string | null;
  onReplySubmit: (content: string) => void;
  onReplyEdit?: (content: string) => void;
  onReplyDelete?: () => void;
}

export default function ReviewDetailSidebar({
  open,
  onOpenChange,
  review,
  replyContent,
  replyDate,
  onReplySubmit,
  onReplyEdit,
  onReplyDelete,
}: ReviewDetailSidebarProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  if (!review) return null;

  const dateString =
    typeof review.date === 'string'
      ? new Date(review.date)
          .toLocaleDateString('ko-KR')
          .replace(/\./g, '/')
          .replace(/\s/g, '')
          .slice(0, -1)
      : review.date.toLocaleDateString('ko-KR').replace(/\./g, '/').replace(/\s/g, '').slice(0, -1);

  const handleReplyClick = () => {
    setIsReplying(true);
    setReplyText('');
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onReplySubmit(replyText.trim());
    setIsReplying(false);
    setReplyText('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[640px] p-5 flex flex-col justify-between items-center overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">리뷰 상세</SheetTitle>
        </SheetHeader>
        <div className="w-full bg-white flex flex-col justify-start items-center gap-5 overflow-hidden flex-1">
          <div className="w-40 flex flex-col justify-start items-center gap-4">
            <div className="w-14 h-14 relative">
              {review.author.imageUrl ? (
                <Image
                  className="rounded-full"
                  src={review.author.imageUrl}
                  alt={review.author.name}
                  width={56}
                  height={56}
                  onError={e => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <UserProfile className="w-14 h-14" />
              )}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  width={24}
                  height={24}
                  fill={i < Math.ceil(review.rating)}
                  className={`inline-block ${
                    i < Math.ceil(review.rating) ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <div className="w-20 flex flex-col justify-start items-center gap-1">
              <div className="text-center text-sm font-normal text-gray-600">
                {review.author.name}
              </div>
              <div className="text-sm font-normal text-gray-400">{dateString}</div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-center items-start gap-2.5 overflow-hidden">
            <div className="flex-1 inline-flex flex-col justify-start items-end gap-2.5">
              <div className="self-stretch max-h-36 overflow-y-auto">
                <div className="text-base font-medium text-gray-900 leading-6 whitespace-pre-wrap">
                  {review.content}
                </div>
              </div>
              <Button
                State="Text btn"
                Size="lg"
                onClick={() => {}}
                label="더보기"
                className="px-1"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-end items-center gap-10">
          {!replyContent && !isReplying ? (
            <div className="self-stretch inline-flex justify-start items-end gap-2">
              <Button
                State="Sub"
                Size="xxl"
                onClick={handleReplyClick}
                label="답변하기"
                className="flex-1 h-12 px-7"
              />
            </div>
          ) : (
            <div className="self-stretch flex flex-col" style={{ gap: '40px' }}>
              <ReviewReplySection
                replyContent={replyContent}
                replyDate={replyDate}
                isEditing={isReplying}
                replyText={replyText}
                onReplyTextChange={setReplyText}
                onReplySubmit={content => {
                  onReplySubmit(content);
                  setIsReplying(false);
                }}
                onReplyEdit={() => {
                  setIsReplying(true);
                  setReplyText(replyContent || '');
                }}
                onReplyDelete={() => {
                  setIsReplying(false);
                  setReplyText('');
                  onReplyDelete?.();
                }}
              />
              {isReplying && (
                <div className="w-[580px]">
                  <Button
                    State={replyText.trim() ? 'Primary' : 'Disabled'}
                    Size="xxl"
                    onClick={
                      replyText.trim()
                        ? replyContent
                          ? async () => {
                              await onReplyEdit?.(replyText.trim());
                              setIsReplying(false);
                            }
                          : () => {
                              handleReplySubmit();
                            }
                        : undefined
                    }
                    label={replyContent ? '답변 수정하기' : '답변 보내기'}
                    className="w-full h-12 px-7"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
