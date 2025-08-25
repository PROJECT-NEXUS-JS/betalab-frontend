'use client';

import { cn } from '@/lib/utils';

interface ConditionCardProps {
  title: string;
  checked: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function ConditionCard({
  title,
  checked,
  onToggle,
  children,
  className,
}: ConditionCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)]',
        checked && 'relative rounded-2xl bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)]',
        className,
      )}
    >
      <label className="flex items-center justify-between p-5 cursor-pointer select-none">
        <span className="text-body-01 font-semibold text-Black">{title}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="h-5 w-5 accent-[var(--color-Primary-500)]"
        />
      </label>
      {checked && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}
