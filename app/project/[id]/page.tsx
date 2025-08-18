import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import ProjectDetailClient from './ProjectDetailClient';
import { applyCardData, reviewCardData, similarPostData } from './data';
import { queryKeys } from '@/constants/query-keys';

import { ProjectDetailResponseSchema } from '@/hooks/posts/query/usePostDetailQuery';
import { RightSidebarResponseSchema } from '@/hooks/posts/query/usePostRightSidebar';

const BACKEND_URL = process.env.BACKEND_URL!;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.detail(Number(id)),
    queryFn: () => fetchProjectData(Number(id)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectDetailClient
        id={Number(id)}
        applyCardData={applyCardData}
        reviewCardData={reviewCardData}
        similarPostData={similarPostData}
      />
    </HydrationBoundary>
  );
}

async function fetchProjectData(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(`${BACKEND_URL}/v1/users/posts/${id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    console.error('네트워크 응답이 올바르지 않습니다.', response);
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }

  const data = await response.json();
  return ProjectDetailResponseSchema.parse(data);
}

async function fetchRightSidebarData(postId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(`${BACKEND_URL}/v1/users/posts/${postId}/right-sidebar`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    console.error('네트워크 응답이 올바르지 않습니다.', response);
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }

  const data = await response.json();
  return RightSidebarResponseSchema.parse(data);
}
