'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Toast } from './Toast';

export type IconName = 'smile' | 'check' | 'siren' | 'timer' | 'bye' | 'red' | 'blue';
export type ToastKind = 'alert' | 'error';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

type ToastItem = {
  id: string;
  type: ToastKind;
  message: string;
  iconName: IconName;
  duration?: number;
};

const ICONS: Record<IconName, string> = {
  smile: '/icons/toast-icon/smile.svg',
  check: '/icons/toast-icon/check.svg',
  siren: '/icons/toast-icon/siren.svg',
  timer: '/icons/toast-icon/timer.svg',
  bye: '/icons/toast-icon/bye.svg',
  red: '/icons/toast-icon/red.svg',
  blue: '/icons/toast-icon/blue.svg',
};

export function showToast(payload: Omit<ToastItem, 'id'>) {
  if (typeof window === 'undefined') return;
  const e = new CustomEvent('app:toast', { detail: payload });
  window.dispatchEvent(e);
}

export function ToastHost({
  position = 'top-right',
  max = 5,
}: {
  position?: ToastPosition;
  max?: number;
}) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/prepare') {
      return;
    }

    function onToast(e: Event) {
      const { detail } = e as CustomEvent<Omit<ToastItem, 'id'>>;

      // 같은 메시지는 한번만 뜨게 함
      setItems(prev => {
        const isDuplicate = prev.some(
          item => item.message === detail.message && item.type === detail.type,
        );
        if (isDuplicate) {
          return prev;
        }

        const id = crypto.randomUUID();
        const newItem = { id, ...detail };
        const d = detail.duration ?? 3500;
        window.setTimeout(() => {
          setItems(current => current.filter(t => t.id !== id));
        }, d);

        return [newItem, ...prev].slice(0, max);
      });
    }
    window.addEventListener('app:toast', onToast as EventListener);
    return () => window.removeEventListener('app:toast', onToast as EventListener);
  }, [max, pathname]);

  const pos = useMemo(
    () =>
      ({
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      })[position],
    [position],
  );

  if (pathname === '/prepare') {
    return null;
  }

  return (
    <div
      className={clsx(
        'pointer-events-none fixed z-[9999] flex flex-col gap-2 w-[min(92vw,420px)]',
        pos,
      )}
    >
      {items.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <Toast
            type={t.type}
            message={t.message}
            icon={<img src={ICONS[t.iconName]} alt={t.iconName} width={20} height={20} />}
          />
        </div>
      ))}
    </div>
  );
}
