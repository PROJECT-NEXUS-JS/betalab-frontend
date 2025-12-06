import Image from 'next/image';

import { cn } from '@/lib/utils';

import { InsightItem } from '@/hooks/data-center/dto/dataCenterDetail';

import FeedbackCard from './FeedbackCard';

interface FeedbackSectionProps {
  positiveFeedbacks: InsightItem[];
  improvementSuggestions: InsightItem[];
}

const FeedbackSection = ({ positiveFeedbacks, improvementSuggestions }: FeedbackSectionProps) => {
  return (
    <section className="flex gap-x-[14px]">
      <FeedbackCard variant="positive" items={positiveFeedbacks} />
      <FeedbackCard variant="improvement" items={improvementSuggestions} />
    </section>
  );
};

export default FeedbackSection;
