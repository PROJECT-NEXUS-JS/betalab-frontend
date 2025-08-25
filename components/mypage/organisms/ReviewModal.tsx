'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/common/atoms/Button';
import { Star } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  postData: {
    id: number;
    title: string;
    thumbnailUrl?: string;
    startDate?: string;
    endDate?: string;
  };
  onSubmit: (rating: number, content: string) => void;
  isLoading?: boolean;
}

export default function ReviewModal({
  isOpen,
  onClose,
  postData,
  onSubmit,
  isLoading = false,
}: ReviewModalProps) {
  console.log(postData);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('리뷰 내용을 작성해주세요.');
      return;
    }
    onSubmit(rating, content.trim());
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white flex flex-col gap-5 px-10 py-5">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h2 className="text-subtitle-01 font-semibold text-Black">리뷰 작성하기</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex flex-row gap-5">
          <div className="w-[256px] h-[160px] flex-shrink-0 shadow-sm">
            {postData.thumbnailUrl ? (
              <img
                src={postData.thumbnailUrl}
                alt="썸네일"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300"></div>
            )}
          </div>
          <div className="flex flex-col justify-end">
            <h3 className="text-subtitle-02 font-semibold text-Black line-clamp-2">
              {postData.title}
            </h3>
            <p className="text-body-01 font-semibold text-Light-Gray">
              {postData.startDate && postData.endDate
                ? `${formatDate(postData.startDate).replace(/\./g, '/')} ~ ${formatDate(postData.endDate).replace(/\./g, '/')}`
                : '2024/01/24'}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-body-01 font-semibold text-Black">테스트는 어떠셨나요?</h3>
          <div className="flex gap-1 justify-start">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  size={32}
                  className={`${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-Gray-200'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="h-[1.5px] bg-Gray-100" />

        {/* 리뷰 내용 */}
        <div className="flex flex-col gap-1">
          <h3 className="text-body-01 font-semibold text-Black">내 리뷰</h3>
          <div className="relative">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="테스트하면서 느낀 점을 자유롭게 작성해주세요."
              className="w-full h-48 p-4 border border-gray-300 rounded-sm resize-none focus:outline-none focus:ring-1 text-body-02 font-semibold placeholder-gray-400"
              maxLength={500}
            />
          </div>
          <div className="w-full text-right text-xs text-gray-400">{content.length}/500</div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-center">
          <Button
            label="작성하기"
            Size="lg"
            State={
              isLoading || rating === 0 || !content.trim()
                ? 'Disabled'
                : rating > 0 && content.trim()
                  ? 'Primary'
                  : 'Default'
            }
            onClick={isLoading || rating === 0 || !content.trim() ? undefined : handleSubmit}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
