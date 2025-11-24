import { useState } from 'react';
import { useMyApplicationsQuery } from '@/hooks/posts/queries/useMyApplicationsQuery';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { TestCardType } from '@/types/models/testCard';
import { getPostDetail } from '@/hooks/posts/queries/usePostDetailQuery';
import { queryKeys } from '@/constants/query-keys';
import Chip from '@/components/common/atoms/Chip';

export default function MyOngoingContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: myApplicationsData, isLoading } = useMyApplicationsQuery({
    status: 'APPROVED',
    page: currentPage,
    size: 9,
  });
  const router = useRouter();

  const applicationsNeedingPostData =
    myApplicationsData?.data?.content.filter(app => !app.post && app.postId) ?? [];

  const postQueries = useQueries({
    queries: applicationsNeedingPostData.map(app => ({
      queryKey: queryKeys.posts.detail(app.postId!),
      queryFn: () => getPostDetail(app.postId!),
      enabled: !!app.postId,
    })),
  });

  // post 데이터를 postId로 매핑
  const postDataMap = new Map(
    postQueries.map((query, index) => [
      applicationsNeedingPostData[index].postId!,
      query.data?.data,
    ]),
  );
  const isPostDataLoading = postQueries.some(query => query.isLoading);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    router.push(`/project/${postId}`);
  };

  return (
    <>
      <Chip variant="default" size="sm">
        최신순
      </Chip>
      <div className="flex flex-col mt-10">
        <div className="flex flex-wrap gap-10">
          {isLoading || isPostDataLoading ? (
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          ) : !myApplicationsData?.data?.content || myApplicationsData.data.content.length === 0 ? (
            <EmptyCard
              className="w-full py-[100px]"
              title={<p>아직 진행 중인 테스트가 없어요 !</p>}
              buttonLabel="테스트 등록하기"
              onClick={() => {
                router.push('/test-add');
              }}
            />
          ) : (
            myApplicationsData.data.content
              .map(application => {
                const post =
                  application.post ??
                  (application.postId ? postDataMap.get(application.postId) : null);

                if (!post) return null;

                const postCardData: TestCardType = {
                  id: post.id,
                  title: post.title,
                  serviceSummary: post.serviceSummary,
                  thumbnailUrl: post.thumbnailUrl ?? null,
                  mainCategories: post.mainCategories,
                  platformCategories: post.platformCategories,
                  genreCategories: post.genreCategories,
                  schedule: post.schedule,
                  reward: post.reward
                    ? {
                        rewardType: post.reward.rewardType,
                        rewardDescription: post.reward.rewardDescription,
                      }
                    : undefined,
                };

                return (
                  <div key={post.id} onClick={() => handlePostClick(post.id)}>
                    <PostCard post={postCardData} />
                  </div>
                );
              })
              .filter(Boolean)
          )}
        </div>

        {!isLoading &&
          myApplicationsData?.data?.content &&
          myApplicationsData.data.content.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={myApplicationsData.data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
      </div>
    </>
  );
}
