import ProjectDetailCardClient from './ProjectDetailCardClient';
import CustomImage from '@/components/common/atoms/CustomImage';
import { mockProjectData, applyCardData } from './data';


export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="flex gap-10">
        <div className="flex-1 w-full flex-col space-y-4">
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
        </div>

        <ProjectDetailCardClient {...applyCardData}/>
      </div>
    </div>
  );
}
