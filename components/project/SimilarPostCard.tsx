import Link from 'next/link';
import Image from 'next/image';

import { SimilarPost } from '@/hooks/posts/dto/similarPost';
import { cn } from '@/lib/utils';
import BookMark from '@/components/common/svg/BookMark';
import Tag from '@/components/common/atoms/Tag';
import { Skeleton } from '@/components/ui/skeleton';
import RankingArticle from '@/components/common/svg/RankingArticle';

export interface SimilarPostCardProps {
  className?: string;
  post: SimilarPost;
}

export default function SimilarPostCard({ post, className }: SimilarPostCardProps) {
  const categoryNames = post.categories
    .split(' · ')
    .join(', ')
    .split(',')
    .map(name => name.trim());

  const getRewardTagStyle = (rewardProvided: boolean): 'orange' | 'black' => {
    return rewardProvided ? 'orange' : 'black';
  };

  return (
    <Link
      href={`/project/${post.id}`}
      className={cn(
        'relative cursor-pointer bg-white w-max min-w-[234px] group rounded-sm px-3 py-[14.5px] flex flex-col gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]',
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
        <p className="text-caption-02 font-medium text-Light-Gray">{categoryNames.join(' · ')}</p>
        <h3 className="text-body-02 font-semibold text-black line-clamp-2 w-full">{post.title}</h3>
        <p className="text-caption-02 mt-1 text-Dark-Gray font-medium line-clamp-2 w-full">
          {post.oneLineIntro}
        </p>
      </div>
      <div className="flex flex-row gap-1">
        <Tag style={getRewardTagStyle(post.rewardProvided)} />
        <Tag style="green" label={post.durationType} />
      </div>
    </Link>
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
      <div className="relative rounded-[2px] w-[234px] h-[146px] overflow-hidden">
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
