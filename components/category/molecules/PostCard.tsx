import { UsersPostsListItemType } from '@/hooks/posts/dto/postList';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import BookMark from '@/components/common/svg/BookMark';
import Tag from '@/components/common/atoms/Tag';
import { Skeleton } from '@/components/ui/skeleton';
import RankingArticle from '@/components/common/svg/RankingArticle';

interface PostCardProps {
  className?: string;
  post: UsersPostsListItemType;
  ranking?: number;
}

export default function PostCard({ post, className, ranking }: PostCardProps) {
  const mainCategoryNames = post.mainCategories.map(category => category.name);
  const platformCategoryNames = post.platformCategories.map(category => category.name);

  const allCategoryNames = [...mainCategoryNames, ...platformCategoryNames];
  const categoryText = allCategoryNames.join('  ·  ');

  const calculateDday = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dday = calculateDday(post.schedule?.recruitmentDeadline || '');
  const isTodayDeadline = dday === 0;

  const getRewardTagStyle = (rewardType: string): 'orange' | 'black' => {
    switch (rewardType) {
      case 'CASH':
      case 'GIFT_CARD':
      case 'PRODUCT':
        return 'orange';
      case 'NONE':
      default:
        return 'black';
    }
  };

  return (
    <div
      className={cn(
        'relative cursor-pointer bg-white min-w-[234px] group rounded-sm px-3 py-[14.5px] flex flex-col gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div className="relative rounded-[2px] w-full h-[146px] overflow-hidden">
        {post.thumbnailUrl ? (
          <div className="group">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={234}
              height={146}
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-[234px] h-[146px] bg-Gray-100" />
        )}
        <BookMark className="absolute bottom-2 right-2 size-5 fill-transparent text-transparent group-hover:fill-transparent group-hover:text-Gray-200 group-hover:stroke-Gray-200 group-hover:stroke-2" />
      </div>
      <div className="flex flex-col w-full max-w-[12.625rem] h-[91px]">
        <p className="text-caption-02 font-medium text-Light-Gray">{categoryText}</p>
        <h3 className="text-body-02 font-semibold text-black line-clamp-2 w-full">{post.title}</h3>
        <p className="text-caption-02 mt-1 text-Dark-Gray font-medium line-clamp-2 w-full">
          {post.serviceSummary}
        </p>
      </div>
      <div className="flex flex-row gap-1">
        {isTodayDeadline && <Tag style="purple" />}
        {dday > 0 && <Tag style="gray" dday={dday} />}
        <Tag style={getRewardTagStyle(post.reward?.rewardDescription || 'NONE')} />
      </div>
      {ranking && (
        <div className="absolute top-0 left-[22px]">
          <div className="relative">
            <RankingArticle />
            <p className="absolute top-1 left-1/2 transform -translate-x-1/2 text-subtitle-01 font-semibold text-Primary-100">
              {ranking}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface PostCardSkeletonProps {
  className?: string;
}

export function PostCardSkeleton({ className }: PostCardSkeletonProps) {
  return (
    <div
      className={cn(
        'relative bg-white min-w-[234px] rounded-sm px-3 py-[14.5px] flex flex-col gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div className="relative rounded-[2px] w-full h-[146px] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col w-full max-w-[12.625rem] h-[91px] gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex flex-row gap-1">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}
