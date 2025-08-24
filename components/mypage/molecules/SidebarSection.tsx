import React from 'react';
import { cn } from '@/lib/utils';
import SidebarItem from '../atoms/SidebarItem';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={cn('mb-5 flex flex-col gap-1', className)}>
      <h2 className="text-subtitle-02 font-semibold text-Black py-1">{title}</h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
