import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  title: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function SidebarItem({
  title,
  count,
  isActive = false,
  onClick,
  className,
}: SidebarItemProps) {
  return (
    <div
      className={cn(
        'flex items-start py-1 justify-between cursor-pointer transition-colors',
        isActive ? 'bg-Primary text-White' : 'text-Gray-300 hover:bg-Gray-50 hover:text-Dark-Gray',
        className,
      )}
      onClick={onClick}
    >
      <span
        className={cn('text-body-01 font-medium', isActive ? 'text-Primary-500' : 'text-Dark-Gray')}
      >
        {title}
      </span>
    </div>
  );
}
