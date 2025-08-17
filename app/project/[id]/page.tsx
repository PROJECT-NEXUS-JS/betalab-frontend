import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import ProjectDetailClient from './ProjectDetailClient';
import { mockProjectData, applyCardData, reviewCardData, similarPostData } from './data';
import { queryKeys } from '@/constants/query-keys';
import { getPostDetail } from '@/hooks/posts/query/usePostDetailQuery';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.detail(Number(id)),
    queryFn: () => getPostDetail(Number(id)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectDetailClient
        // projectData={mockProjectData}
        id={Number(id)}
        applyCardData={applyCardData}
        reviewCardData={reviewCardData}
        similarPostData={similarPostData}
      />
    </HydrationBoundary>
  );
}
