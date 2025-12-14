import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { serverInstance } from '@/apis/server-instance';

import ProjectDetailClient from './ProjectDetailClient';

import { ProjectDetailResponseSchema } from '@/hooks/posts/queries/usePostDetailQuery';
import { RightSidebarResponseSchema } from '@/hooks/posts/queries/usePostRightSidebar';
import { PostReviewResponseSchema } from '@/hooks/review/queries/usePostReviewQuery';
import { SimilarPostResponseSchema } from '@/hooks/posts/queries/useSimilarPostQuery';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.detail(Number(id)),
    queryFn: () => fetchProjectData(Number(id), accessToken, refreshToken),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.rightSidebar(Number(id)),
    queryFn: () => fetchRightSidebarData(Number(id), accessToken, refreshToken),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.reviews.post(Number(id)),
    queryFn: () => fetchPostReviewData(Number(id), accessToken, refreshToken),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.similarPosts(Number(id)),
    queryFn: () => fetchSimilarPostsData(Number(id), accessToken, refreshToken),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectDetailClient id={Number(id)} />
    </HydrationBoundary>
  );
}

async function fetchProjectData(id: number, accessToken?: string, refreshToken?: string) {
  const response = await serverInstance(accessToken, refreshToken).get(`/v1/users/posts/${id}`);
  return ProjectDetailResponseSchema.parse(response.data);
}

async function fetchRightSidebarData(postId: number, accessToken?: string, refreshToken?: string) {
  const response = await serverInstance(accessToken, refreshToken).get(
    `/v1/users/posts/${postId}/sidebar`,
  );
  return RightSidebarResponseSchema.parse(response.data);
}

async function fetchPostReviewData(postId: number, accessToken?: string, refreshToken?: string) {
  const response = await serverInstance(accessToken, refreshToken).get(
    `/v1/users/reviews/post/${postId}`,
  );
  return PostReviewResponseSchema.parse(response.data);
}

async function fetchSimilarPostsData(postId: number, accessToken?: string, refreshToken?: string) {
  const response = await serverInstance(accessToken, refreshToken).get(
    `/v1/users/posts/${postId}/similar`,
  );
  return SimilarPostResponseSchema.parse(response.data);
}
