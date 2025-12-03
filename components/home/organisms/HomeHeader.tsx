'use client';

import Chip from '@/components/common/atoms/Chip';
import { DropdownElementProps } from '@/components/common/atoms/DropdownElement';
import Dropdown from '@/components/common/molecules/Dropdown';
import Searchbar from '@/components/common/molecules/Searchbar';
import CategoryButtons from '@/components/home/molecules/CategoryButtons';
import HomeTitle from '@/components/home/molecules/HomeTitle';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface HomeHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function HomeHeader({ className, ...props }: HomeHeaderProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('카테고리');

  const DROPDOWN_ELEMENTS: DropdownElementProps[] = [
    {
      onClick: () => {
        setSelectedCategory('전체');
      },
      children: <p className="text-caption-02 font-semibold">전체</p>,
    },
    {
      onClick: () => {
        setSelectedCategory('앱');
      },
      children: <p className="text-caption-02 font-semibold">앱</p>,
    },
    {
      onClick: () => {
        setSelectedCategory('웹');
      },
      children: <p className="text-caption-02 font-semibold">웹</p>,
    },
    {
      onClick: () => {
        setSelectedCategory('게임');
      },
      children: <p className="text-caption-02 font-semibold">게임</p>,
    },
  ];


  const handleSearch = (searchValue: string) => {
    if (isLoggedIn) {
      if (selectedCategory === '전체') {
        const params = new URLSearchParams();
        if (searchValue) {
          params.set('keyword', searchValue);
        }
        const queryString = params.toString();
        router.push(`/category/${queryString ? `?${queryString}` : ''}`);
      } else {
        const params = new URLSearchParams();
        if (selectedCategory) {
          params.set('category', selectedCategory);
        }
        if (searchValue) {
          params.set('keyword', searchValue);
        }
        const queryString = params.toString();
        router.push(`/category${queryString ? `?${queryString}` : ''}`);
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <header
      className={cn('w-full flex flex-col items-center justify-between', className)}
      {...props}
    >
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <HomeTitle />
        <div className="flex flex-row gap-2">
          <div className="relative group flex flex-col items-start">
            <Chip variant="secondary" size="lg" onClick={() => setSelectedCategory('')}>
              {selectedCategory === '전체' ? '카테고리' : selectedCategory}
            </Chip>
            <div className="absolute left-0 top-0 hidden group-hover:block">
              <div className="h-13" />
              <Dropdown elements={DROPDOWN_ELEMENTS} />
            </div>
          </div>
          <Searchbar onSearch={handleSearch} />
        </div>
        <CategoryButtons className="mb-10 mt-5" />
      </div>
    </header>
  );
}
