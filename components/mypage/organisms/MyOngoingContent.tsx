'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { useMyApplicationsQuery } from '@/hooks/posts/queries/useMyApplicationsQuery';
import PostCard, { PostCardSkeleton } from '@/components/category/molecules/PostCard';
import { useRouter } from 'next/navigation';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import Pagination from '@/components/category/molecules/Pagination';
import EmptyCard from '../molecules/EmptyCard';
import { PostSummaryType } from '@/hooks/posts/dto/postList';
import { getPostDetail } from '@/hooks/posts/queries/usePostDetailQuery';
import { getMyFeedback } from '@/hooks/feedback/queries/useMyFeedbackQuery';
import { ParticipationStatusEnum } from '@/hooks/posts/dto/postDetail';
import { queryKeys } from '@/constants/query-keys';
import Chip from '@/components/common/atoms/Chip';
import Button from '@/components/common/atoms/Button';
import { ApplicationItemType } from '@/hooks/posts/dto/myApplications';
import { ProjectDetailResponseModel } from '@/hooks/posts/queries/usePostDetailQuery';

export default function MyOngoingContent() {
  const router = useRouter();

  // 정렬 기준
  const SORT_OPTIONS: { label: string; value: string }[] = [
    { label: '최신순', value: 'DESC' },
    { label: '오래된순', value: 'ASC' },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [sortOption, setSortOption] = useState('DESC'); // 기본값: 최신순
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    data: myApplicationsData,
    isLoading: isMyApplicationLoading,
    refetch,
  } = useMyApplicationsQuery({
    status: ParticipationStatusEnum.enum.APPROVED,
    page: currentPage,
    size: 9,
    sort: [sortOption],
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const applicationsNeedingPostData =
    myApplicationsData?.data?.content.filter(
      (app: ApplicationItemType) => !app.post && app.postId,
    ) ?? [];

  // 1. 포스트 상세 데이터 가져오기
  const postQueries = useQueries({
    queries: applicationsNeedingPostData.map((app: ApplicationItemType) => ({
      queryKey: queryKeys.posts.detail(app.postId!),
      queryFn: () => getPostDetail(app.postId!),
      enabled: !!app.postId,
      staleTime: 1000 * 60 * 5,
    })),
  });

  // 2. 피드백 제출 여부 가져오기
  const feedbackQueries = useQueries({
    queries: (myApplicationsData?.data?.content ?? []).map((app: ApplicationItemType) => ({
      queryKey: queryKeys.feedback.my(app.postId!),
      queryFn: () => getMyFeedback(app.postId!),
      enabled: !!app.postId,
      staleTime: 1000 * 60 * 5,
    })),
  });

  // 로딩 상태 통합
  const isAnyLoading =
    isMyApplicationLoading ||
    postQueries.some(q => q.isLoading) ||
    feedbackQueries.some(q => q.isLoading);

  // 피드백 데이터 매핑
  const feedbackMap = useMemo(() => {
    const map = new Map<number, boolean>();
    feedbackQueries.forEach((query, index) => {
      const postId = myApplicationsData?.data?.content[index]?.postId;
      if (postId) {
        // 피드백 데이터가 존재하면(submitted) true
        map.set(postId, !!query.data?.data.feedback);
      }
    });
    return map;
  }, [feedbackQueries, myApplicationsData]);

  // post 데이터를 postId로 매핑
  const postDataMap = new Map<number, ProjectDetailResponseModel['data'] | undefined>(
    postQueries.map((query: UseQueryResult<ProjectDetailResponseModel, Error>, index: number) => {
      const data = query.data as ProjectDetailResponseModel | undefined;
      return [applicationsNeedingPostData[index].postId!, data?.data];
    }),
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (value: string) => {
    if (sortOption !== value) {
      setSortOption(value);
      setCurrentPage(0); // 정렬 변경 시 1페이지로 초기화
    }
    setIsDropdownOpen(false);
  };
  // 현재 선택된 정렬 라벨
  const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === sortOption)?.label;

  return (
    <div className="relative">
      {/* 필터 */}
      <div className="absolute right-0 -top-6 z-0">
        <div className="relative">
          {/* 드롭다운 트리거 버튼 */}
          <Chip
            variant="solid"
            size="lg"
            onClick={() => setIsDropdownOpen(prev => !prev)}
            active={isDropdownOpen}
          >
            {currentSortLabel}
          </Chip>
          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <div className="absolute shadow-card right-0 mt-[9px] w-[108px] bg-white rounded-sm flex flex-col">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`p-2 text-[10px] hover:bg-Gray-50 cursor-pointer text-left text-Dark-Gray ${
                    sortOption === option.value && 'font-bold'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex flex-wrap gap-10">
          {isAnyLoading ? (
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
            <>
              {myApplicationsData.data.content
                .map((application: ApplicationItemType) => {
                  const post =
                    application.post ??
                    (application.postId ? postDataMap.get(application.postId) : null);

                  if (!post) return null;

                  // 해당 게시글에 피드백을 이미 제출했는지 확인
                  const isFeedbackSubmitted = feedbackMap.get(post.id) ?? false;

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
                    <div
                      key={post.id}
                      className={cn(
                        'relative group w-[258px] h-[297px] rounded-sm overflow-hidden',
                        'transition-shadow duration-300 shadow-card hover:shadow-card-hover',
                      )}
                    >
                      <PostCard post={postCardData} />

                      <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-3 
                                bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        onClick={event => event.stopPropagation()}
                      >
                        <Button
                          State={isFeedbackSubmitted ? 'Disabled' : 'Primary'}
                          Size="xxl"
                          label={isFeedbackSubmitted ? '참여 완료' : '완료하기'}
                          className="w-40"
                          onClick={() => {
                            if (isFeedbackSubmitted) return; // 클릭 방지
                            router.push(`/project/${post.id}/feedback`);
                          }}
                        />
                        <Button
                          State="Focused"
                          Size="xxl"
                          label="상세 페이지로 이동"
                          className="w-40 text-nowrap"
                          onClick={() => {
                            router.push(`/project/${post.id}`);
                          }}
                        />
                      </div>
                    </div>
                  );
                })
                .filter(Boolean)}

              {/* 리스트의 마지막 요소 카드 */}
              <div className="bg-Gray-50 w-[258px] h-[297px] rounded-sm flex flex-col justify-center items-center gap-5 shadow-card">
                <p className="text-Light-Gray font-bold text-sm">당신을 기다리는 새로운 테스트!</p>
                <Button
                  State={'Default'}
                  Size={'md'}
                  label={'테스트 보러가기'}
                  className="text-Dark-Gray font-bold text-[10px]"
                  onClick={() => router.push('/')}
                ></Button>
              </div>
            </>
          )}
        </div>

        {!isAnyLoading &&
          myApplicationsData?.data?.content &&
          myApplicationsData.data.content.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={myApplicationsData.data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
      </div>
    </div>
  );
}
