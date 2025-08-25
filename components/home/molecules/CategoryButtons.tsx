import { cn } from '@/lib/utils';
import CategoryButton from '@/components/common/atoms/CategoryButton';
import Link from 'next/link';

interface CategoryButtonsProps {
  className?: string;
}

const CATEGORIES = ['앱', '웹', '게임', '인기순위', '마감임박'] as const;

export default function CategoryButtons({ className }: CategoryButtonsProps) {
  return (
    <div className={cn('flex gap-10', className)}>
      {CATEGORIES.map(category => (
        <Link
          key={category}
          href={category === '인기순위' ? '/category/popular' : `/category?category=${category}`}
          passHref
        >
          <CategoryButton type={category} />
        </Link>
      ))}
    </div>
  );
}
