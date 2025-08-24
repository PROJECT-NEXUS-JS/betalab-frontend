import React from 'react';
import { cn } from '@/lib/utils';

interface TestCardProps {
  postedCount: number;
  participatingCount: number;
  className?: string;
}

export default function TestCard({ postedCount, participatingCount, className }: TestCardProps) {
  return (
    <div
      className={cn(
        'flex flex-row gap-[37px] justify-center py-5 bg-White border-Gray-100 border-t-[1.5px] border-b-[1.5px]',
        className,
      )}
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="text-caption-01 font-medium text-Dark-Gray">내가 올린 테스트</div>
        <div className="text-body-02 font-semibold text-Black">
          {postedCount === 0 ? '-' : postedCount}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <div className="text-caption-01 font-medium text-Dark-Gray">참여중인 테스트</div>
        <div className="text-body-02 font-semibold text-Black">
          {participatingCount === 0 ? '-' : participatingCount}
        </div>
      </div>
    </div>
  );
}
