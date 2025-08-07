export interface ButtonProps {
  State: 'Default' | 'Primary' | 'Sub' | 'Solid' | 'Disabled' | 'Secondary' | 'Focused';
  Size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  onClick: () => void;
  label: string;
}

export default function Button({
  State = 'Default',
  Size = 'md',
  onClick = () => {},
  label = 'Click Me',
}: ButtonProps) {
  const THEME_COLOR_CLASSNAME = {
    Default: 'bg-Gray-100 text-Dark-Gray',
    Primary: 'bg-Primary-500 text-White',
    Sub: 'bg-Primary-200 text-Primary-500',
    Solid: 'bg-White text-Dark-Gray border-[1px] border-Gray-100',
    Disabled: 'bg-Gray-100 text-Light-Gray cursor-not-allowed',
    Secondary: 'bg-Black text-White',
    Focused: 'bg-White text-Primary-500 border-[1px] border-Primary-500 ',
  };
  const THEME_SIZE_CLASSNAME = {
    xs: 'text-[10px] px-2 h-8',
    sm: 'text-[10px] px-3 h-9',
    md: 'text-[10px] px-4 h-10',
    lg: 'text-sm px-5 h-11',
    xl: 'text-sm px-6 h-12',
    xxl: 'text-sm px-7 h-13',
    xxxl: 'text-sm px-8 h-14',
  };

  return (
    <button
      onClick={onClick}
      className={`${THEME_COLOR_CLASSNAME[State]} ${THEME_SIZE_CLASSNAME[Size]}`}
    >
      {label}
    </button>
  );
}
