import { cn } from '@/lib/utils';
import React from 'react';

export interface SidetabElementProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export default function SidetabElement({
  children,
  className,
  isActive,
  ...props
}: SidetabElementProps) {
  return (
    <button
      className={cn(
        'text-Dark-Gray cursor-pointer w-full text-left text-body-01 font-medium transition-colors',
        isActive && 'text-Black font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
