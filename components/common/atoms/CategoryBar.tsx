import { cn } from '@/lib/utils';

export interface CategoryBarProps {
  state: 'active' | 'deactive';
  size: 'sm' | 'md';
  onClick: () => void;
  children?: React.ReactNode;
}

export default function CategoryBar({ state, size, onClick, children }: CategoryBarProps) {
  return (
    <div className={cn(THEME[state], SIZE[size], 'font-bold text-center pb-1')} onClick={onClick}>
      {children}
    </div>
  );
}

const THEME = {
  active: 'text-Primary-500 border-b-[2px] border-Primary-500',
  deactive: 'text-Dark-Gray',
};

const SIZE = {
  sm: 'text-sm w-max',
  md: 'text-base w-[427px]',
};
