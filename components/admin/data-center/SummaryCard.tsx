import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SummaryCardProps {
  title: string;
  value: string | number;
  changeRate: number;
  subTextNode: React.ReactNode;
}

const SummaryCard = ({ title, value, changeRate, subTextNode }: SummaryCardProps) => {
  // 증감률에 따른 색상 및 아이콘 결정
  const isPositive = changeRate > 0;
  const isNegative = changeRate < 0;

  const rateColor = isPositive ? 'text-Green' : isNegative ? 'text-Red' : 'text-Dark-Gray';

  return (
    <div className="flex-1 gap-y-3 flex flex-col bg-white shadow-card p-[14px] rounded-sm">
      {/* 타이틀 */}
      <h3 className="text-body-02 font-medium text-Dark-Gray">{title}</h3>

      {/* 메인 값과 증감률 */}
      <div className="flex items-end gap-1">
        <span className="text-subtitle-01 text-black font-semibold">{value}</span>

        {/* 증감률 표시 */}
        <div className="flex items-center gap-x-1">
          {isPositive && (
            <Image src="/icons/admin-icon/positive-arrow.svg" alt="download" width={24} height={24} />
          )}
          {isNegative && (
            <Image src="/icons/admin-icon/negative-arrow.svg" alt="download" width={24} height={24} />
          )}
          <p className={cn('text-caption-01 font-medium', rateColor)}>{Math.abs(changeRate)}%</p>
        </div>
      </div>

      {/* 하단 서브 텍스트 */}
      <div className="text-caption-01 text-Light-Gray font-medium">{subTextNode}</div>
    </div>
  );
};

export default SummaryCard;
