import ProjectDetailCardClient from './ProjectDetailCardClient';
import CustomImage from '@/components/common/atoms/CustomImage';
import { mockProjectData, applyCardData } from './data';


export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="flex gap-10">
        <div className="flex-1 w-full flex-col">
          <CustomImage
            src= {mockProjectData.thumbnailUrl}
            alt={mockProjectData.description || 'default description'}
            width={854}
            height={533}
            state="default"
            className="object-cover"
          />
          <h1>Project Detail Page</h1>
          <p>id: {id}</p>
        </div>
        <ProjectDetailCardClient {...applyCardData}/>
      </div>
    </div>
  );
}
