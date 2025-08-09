import { cn } from "@/lib/utils";
import CategoryButton from "@/components/common/atoms/CategoryButton";
import Link from "next/link";

interface CategoryButtonsProps {
  className?: string;
}

const CATEGORIES = [
  { name: "앱", path: "app" },
  { name: "웹", path: "web" },
  { name: "인기순위", path: "popular" },
  { name: "게임", path: "game" },
  { name: "마감 임박", path: "deadline" },
] as const;

export default function CategoryButtons({ className }: CategoryButtonsProps) {
  return (
    <div className={cn("flex gap-10", className)}>
      {CATEGORIES.map((category) => (
        <Link
          key={category.name}
          href={`/category?category=${category.path}`}
          passHref
        >
          <CategoryButton type={category.name} />
        </Link>
      ))}
    </div>
  );
}
