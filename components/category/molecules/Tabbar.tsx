'use client';

import { Suspense } from 'react';
import TabbarElement, { TabbarElementProps } from '@/components/category/atoms/TabbarElement';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/stores/categoryStore';
import { MAIN_CATEGORIES } from '@/app/category/const';
import { useRouter, useSearchParams } from 'next/navigation';

type MainCategory = (typeof MAIN_CATEGORIES)[number];

interface TabbarProps {
  tabs: TabbarElementProps[];
  className?: string;
}

function TabbarContent({ tabs, className }: TabbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mainCategory, setMainCategory } = useCategoryStore();

  const handleTabClick = (category: string) => {
    if (MAIN_CATEGORIES.includes(category as MainCategory)) {
      setMainCategory(category as MainCategory);

      const params = new URLSearchParams(searchParams.toString());
      params.set('category', category);
      // mainCategory가 변경되면 genre와 platform 파라미터 삭제
      params.delete('genre');
      params.delete('platform');

      router.push(`/category?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className={cn('flex flex-row items-center gap-10', className)}>
      {tabs.map(tab => (
        <TabbarElement
          key={tab.children as string}
          onClick={() => handleTabClick(tab.children as string)}
          isActive={mainCategory === tab.children}
        >
          {tab.children}
        </TabbarElement>
      ))}
    </div>
  );
}

export default function Tabbar({ tabs, className }: TabbarProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabbarContent tabs={tabs} className={className} />
    </Suspense>
  );
}
