'use client';

import { Suspense } from 'react';
import TabbarElement, { TabbarElementProps } from '@/components/category/atoms/TabbarElement';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/stores/categoryStore';
import { MAIN_CATEGORIES } from '@/app/category/const';
import { useRouter, useSearchParams } from 'next/navigation';

type MainCategory = (typeof MAIN_CATEGORIES)[number];

interface TabbarProps {
  className?: string;
}

function TabbarContent({ className }: TabbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mainCategory, setMainCategory } = useCategoryStore();

  const handleTabClick = (category: string) => {
    if (MAIN_CATEGORIES.includes(category as MainCategory)) {
      setMainCategory(category as MainCategory);

      const params = new URLSearchParams(searchParams.toString());
      params.set('category', category);
      params.delete('genre');
      params.delete('platform');
      router.push(`/category?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className={cn('flex flex-row items-center gap-10', className)}>
      {MAIN_CATEGORIES.map(tab => (
        <TabbarElement
          key={tab as string}
          onClick={() => handleTabClick(tab as string)}
          isActive={mainCategory === tab}
        >
          {tab}
        </TabbarElement>
      ))}
    </div>
  );
}

export default function Tabbar({ className }: TabbarProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabbarContent className={className} />
    </Suspense>
  );
}
