import { cn } from '@/lib/utils';

export interface SidebarBtnProps {
  state: 'active' | 'default';
  onClick: () => void;
  children?: React.ReactNode;
}

export default function SidebarBtn({ state, onClick, children }: SidebarBtnProps) {
  return (
    <button
      className={cn(
        'w-[258px] h-10 flex items-center px-4 py-1 rounded-sm font-bold text-base',
        THEME_STATE[state],
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const THEME_STATE = {
  active: 'bg-Primary-100 text-Primary-500',
  default: 'bg-White text-Dark-Gray hover:bg-Primary-100',
};
