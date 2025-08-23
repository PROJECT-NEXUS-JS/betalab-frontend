import ArrowRight from '@/components/common/svg/ArrowRight';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <div className={cn('flex flex-row gap-1', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-1 text-body-01 text-Gray-200 font-semibold"
        >
          <a href={item.href} className=" hover:text-Gray-400 transition-colors">
            {item.label}
          </a>
          {index < items.length - 1 && <span>{'\>'}</span>}
        </div>
      ))}
    </div>
  );
}
