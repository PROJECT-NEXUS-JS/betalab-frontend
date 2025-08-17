'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type CardProps = {
  title: string;
  items: string[];
  icon: ReactNode;
  className?: string;
};

export default function Card({ title, items, icon, className }: CardProps) {
  return (
    <div className={clsx('flex gap-3 rounded-lg bg-Gray-100 p-6', className)}>
      <div className="shrink-0 flex items-start">{icon}</div>
      <div className="flex flex-col">
        <h3 className="text-body-02 font-semibold mb-2 text-Dark-Gray">{title}</h3>
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="text-caption-02 font-medium text-Dark-Gray">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
