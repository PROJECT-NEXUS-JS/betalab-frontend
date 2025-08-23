import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import SidebarSection from '../molecules/SidebarSection';
import SidebarItem from '../atoms/SidebarItem';
import { MY_PAGE_MENUS, MyPageMenuKey } from '../const';

interface SidebarProps {
  className?: string;
  postedCount: number;
  participatingCount: number;
  bookmarkedCount?: number;
  reviewCount?: number;
  onMenuClick: (menuKey: MyPageMenuKey) => void;
  activeTab?: string;
}

export default function Sidebar({
  className,
  postedCount,
  participatingCount,
  bookmarkedCount = 0,
  reviewCount = 0,
  onMenuClick,
  activeTab = '',
}: SidebarProps) {
  const handleItemClick = (itemKey: MyPageMenuKey) => {
    onMenuClick(itemKey);
  };

  const getCountValue = (countKey?: string) => {
    if (!countKey) return undefined;

    switch (countKey) {
      case 'postedCount':
        return postedCount;
      case 'participatingCount':
        return participatingCount;
      case 'bookmarkedCount':
        return bookmarkedCount;
      case 'reviewCount':
        return reviewCount;
      default:
        return undefined;
    }
  };

  return (
    <div className={cn('w-[258px]', className)}>
      {Object.entries(MY_PAGE_MENUS).map(([sectionKey, section]) => (
        <SidebarSection key={sectionKey} title={section.title}>
          {section.items.map(item => (
            <SidebarItem
              key={item.key}
              title={item.title}
              count={getCountValue(item.countKey)}
              isActive={activeTab === item.key}
              onClick={() => handleItemClick(item.key)}
            />
          ))}
        </SidebarSection>
      ))}
    </div>
  );
}
