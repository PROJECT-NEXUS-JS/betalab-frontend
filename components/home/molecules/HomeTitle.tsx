import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface HomeTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function HomeTitle({ className, ...props }: HomeTitleProps) {
  return (
    <div
      className={cn('pt-9 pb-7 w-[432px] flex justify-items-center relative', className)}
      {...props}
    >
      <h1 className="w-full text-center z-50 text-head font-bold text-Black">
        세상을 먼저 경험할 기회
      </h1>
      <Image
        src={'/images/home/blue-article.png'}
        alt="blue article"
        className="absolute top-0 left-0 w-[105px] h-[80px]"
        width={105}
        height={80}
      />
      <Image
        src={'/images/home/green-article.png'}
        alt="green article"
        className="absolute bottom-0 right-1 w-[62px] h-[52px]"
        width={62}
        height={52}
      />
    </div>
  );
}
