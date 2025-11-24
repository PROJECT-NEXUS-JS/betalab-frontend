'use client';

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
  const router = useRouter();

  // 정렬 기준
  const SORT_OPTIONS: { label: string; value: string }[] = [
    { label: '최신순', value: 'DESC' },
    { label: '오래된순', value: 'ASC' },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [sortOption, setSortOption] = useState('DESC'); // 기본값: 최신순
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: myApplicationsData, isLoading } = useMyApplicationsQuery({
    status: 'APPROVED',
    page: currentPage,
    size: 9,
    sort: [sortOption],
  });

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
      <div className="absolute right-0 -top-6">
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
            //               <div className="        'relative cursor-pointer bg-white min-w-[234px] group rounded-sm px-3 py-[14.5px] flex flex-col gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]',
            // ">
            //                 <
            //               </div>
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
    </div>
  );
}
