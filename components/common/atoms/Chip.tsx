import type { ReactNode } from 'react';

export interface ChipProps {
  variant: 'default' | 'primary' | 'secondary' | 'solid' | 'sub' | 'active' | 'disabled';
  size: 'xs' | 'sm' | 'md' | 'lg';
  children: ReactNode;
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
    xs: 'text-caption-02 px-[0.25rem] py-[0.281rem]',
    sm: 'text-caption-01 px-[0.75rem] py-[0.563rem]',
    md: 'text-caption-01 px-[1rem] py-[0.688rem]',
    lg: 'text-body-02 px-[1.25rem] py-[0.719rem]',
  };

  const baseClasses =
    'inline-flex items-center justify-center rounded-[2.5rem] w-fit h-fit font-semibold';
  const classes = `${baseClasses} ${THEME_COLOR_CLASSNAME[variant]} ${THEME_SIZE_CLASSNAME[size]}`;

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
