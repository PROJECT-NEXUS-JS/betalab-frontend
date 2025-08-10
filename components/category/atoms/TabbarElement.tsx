import { cn } from '@/lib/utils';
import React from 'react';

export interface TabbarElementProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export default function TabbarElement({
  children,
  onClick,
  isActive,
  ...props
}: TabbarElementProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={cn(
        'flex text-Dark-Gray cursor-pointer items-center  justify-start text-body-01 font-semibold transition-colors',
        isActive && 'text-Purple-500',
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
