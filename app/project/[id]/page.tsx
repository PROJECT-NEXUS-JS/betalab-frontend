import ProjectDetailCardClient from './ProjectDetailCardClient';
import CustomImage from '@/components/common/atoms/CustomImage';
import RemindCard from '@/components/common/atoms/RemindCard';
import Chip from '@/components/common/atoms/Chip';
import ReviewCard from '@/components/common/molecules/ReviewCard';

import { mockProjectData, applyCardData, reviewCardData } from './data';


export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen w-full flex justify-center mb-30">
      <div className="flex gap-10">
        <div className="flex-1 w-full flex-col space-y-10">
          {/** 프로젝트 간단 정보 */}
          <section className='flex flex-col gap-4'>
            <CustomImage
              src= {mockProjectData.thumbnailUrl}
              alt={mockProjectData.description || 'default description'}
              width={854}
              height={533}
              state="default"
              className="object-cover"
            />
            <p className='text-base text-Dark-Gray font-bold'>{mockProjectData.description}</p>
          </section>
           {/** 프로젝트 상세 정보 */}
          <section className='flex flex-col gap-5'>
            <h3 className='text-xl text-Black font-bold'>프로젝트 소개</h3>
            <CustomImage
              src= {mockProjectData.thumbnailUrl}
              alt={mockProjectData.description || 'default description'}
              width={854}
              height={533}
              state="default"
              className="object-cover"
            />
          </section>
          <RemindCard />
          {/** 프로젝트 리뷰 */}
          <section className='flex flex-col items-start gap-5 self-stretch'>
            <div className='flex justify-between items-start self-stretch'>
              <h3 className='text-Black text-xl font-bold'>테스터들의 리뷰에요</h3>
              <Chip variant='default' size='sm'>최신순</Chip>
            </div>
            {reviewCardData.map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
          </section>
        </div>
        

        <ProjectDetailCardClient {...applyCardData}/>
      </div>
    </div>
  );
}
