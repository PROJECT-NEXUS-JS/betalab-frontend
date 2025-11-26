import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import SidebarSection from '../molecules/SidebarSection';
import SidebarItem from '../atoms/SidebarItem';
import { MY_PAGE_MENUS, MyPageMenuKey } from '../const';

interface SidebarProps {
  className?: string;
  ongoingCount: number;
  postedCount: number;
  participatingCount: number;
  bookmarkedCount?: number;
  reviewCount?: number;
  onMenuClick: (menuKey: MyPageMenuKey) => void;
  activeTab?: string;
}

export default function Sidebar({
  className,
  ongoingCount = 0,
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
      case 'ongoingCount':
        return ongoingCount;
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
              onClick={() =>
                item.key === 'announcements'
                  ? window.open(
                      'https://lydian-tip-26b.notion.site/2500d9441db0808bbc9def67eaf49aff?source=copy_link',
                      '_blank',
                    )
                  : item.key === 'betalab-guide'
                    ? window.open(
                        'https://lydian-tip-26b.notion.site/24f0d9441db080c3980dfab18eee03e2?source=copy_link',
                        '_blank',
                      )
                    : handleItemClick(item.key)
              }
            />
          ))}
        </SidebarSection>
      ))}
    </div>
  );
}
