import React from 'react';
import { cn } from '@/lib/utils';
import CircleButton from '../atoms/CircleButton';
import ArrowLeft from '@/components/common/svg/ArrowLeft';
import ArrowRight from '@/components/common/svg/ArrowRight';

interface CardScrollProps {
  children: React.ReactNode;
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CardScroll({
  children,
  className,
  currentPage,
  totalPages,
  onPageChange,
}: CardScrollProps) {
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      className={cn(
        'relative group/scroll flex flex-row gap-10 items-start justify-start w-fit',
        className,
      )}
    >
      {currentPage > 0 && (
        <CircleButton
          className="absolute z-50 left-0 top-1/2 -translate-y-1/2 group-hover/scroll:block hidden"
          onClick={handlePrevPage}
        >
          <ArrowLeft className="size-6 text-Gray-300" />
        </CircleButton>
      )}
      {children}
      {currentPage < totalPages - 1 && (
        <CircleButton
          className="absolute z-50 right-0 top-1/2 -translate-y-1/2 group-hover/scroll:block hidden"
          onClick={handleNextPage}
        >
          <ArrowRight className="size-6" />
        </CircleButton>
      )}
    </div>
  );
}
