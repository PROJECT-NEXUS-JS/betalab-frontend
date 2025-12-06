import { cn } from '@/lib/utils';

interface EmptyCardProps {
  className?: string;
}

/** 데이터가 없을 때 표시할 안내 컴포넌트 */
const EmptyData = ({ className }: EmptyCardProps) => {
  return (
    <div
      className={cn(
        'w-full h-full text-Gray-300 text-body-02 flex items-center justify-center text-body-01',
        className,
      )}
    >
      데이터가 없습니다.
    </div>
  );
};

export default EmptyData;
