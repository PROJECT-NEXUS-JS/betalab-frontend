import { useState, useEffect } from 'react';
import { useMyApplicationsQuery } from '@/hooks/posts/queries/useMyApplicationsQuery';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { PostSummaryType } from '@/hooks/posts/dto/postList';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { getPostDetail } from '@/hooks/posts/queries/usePostDetailQuery';
import { queryKeys } from '@/constants/query-keys';
import { ApplicationItemType } from '@/hooks/posts/dto/myApplications';
import { ProjectDetailResponseModel } from '@/hooks/posts/queries/usePostDetailQuery';
import { ParticipationStatusEnum } from '@/hooks/posts/dto/postDetail';

export default function MyApplicationContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    data: myApplicationsData,
    isLoading,
    refetch,
  } = useMyApplicationsQuery({
    status: ParticipationStatusEnum.enum.COMPLETED,
    page: currentPage,
    size: 9,
  });
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const applicationsNeedingPostData =
    myApplicationsData?.data?.content.filter(
      (app: ApplicationItemType) => !app.post && app.postId,
    ) ?? [];

  const postQueries = useQueries({
    queries: applicationsNeedingPostData.map((app: ApplicationItemType) => ({
      queryKey: queryKeys.posts.detail(app.postId!),
      queryFn: () => getPostDetail(app.postId!),
      enabled: !!app.postId,
    })),
  });

  // post 데이터를 postId로 매핑
  const postDataMap = new Map<number, ProjectDetailResponseModel['data'] | undefined>(
    postQueries.map((query: UseQueryResult<ProjectDetailResponseModel, Error>, index: number) => {
      const data = query.data as ProjectDetailResponseModel | undefined;
      return [applicationsNeedingPostData[index].postId!, data?.data];
    }),
  );
  const isPostDataLoading = postQueries.some(
    (query: UseQueryResult<ProjectDetailResponseModel, Error>) => query.isLoading,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    router.push(`/project/${postId}`);
  };

  return (
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
            title={
              <>
                아직 참여한 테스트가 없어요 !<br />
                관심있는 테스트를 찾아 첫 참여를 시작해보세요
              </>
            }
            buttonLabel="테스트 보러가기"
            onClick={() => {
              router.push('/');
            }}
          />
        ) : (
          myApplicationsData.data.content
            .map((application: ApplicationItemType) => {
              const post =
                application.post ??
                (application.postId ? postDataMap.get(application.postId) : null);

              if (!post) return null;

              const postCardData: PostSummaryType = {
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
                <div key={application.id} onClick={() => handlePostClick(post.id)}>
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
  );
}
