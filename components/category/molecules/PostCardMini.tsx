import BookMark from '@/components/common/svg/BookMark';
import { TestCardType } from '@/types/models/testCard';
import Tag from '@/components/common/atoms/Tag';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface PostCardMiniProps {
  post: TestCardType;
  className?: string;
}

export default function PostCardMini({ post, className }: PostCardMiniProps) {
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

  const dday = post.schedule ? calculateDday(post.schedule.recruitmentDeadline) : 0;
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
      className={cn('shadow-[0_0_10px_rgba(0,0,0,0.1)] p-3 group flex flex-col gap-3', className)}
    >
      <div className="bg-Primary-100 rounded-sm w-[14.625rem] h-[5.3125rem] gap-1 p-3 flex flex-col  items-start justify-start">
        <p className="text-caption-02 font-medium text-Primary-500">{categoryText}</p>
        <h3 className="text-body-02 font-semibold text-black line-clamp-2 w-full">{post.title}</h3>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1">
          {isTodayDeadline && <Tag style="purple" />}
          {!isTodayDeadline && <Tag style="gray" dday={dday} />}
          {post.reward && <Tag style={getRewardTagStyle(post.reward.rewardDescription)} />}
        </div>
        <BookMark className="size-6 fill-transparent text-transparent group-hover:fill-transparent group-hover:text-Gray-200 group-hover:stroke-Gray-200 group-hover:stroke-2" />
      </div>
    </div>
  );
}

interface PostCardMiniSkeletonProps {
  className?: string;
}

export function PostCardMiniSkeleton({ className }: PostCardMiniSkeletonProps) {
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
