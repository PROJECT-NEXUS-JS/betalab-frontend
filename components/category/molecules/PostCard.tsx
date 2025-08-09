import { UsersPostsListItemType } from '@/hooks/posts/dto/postList';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import BookMark from '@/components/common/svg/BookMark';

interface PostCardProps {
  className?: string;
  post: UsersPostsListItemType;
}

export default function PostCard({ post, className }: PostCardProps) {
  const mainCategoryNames = post.mainCategories.map(category => category.name);
  const platformCategoryNames = post.platformCategories.map(category => category.name);

  const allCategoryNames = [...mainCategoryNames, ...platformCategoryNames];
  const categoryText = allCategoryNames.join('  ·  ');

  return (
    <div
      className={cn(
        'bg-white min-w-[234px] group rounded-sm px-3 py-[14.5px] flex flex-col gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div className="relative rounded-[2px] w-full min-h-[146px] overflow-hidden">
        {post.thumbnailUrl ? (
          <div className="group">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={234}
              height={146}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-[234px] h-[146px] bg-Gray-100" />
        )}
        <BookMark className="absolute bottom-2 right-2 size-5 fill-transparent text-transparent group-hover:fill-transparent group-hover:text-Gray-200 group-hover:stroke-Gray-200 group-hover:stroke-2" />
      </div>
      <div className="flex flex-col w-full max-w-[12.625rem]">
        <p className="text-caption-02 font-medium text-Light-Gray">{categoryText}</p>
        <h3 className="text-body-02 font-semibold text-black line-clamp-2 w-full">{post.title}</h3>
        <p className="text-caption-02 mt-1 text-Dark-Gray font-medium line-clamp-2 w-full">
          {post.serviceSummary}
        </p>
      </div>
    </div>
  );
}
