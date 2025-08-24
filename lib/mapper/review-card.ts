import { ReviewCardProps } from '@/components/common/molecules/ReviewCard';
import { ReviewDataModel } from '@/hooks/review/dto';

export const transformToReviewCardProps = (
  data: ReviewDataModel,
): ReviewCardProps & { id: number } => ({
  id: data.id,
  content: data.content,
  author: {
    name: data.writer.nickname,
    imageUrl: data.writer.profileUrl,
  },
  rating: data.rating,
  date: data.createdAt,
  state: 'default',
});
