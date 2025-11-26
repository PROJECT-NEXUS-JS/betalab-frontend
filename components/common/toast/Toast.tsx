'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

export type ToastType = 'alert' | 'error';

interface ToastProps {
  type?: ToastType;
  message: string;
  icon: ReactNode;
  className?: string;
}

export function Toast({ type = 'alert', message, icon, className }: ToastProps) {
  const isError = type === 'error';

  return (
    <div
      data-icon="true"
      data-style={type}
      className={clsx(
        'pl-3 pr-4 py-3 rounded inline-flex flex-col justify-start items-start gap-2.5 transition-all',
        !isError && 'bg-Primary-100 outline-1 outline-Primary-200',
        isError && 'bg-Error',
        className,
      )}
    >
      <div className="inline-flex justify-start items-center gap-2">
        <div className="w-5 h-5 flex justify-center items-center">{icon}</div>
        <div
          className={clsx(
            "font-['SUIT_Variable'] text-left whitespace-pre-wrap text-base font-bold leading-6",
            !isError ? 'text-[var(--color-Dark-Gray)]' : 'text-[var(--color-White)]',
          )}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
