'use client';
import { useState } from 'react';

import CustomImage from '@/components/common/atoms/CustomImage';
import RemindCard from '@/components/common/atoms/RemindCard';
import Chip from '@/components/common/atoms/Chip';
import ReviewCard from '@/components/common/molecules/ReviewCard';
import ProjectDetailCardClient from './ProjectDetailCardClient';
import Button from '@/components/common/atoms/Button';

import { ProjectDataModel } from '@/hooks/posts/dto/postDetail';
import { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import { ReviewCardProps } from '@/components/common/molecules/ReviewCard';

interface ProjectDetailClientProps {
  projectData: ProjectDataModel;
  applyCardData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'>;
  reviewCardData: ReviewCardProps[];
} 

export default function ProjectDetailClient({ projectData, applyCardData, reviewCardData }: ProjectDetailClientProps) {
  const [projectIntroduceFold, setProjectIntroduceFold] = useState(true);
  const [reviewFold, setReviewFold] = useState(true);

  const displayReviews = reviewFold ? reviewCardData.slice(0, 3) : reviewCardData;

  return (
    <div className="min-h-screen w-full flex justify-center mb-30">
      <div className="flex gap-10">
        <div className="flex-1 w-full flex-col space-y-10">
          {/* 프로젝트 간단 정보 */}
          <section className='flex flex-col gap-4'>
            <CustomImage
              src={projectData.thumbnailUrl}
              alt={projectData.description || 'default description'}
              width={854}
              height={533}
              state="default"
              className="object-cover"
            />
            <p className='text-base text-Dark-Gray font-bold'>{projectData.description}</p>
          </section>
          {/* 프로젝트 상세 정보 */}
          <section className='flex flex-col gap-5'>
            <h3 className='text-xl text-Black font-bold'>프로젝트 소개</h3>
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
              State='Solid'
              Size='lg'
              label={projectIntroduceFold ? '펼쳐보기' : '접기'}
              onClick={() => setProjectIntroduceFold(prev => !prev)}
            />
          </section>
          <RemindCard />
          {/* 프로젝트 리뷰 */}
          <section className='flex flex-col items-start gap-5 self-stretch'>
            <div className='flex justify-between items-start self-stretch'>
              <h3 className='text-Black text-xl font-bold'>테스터들의 리뷰에요</h3>
              <Chip variant='default' size='sm'>최신순</Chip>
            </div>
            {displayReviews.map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
            {reviewCardData.length > 3 && (
              <Button 
                State='Solid'
                Size='lg'
                label={reviewFold ? '모든 리뷰 보기' : '리뷰 접기'}
                onClick={() => setReviewFold(prev => !prev)}
                className='w-full'
              />
            )}
          </section>
        </div>
        <ProjectDetailCardClient {...applyCardData} />
      </div>
    </div>
  );
}
