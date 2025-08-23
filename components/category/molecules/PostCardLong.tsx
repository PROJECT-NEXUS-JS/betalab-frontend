import { UsersPostsListItemType } from '@/hooks/posts/dto/postList';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import BookMark from '@/components/common/svg/BookMark';
import Tag from '@/components/common/atoms/Tag';
import { Skeleton } from '@/components/ui/skeleton';

interface PostCardLongProps {
  className?: string;
  post: UsersPostsListItemType;
}

export default function PostCardLong({ post, className }: PostCardLongProps) {
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
        'relative cursor-pointer bg-white w-[488px] group rounded-sm p-3 flex flex-row gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div className="relative rounded-[2px] w-[158px] h-[110px] overflow-hidden flex-shrink-0">
        {post.thumbnailUrl ? (
          <div className="group">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={158}
              height={110}
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-[158px] h-[110px] bg-Gray-100" />
        )}
        <BookMark className="absolute bottom-2 right-2 size-5 fill-transparent text-transparent group-hover:fill-transparent group-hover:text-Gray-200 group-hover:stroke-Gray-200 group-hover:stroke-2" />
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <p className="text-caption-02 font-medium text-Light-Gray">{categoryText}</p>
          <h3 className="text-body-02 font-semibold text-black line-clamp-2 w-full">
            {post.title}
          </h3>
        </div>

        <div className="flex flex-row gap-1">
          {isTodayDeadline && <Tag style="purple" />}
          {dday > 0 && <Tag style="gray" dday={dday} />}
          <Tag style={getRewardTagStyle(post.reward?.rewardDescription || 'NONE')} />
        </div>
      </div>
    </div>
  );
}

interface PostCardLongSkeletonProps {
  className?: string;
}

export function PostCardLongSkeleton({ className }: PostCardLongSkeletonProps) {
  return (
    <div
      className={cn(
        'relative bg-white rounded-sm p-3 w-[488px] flex flex-row gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div className="relative rounded-[2px] w-[158px] h-[110px] overflow-hidden flex-shrink-0">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0 gap-1">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex flex-row gap-1">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
