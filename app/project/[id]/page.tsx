import ProjectDetailClient from './ProjectDetailClient';
import { mockProjectData, applyCardData, reviewCardData, similarPostData } from './data';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <ProjectDetailClient 
      projectData={mockProjectData} 
      applyCardData={applyCardData}
      reviewCardData={reviewCardData}
      similarPostData={similarPostData}
    />
  );
}