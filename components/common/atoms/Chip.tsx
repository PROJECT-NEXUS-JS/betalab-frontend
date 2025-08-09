import ArrowDown from '@/components/common/svg/ArrowDown';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface ChipProps {
  variant: 'default' | 'primary' | 'secondary' | 'solid' | 'sub' | 'active' | 'disabled';
  size: 'xs' | 'sm' | 'md' | 'lg';
  children?: ReactNode;
  value?: string;
  onClick?: () => void;
}

export default function Chip({
  variant = 'default',
  size = 'md',
  children,
  value,
  onClick,
  ...props
}: ChipProps) {
  const THEME_COLOR_CLASSNAME = {
    default: 'bg-Gray-100 text-Dark-Gray',
    primary: 'bg-Primary-500 text-White',
    secondary: 'bg-Black text-White',
    solid: 'bg-White border border-Gray-100 text-Dark-Gray',
    sub: 'bg-Primary-200 text-Primary-500',
    active: 'bg-Primary-200 border border-Primary-500 text-Primary-500',
    disabled: 'bg-Gray-100 text-Light-Gray cursor-not-allowed',
  };

  const THEME_SIZE_CLASSNAME = {
    xs: 'text-caption-02 px-[4px] h-[24px]',
    sm: 'text-caption-01 px-[12px] h-[36px]',
    md: 'text-caption-01 px-[16px] h-[40px]',
    lg: 'text-body-02 px-[20px] h-[44px]',
  };

  return (
    <button
      type="button"
      className={cn(
        'items-center relative justify-center group rounded-[2.5rem] flex flex-row w-fit font-semibold',
        THEME_COLOR_CLASSNAME[variant],
        THEME_SIZE_CLASSNAME[size],
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      <ArrowDown className="size-6 text-White group-hover:rotate-180 duration-200" />
    </button>
  );
}
