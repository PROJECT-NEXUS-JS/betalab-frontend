import Chip from '@/components/common/atoms/Chip';
import { DropdownElementProps } from '@/components/common/atoms/DropdownElement';
import Dropdown from '@/components/common/molecules/Dropdown';
import Searchbar from '@/components/common/molecules/Searchbar';
import ArrowDown from '@/components/common/svg/ArrowDown';
import CategoryButtons from '@/components/home/molecules/CategoryButtons';
import HomeTitle from '@/components/home/molecules/HomeTitle';
import React from 'react';

const DROPDOWN_ELEMENTS: DropdownElementProps[] = [
  {
    onClick: () => {},
    children: <p className="text-caption-02 font-semibold">앱</p>,
  },
  {
    onClick: () => {},
    children: <p className="text-caption-02 font-semibold">웹</p>,
  },
  {
    onClick: () => {},
    children: <p className="text-caption-02 font-semibold">게임</p>,
  },
];

export default function HomeHeader() {
  return (
    <header className="w-full flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <HomeTitle />
        <div className="flex flex-row gap-2">
          <div className="relative group flex flex-col items-start">
            <Chip variant="secondary" size="lg">
              카테고리
            </Chip>
            <div className="absolute left-0 top-0 hidden group-hover:block">
              <div className="h-13" />
              <Dropdown elements={DROPDOWN_ELEMENTS} />
            </div>
          </div>
          <Searchbar />
        </div>
        <CategoryButtons className="mb-10 mt-5" />
      </div>
    </header>
  );
}
