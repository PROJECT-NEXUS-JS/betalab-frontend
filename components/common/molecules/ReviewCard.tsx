'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import UserProfile from '../svg/UserProfile';
import Button from '../atoms/Button';
import Star from '../svg/Star';
import { cn } from '@/lib/utils';

export interface ReviewCardProps {
  content: string;
  author: {
    name: string;
    imageUrl: string | undefined;
  };
  rating: number;
  date: Date;
  state: 'default' | 'stroke';
  showReplyButton?: boolean;
  replyOnClick?: () => void;
  replyContent?: string | null;
  isReplied?: boolean;
  onReplySubmit?: (content: string) => void;
  reviewId?: number;
  onClick?: () => void;
  reply?: {
    content: string;
  } | null;
}

export default function ReviewCard({
  content,
  author,
  rating,
  date,
  state = 'default',
  showReplyButton = false,
  replyOnClick = () => {},
  replyContent,
  isReplied = false,
  onReplySubmit,
  reviewId,
  onClick,
  reply,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const contentRef = useRef<HTMLParagraphElement>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
      const height = contentRef.current.scrollHeight;
      const maxHeight = lineHeight * 3;
      setShowMoreButton(height > maxHeight);
    }
  }, [content]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReplyClick = () => {
    if (isReplied) return;
    setIsReplying(true);
    setTimeout(() => {
      replyTextareaRef.current?.focus();
    }, 0);
  };

  const handleReplySubmit = () => {
    if (!replyText.trim() || !onReplySubmit) return;
    onReplySubmit(replyText.trim());
    setReplyText('');
    setIsReplying(false);
  };

  const handleReplyCancel = () => {
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div
      className={cn(
        'flex  gap-2 p-3 bg-White rounded-sm shadow-[0_0_10px_0_rgba(26,30,39,0.08)]',
        state === 'default' ? 'w-[854px]' : 'w-[436px]',
        onClick && 'cursor-pointer hover:shadow-[0_0_15px_0_rgba(26,30,39,0.12)] transition-shadow',
      )}
      onClick={onClick}
    >
      <div className="flex items-start">
        {author.imageUrl ? (
          <Image
            className="rounded-full"
            src={author.imageUrl}
            alt={author.name}
            width={24}
            height={24}
            onError={e => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none'; // 이미지 에러 시 숨김 처리 가능
            }}
          />
        ) : (
          <UserProfile className="w-6 h-6" />
        )}
      </div>
      <div className="flex-1 w-full flex-col gap-1 items-start">
        <section className="flex w-full justify-between items-start gap-2">
          <div className="flex-1 flex-col w-full">
            <div className="w-full flex justify-between items-center">
              <div className="flex h-6 items-center justify-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    width={24}
                    height={24}
                    fill={i < Math.ceil(rating)}
                    className={cn(
                      'inline-block',
                      i < Math.ceil(rating) ? 'text-yellow-400' : 'text-gray-300',
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 font-bold">
                {typeof date === 'string'
                  ? new Date(date)
                      .toLocaleDateString('ko-KR')
                      .replace(/\./g, '/')
                      .replace(/\s/g, '')
                      .slice(0, -1)
                  : date
                      .toLocaleDateString('ko-KR')
                      .replace(/\./g, '/')
                      .replace(/\s/g, '')
                      .slice(0, -1)}
              </p>
            </div>
            <h4 className="flex text-xs font-bold text-Light-Gray">{author.name}</h4>
          </div>
          {showReplyButton && (
            <>
              {isReplied ? (
                <Button State="Disabled" Size="lg" onClick={onClick} label="답변완료" />
              ) : (
                <Button State="Sub" Size="lg" onClick={onClick} label="답변하기" />
              )}
            </>
          )}
        </section>
        <section>
          <p
            ref={contentRef}
            className={cn(
              'text-sm text-Dark-Gray',
              !isExpanded && showMoreButton && 'line-clamp-3',
            )}
          >
            {content}
          </p>
        </section>
        {showMoreButton && (
          <section className="w-full flex justify-end">
            <Button
              State="Text btn"
              Size="sm"
              onClick={toggleExpanded}
              label={isExpanded ? '접기' : '더보기'}
            />
          </section>
        )}
        {reply && (
          <div
            className="self-stretch inline-flex justify-start items-start gap-2"
            style={{ marginTop: '12px' }}
          >
            <div
              data-size="lg"
              data-style="corner down"
              className="w-6 h-6 relative overflow-hidden flex items-center justify-center"
            >
              <Image
                src="/icons/comment.svg"
                alt="답변"
                width={24}
                height={24}
                className="text-blue-600"
              />
            </div>
            <div className="inline-flex flex-col justify-center items-start gap-1">
              <div className="text-blue-600 text-sm font-medium leading-5">답변</div>
              <div className="text-gray-600 text-sm font-medium leading-5">{reply.content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
