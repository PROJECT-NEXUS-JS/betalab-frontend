import ArrowLeft from '@/components/common/svg/ArrowLeft';
import ArrowRight from '@/components/common/svg/ArrowRight';
import { cn } from '@/lib/utils';
import React from 'react';

interface PaginationElementsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export default function PaginationElements({
  children,
  className,
  isActive = false,
  ...props
}: PaginationElementsProps) {
  return (
    <button
      className={cn(
        'w-fit h-fit py-[3.5px] text-body-02 font-semibold text-Dark-Gray bg-White px-[9px] hover:bg-Gray-100 text-body-01 rounded-[2px]',
        isActive && 'text-White bg-Dark-Gray font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function PaginationArrowLeft({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn('w-fit h-fit text-Dark-Gray bg-White hover:text-Gray-300 ', className)}
      onClick={onClick}
    >
      <ArrowLeft className="size-6" />
    </button>
  );
}

export function PaginationArrowRight({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn('w-fit h-fit text-Dark-Gray bg-White hover:text-Gray-300 ', className)}
      onClick={onClick}
    >
      <ArrowRight className="size-6" />
    </button>
  );
}

export function PaginationEllipsis({ className }: { className?: string }) {
  return (
    <p className="text-body-02 font-semibold py-[3.5px] rounded-[2px] text-Dark-Gray px-[6.5px]">
      ...
    </p>
  );
}
