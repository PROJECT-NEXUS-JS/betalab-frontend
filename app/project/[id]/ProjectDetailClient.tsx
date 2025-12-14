'use client';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomMedia from '@/components/common/atoms/CustomMedia';
import RemindCard from '@/components/common/atoms/RemindCard';
import Chip from '@/components/common/atoms/Chip';
import ReviewCard from '@/components/common/molecules/ReviewCard';
import Button from '@/components/common/atoms/Button';
import SimilarPostCard from '@/components/project/SimilarPostCard';
import CategoryBar from '@/components/common/atoms/CategoryBar';

import ProjectDetailCardClient from './ProjectDetailCardClient';
import { ApplyCardDataProps } from '@/components/common/molecules/ApplyCard';

import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
import { useGetRightSidebar } from '@/hooks/posts/queries/usePostRightSidebar';
import { usePostReviewQuery } from '@/hooks/review/queries/usePostReviewQuery';
import { useSimilarPosts } from '@/hooks/posts/queries/useSimilarPostQuery';

import { transformToApplyCardProps } from '@/lib/mapper/apply-card';
import { transformToReviewCardProps } from '@/lib/mapper/review-card';
import { ReviewCardProps } from '@/components/common/molecules/ReviewCard';
import { SimilarPost } from '@/hooks/posts/dto/similarPost';

interface ProjectDetailClientProps {
  id: number;
}

