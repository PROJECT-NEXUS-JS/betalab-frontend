import Breadcrumb from '../atoms/Breadcrumb';
import TabbarElement from '../atoms/TabbarElement';
import { POPULAR_CATEGORIES } from '@/app/category/popular/utils';

interface PopularHeaderProps {
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

export default function PopularHeader({ selectedCategory, onCategoryClick }: PopularHeaderProps) {
  return (
    <header className="flex w-full flex-col items-start justify-between gap-5">
      <div className="flex flex-col items-start gap-2">
        <Breadcrumb
          items={[
            { label: '홈', href: '/' },
            { label: '인기순위', href: '/category/popular' },
            { label: selectedCategory, href: `/category/popular?category=${selectedCategory}` },
          ]}
        />
        <h2 className="text-head text-Black font-bold">인기순위</h2>
      </div>
      <div className="w-full h-[1.5px] bg-Gray-100" />
      <div className="flex flex-wrap gap-x-15 gap-y-3 w-full">
        {POPULAR_CATEGORIES.map(category => (
          <TabbarElement
            key={category}
            onClick={() => onCategoryClick(category)}
            isActive={selectedCategory === category}
          >
            {category}
          </TabbarElement>
        ))}
      </div>
    </header>
  );
}
