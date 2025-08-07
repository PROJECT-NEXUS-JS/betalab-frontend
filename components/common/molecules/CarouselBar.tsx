import DotUnit from '@/components/common/atoms/DotUnit';

interface CarouselBarProps {
  activeIndex: number;
  total?: number;
}

export default function CarouselBar({ activeIndex, total = 10 }: CarouselBarProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <DotUnit key={i} isActive={i === activeIndex} />
      ))}
    </div>
  );
}
