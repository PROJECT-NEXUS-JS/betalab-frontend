'use client';
import { useState, useRef } from 'react';

import CustomImage from '@/components/common/atoms/CustomImage';
import RemindCard from '@/components/common/atoms/RemindCard';
import Chip from '@/components/common/atoms/Chip';
import ReviewCard from '@/components/common/molecules/ReviewCard';
import ProjectDetailCardClient from './ProjectDetailCardClient';
import Button from '@/components/common/atoms/Button';
import SimilarPostCard from '@/components/project/SimilarPostCard';
import CategoryBar from '@/components/common/atoms/CategoryBar';

import { ProjectDataModel } from '@/hooks/posts/dto/postDetail';
import { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import { ReviewCardProps } from '@/components/common/molecules/ReviewCard';
import { SimilarPost } from '@/hooks/posts/dto/similarPost';

import { useGetPostDetailQuery } from '@/hooks/posts/query/usePostDetailQuery';
import { useGetRightSidebar } from '@/hooks/posts/query/usePostRightSidebar';
import { usePostReviewQuery } from '@/hooks/review/quries/usePostReviewQuery';
import { useSimilarPosts } from '@/hooks/posts/query/useSimilarPostQuery';

import { transformToApplyCardProps } from '@/lib/mapper/apply-card';
import { transformToReviewCardProps } from '@/lib/mapper/review-card';

interface ProjectDetailClientProps {
  id: number;
}

export default function ProjectDetailClient({ id }: ProjectDetailClientProps) {
  const [projectIntroduceFold, setProjectIntroduceFold] = useState(true);
  const [reviewFold, setReviewFold] = useState(true);

  const projectIntroduceRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { data: postDetailData, isLoading, isError } = useGetPostDetailQuery(Number(id));
  const {
    data: rightSidebarData,
    isLoading: isRightSidebarLoading,
    isError: isRightSidebarError,
  } = useGetRightSidebar(Number(id));

  const applyCardData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> =
    transformToApplyCardProps(
      rightSidebarData?.data ?? {
        testName: '',
        recruiterName: '',
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
  if (isError || isRightSidebarError || isReviewError || isSimilarPostError)
    return <div>에러 발생</div>;

  const projectData = postDetailData?.data;
  if (!projectData) return <div>데이터 없음</div>;

  const reviews = reviewCardData?.data.map(transformToReviewCardProps) ?? [];
  const displayReviews = reviewFold ? reviews.slice(0, 3) : reviews;

  return (
    <div className="min-h-screen w-full flex justify-center mb-30 mt-6">
      <div className="flex gap-10">
        <div className="flex-1 w-full flex-col space-y-10">
          {/* 프로젝트 간단 정보 */}
          <section className="flex flex-col gap-4">
            <CustomImage
              src={projectData.thumbnailUrl}
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
              className={`relative overflow-hidden ${projectIntroduceFold ? 'max-h-[630px]' : ''}`}
            >
              <CustomImage
                src={projectData.thumbnailUrl}
                alt={projectData.description || 'default description'}
                width={854}
                height={533}
                state="default"
                className="object-cover"
              />
              {projectIntroduceFold && (
                <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-white to-transparent"></div>
              )}
            </div>
            <Button
              State="Solid"
              Size="lg"
              label={projectIntroduceFold ? '프로젝트 소개 더보기' : '프로젝트 소개 접기'}
              onClick={() => setProjectIntroduceFold(prev => !prev)}
            />
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
            {displayReviews.map((review, idx) => (
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
              {similarPostData?.data.map(post => (
                <SimilarPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
        <ProjectDetailCardClient {...applyCardData} />
      </div>
    </div>
  );
}
