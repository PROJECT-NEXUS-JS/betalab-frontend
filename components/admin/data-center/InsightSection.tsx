import { cn } from '@/lib/utils';
import Image from 'next/image';
import Chip from '@/components/common/atoms/Chip';

interface InsightSectionProps {
  keywords: Record<string, number>;
}

const InsightSection = ({ keywords }: InsightSectionProps) => {
  return (
    <section className="shadow-card p-[14px] flex flex-col gap-y-[14px]">
      <h2 className="text-Dark-Gray text-body-01 font-semibold">개선 제안 및 인사이트</h2>
      <p className="text-body-01 font-semibold text-Light-Gray">주요 키워드를 분석했어요!</p>
      <div className='flex flex-wrap gap-[14px]'>
        {Object.entries(keywords).map(([keyword, count]) => (
          <Chip key={keyword} showArrowIcon={false}>
            {`${keyword} (${count})`}
          </Chip>
        ))}
      </div>
    </section>
  );
};

export default InsightSection;
