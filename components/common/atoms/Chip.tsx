'use client';

import { useState } from 'react';
import ArrowDown from '@/components/common/svg/ArrowDown';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onToggle'> {
  variant?: 'default' | 'primary' | 'secondary' | 'solid' | 'sub' | 'active' | 'disabled';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children?: ReactNode;
  value?: string;
  defaultActive?: boolean;
  active?: boolean; // 부모에서 강제로 활성 상태를 지정하는 prop
  showArrowIcon?: boolean;
  onToggleActive?: (active: boolean) => void;
}

export default function Chip({
  variant = 'default',
  size = 'md',
  children,
  value,
  defaultActive = false,
  active = false,
  showArrowIcon = true,
  onToggleActive,
  onClick,
  ...props
}: ChipProps) {
  // 내부 상태 (단독으로 쓸 때 필요)
  const [internalActive, setInternalActive] = useState(defaultActive);
  // ctive props가 있으면 그것을 따르고, 없으면 내부 상태를 따름
  const isActive = active !== undefined ? active : internalActive;

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // active props를 안 쓸 때만 내부 토글 동작
    if (active === undefined) {
      const next = !internalActive;
      setInternalActive(next);
      onToggleActive?.(next);
    }

    // 부모의 onClick 실행
    onClick?.(e);
  };

  return (
    <button
      type="button"
      className={cn(
        'items-center relative justify-center group rounded-[2.5rem] flex flex-row w-fit font-semibold',
        THEME_COLOR_CLASSNAME[isActive ? 'active' : variant],
        THEME_SIZE_CLASSNAME[size],
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      {showArrowIcon && (
        <ArrowDown className="size-6 text-White group-hover:rotate-180 duration-200" />
      )}
    </button>
  );
}