export default function ProjectDetailClient({ id }: ProjectDetailClientProps) {
  const router = useRouter();
  const [projectIntroduceFold, setProjectIntroduceFold] = useState(false);
  const [shouldShowFoldButton, setShouldShowFoldButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reviewFold, setReviewFold] = useState(true);

  const projectIntroduceRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { data: postDetailData, isLoading, isError, error } = useGetPostDetailQuery(Number(id));
  const {
    data: rightSidebarData,
    isLoading: isRightSidebarLoading,
    isError: isRightSidebarError,
  } = useGetRightSidebar(Number(id));

  useEffect(() => {
    if (isError) {
      alert('마감된 테스트에요!');
      router.back();
    }
  }, [isError, router]);

  const applyCardData: ApplyCardDataProps = transformToApplyCardProps(
    rightSidebarData?.data ?? {
      testName: '',
      recruiterName: '',
      recruiterAffiliation: '',
      profileUrl: '',
      testSummary: '',
      daysRemaining: 0,
      scrapCount: 0,
      currentParticipants: 0,
      participationTarget: '',
      requiredDuration: '',
      rewardInfo: '',
      participationMethod: '',
      qnaMethod: '',
    },
    postDetailData?.data.participationStatus ?? null, // undefined일 경우 null로 치환
  );

  const {
    data: reviewCardData,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = usePostReviewQuery(Number(id));

  const {
    data: similarPostData,
    isLoading: isSimilarPostLoading,
    isError: isSimilarPostError,
  } = useSimilarPosts(Number(id));

  if (isLoading || isRightSidebarLoading || isReviewLoading || isSimilarPostLoading)
    return <div>로딩 중...</div>;
  if (isError || isRightSidebarError || isReviewError || isSimilarPostError) {
    // useEffect에서 이미 alert와 리다이렉트 처리됨
    return <div>에러 발생</div>;
  }

  const projectData = postDetailData?.data;

  if (!projectData) return <div>데이터 없음</div>;

  // DOM의 실제 높이를 측정하여 설명 자세히 보기 버튼 표시 여부 결정
  useLayoutEffect(() => {
    if (contentRef.current) {
      // 스크롤 높이(전체 높이)가 630px을 초과하는지 확인
      const fullHeight = contentRef.current.scrollHeight;
      if (fullHeight > 630) {
        setShouldShowFoldButton(true);
        setProjectIntroduceFold(true); // 630px 넘을 때만 다시 접기
      } else {
        setShouldShowFoldButton(false);
        setProjectIntroduceFold(false); // 짧으면 그대로 두기
      }
    }
  }, [projectData.content]);

  const reviews = reviewCardData?.data.map(transformToReviewCardProps) ?? [];
  const displayReviews = reviewFold ? reviews.slice(0, 3) : reviews;

  return (
    <div className="min-h-screen w-full flex justify-center mb-30 mt-6">
      <div className="flex gap-10">
        <div className="flex-1 w-full flex-col space-y-10 max-w-[854px]">
          {/* 프로젝트 간단 정보 */}
          <section className="flex flex-col gap-4">
            <p className="text-base font-bold text-Gray-200">
              {`홈 > ${projectData.mainCategories[0]?.name} > ${projectData.genreCategories.map((cat: { code: string; name: string }) => cat.name).join(', ')}`}{' '}
            </p>
            <CustomMedia
              src={projectData.thumbnailUrl || '/empty.png'}
              alt={projectData.description || 'default description'}
              width={854}
              height={533}
              state="default"
              className="object-cover"
            />
            <p className="text-base text-Dark-Gray font-bold">{projectData.description}</p>
          </section>
          {/* 프로젝트 상세 정보 */}
          <section className="flex flex-col gap-5">
            <div className="flex gap-2">
              <CategoryBar
                state="active"
                size="md"
                onClick={() => scrollToSection(projectIntroduceRef)}
              >
                프로젝트 소개
              </CategoryBar>
              <CategoryBar state="deactive" size="md" onClick={() => scrollToSection(reviewRef)}>
                리뷰 보기
              </CategoryBar>
            </div>
            <h3 className="text-xl text-Black font-bold" ref={projectIntroduceRef}>
              프로젝트 소개
            </h3>
            <div
              ref={contentRef}
              className={`relative overflow-hidden flex flex-col gap-10 transition-[max-height] duration-500 ease-in-out ${
                projectIntroduceFold ? 'max-h-[630px]' : 'max-h-none'
              }`}
            >
              {/* 미디어 리스트 */}
              {projectData.content.mediaUrls &&
                projectData.content.mediaUrls.length > 0 &&
                projectData.content.mediaUrls.map((media: string, index: number) => (
                  <CustomMedia
                    key={`media-${index}`}
                    src={media}
                    alt={projectData.description || '상세 이미지'}
                    state="default"
                  />
                ))}
              {/* 글이 있을 때만 텍스트 박스 렌더링 */}
              {projectData.content.storyGuide && (
                <div className="p-4 rounded-xs border border-Gray-100">
                  <p className="text-base font-normal text-Dark-Gray whitespace-pre-line">
                    {projectData.content.storyGuide}
                  </p>
                </div>
              )}
              {/* 접힘 상태 + 높이가 초과되었을 때만 그라데이션 표시 */}
              {projectIntroduceFold && shouldShowFoldButton && (
                <div className="absolute bottom-0 w-full h-[150px] bg-linear-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>

            {/* 실제 높이가 630px을 넘을 때만 버튼 노출 */}
            {shouldShowFoldButton && (
              <Button
                State="Solid"
                Size="lg"
                label={projectIntroduceFold ? '프로젝트 소개 더보기' : '프로젝트 소개 접기'}
                onClick={() => {
                  setProjectIntroduceFold(prev => !prev);
                }}
              />
            )}
          </section>
          <RemindCard />
          {/* 프로젝트 리뷰 */}
          <section className="flex flex-col items-start gap-5 self-stretch">
            <div className="flex justify-between items-start self-stretch">
              <h3 className="text-Black text-xl font-bold" ref={reviewRef}>
                테스터들의 리뷰에요
              </h3>
              <Chip variant="default" size="sm">
                최신순
              </Chip>
            </div>
            {displayReviews.map((review: ReviewCardProps & { id: number }, idx: number) => (
              <ReviewCard key={idx} {...review} />
            ))}
            {reviews.length > 3 && (
              <Button
                State="Solid"
                Size="lg"
                label={reviewFold ? '리뷰 더보기' : '리뷰 접기'}
                onClick={() => setReviewFold(prev => !prev)}
                className="w-full"
              />
            )}
          </section>
          {/* 유사 프로젝트 */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xl text-Black font-bold">비슷한 테스트는 어때요 ?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {similarPostData?.data.map((post: SimilarPost) => (
                <SimilarPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
        <ProjectDetailCardClient projectId={projectData.id} applyCardData={applyCardData} />
      </div>
    </div>
  );
}
