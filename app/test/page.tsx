'use client';
import { useMyPostsQuery } from '@/hooks/posts/queries/useMyPostsQuery';

import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { cn } from '@/lib/utils';
import Button from '@/components/common/atoms/Button';
import { useRouter } from 'next/navigation';

const TestPage = () => {
  const router = useRouter();

  const { data: myPostsData } = useMyPostsQuery({ page: 0, size: 9 });

  if (!myPostsData?.data?.content?.[0]) {
    return <PostCardSkeleton />;
  }

  const firstPost = myPostsData.data.content[0];
  const feedbackId = firstPost.id;
  const projectId = firstPost.id;

  return (
    <div
      key={firstPost.id}
      className={cn(
        'relative group w-[258px] h-[297px] rounded-sm overflow-hidden',
        'transition-shadow duration-300 hover:shadow-card-hover',
      )}
    >
      <PostCard post={firstPost} />

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-3 
                  bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={event => event.stopPropagation()}
      >
        <Button
          State="Primary"
          Size="xxl"
          label="완료하기"
          className="w-40"
          onClick={() => {
            router.push(`/project/${feedbackId}/feedback`);
          }}
        />
        <Button
          State="Focused"
          Size="xxl"
          label="상세 페이지로 이동"
          className="w-40 text-nowrap"
          onClick={() => {
            router.push(`/project/${projectId}`);
          }}
        />
      </div>
    </div>
  );
};
export default TestPage;
