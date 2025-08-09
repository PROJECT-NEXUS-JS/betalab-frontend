import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export interface DropdownElementProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function DropdownElement({ onClick, children, className }: DropdownElementProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'min-w-[92px] text-left h-fit p-2 text-Dark-Gray bg-White hover:bg-Gray-100',
        className,
      )}
    >
      {children}
    </button>
  );
}
