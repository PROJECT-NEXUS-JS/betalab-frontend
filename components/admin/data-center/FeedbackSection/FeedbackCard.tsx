import Image from 'next/image';

import { cn } from '@/lib/utils';

import { InsightItem } from '@/hooks/data-center/dto/dataCenterDetail';

interface FeedbackColumnProps {
  items: InsightItem[];
  variant: 'positive' | 'improvement';
}

const FeedbackColumn = ({ items, variant }: FeedbackColumnProps) => {
  const title = variant === 'positive' ? '좋았던 점' : '개선 제안';
  const iconSrc =
    variant === 'positive' ? '/icons/admin-icon/smile.svg' : '/icons/admin-icon/warning-light.svg';

  // variant에 따른 스타일 분기
  const styleClass = {
    positive: {
      titleColor: 'text-Primary-500',
      cardBg: 'bg-Primary-100',
      cardBorder: 'border-Primary-300',
    },
    improvement: {
      titleColor: 'text-Orange',
      cardBg: 'bg-Orange-bg',
      cardBorder: 'border-Orange',
    },
  };

  return (
    <div className="flex-1 flex flex-col gap-y-5 p-[14px] bg-white rounded-sm shadow-card">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-x-1">
        <Image src={iconSrc} alt={`${title} 아이콘`} width={24} height={24} />
        <h3 className={cn('font-medium text-body-02', styleClass[variant].titleColor)}>{title}</h3>
      </div>

      {/* 리스트 영역 */}
      <div className="flex flex-col gap-2.5">
        {items.length > 0 ? (
          items.map(item => (
            <div
              key={item.feedbackId}
              className={cn(
                'w-full p-[14px] rounded-sm border text-body-02 text-Dark-Gray font-medium',
                styleClass[variant].cardBg,
                styleClass[variant].cardBorder,
              )}
            >
              {item.fullContent}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-body-02 text-center py-4">데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackColumn;
