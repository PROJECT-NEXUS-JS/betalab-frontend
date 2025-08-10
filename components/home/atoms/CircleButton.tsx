import { cn } from '@/lib/utils';
import React from 'react';

interface CircleButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function CircleButton({
  children,
  className,
  onClick,
  ...props
}: CircleButtonProps) {
  return (
    <button
      className={cn(
        'size-6 rounded-full cursor-pointer bg-White/60 flex items-center justify-center',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
