import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { serverInstance } from '@/apis/server-instance';

import ProjectDetailClient from './ProjectDetailClient';
import { similarPostData } from './data';
import Logger from '@/lib/logger';

import { ProjectDetailResponseSchema } from '@/hooks/posts/query/usePostDetailQuery';
import { RightSidebarResponseSchema } from '@/hooks/posts/query/usePostRightSidebar';
import { PostReviewResponseSchema } from '@/hooks/review/quries/usePostReviewQuery';
import { SimilarPostResponseSchema } from '@/hooks/posts/query/useSimilarPostQuery';

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

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.rightSidebar(Number(id)),
    queryFn: () => fetchRightSidebarData(Number(id)),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.reviews.post(Number(id)),
    queryFn: () => fetchPostReviewData(Number(id)),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.similarPosts(Number(id)),
    queryFn: () => fetchSimilarPostsData(Number(id)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectDetailClient id={Number(id)} />
    </HydrationBoundary>
  );
}

async function fetchProjectData(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(`/v1/users/posts/${id}`);
    Logger.log('ProjectData 원본:', response.data);

    const parsedData = ProjectDetailResponseSchema.parse(response.data);
    Logger.log('ProjectData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    Logger.error('ProjectData 파싱 실패:', err);
    throw err; // 필요하면 에러를 상위로 던짐
  }
}

async function fetchRightSidebarData(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(`/v1/users/posts/${postId}/sidebar`);
    Logger.log('RightSidebarData 원본:', response.data);

    const parsedData = RightSidebarResponseSchema.parse(response.data);
    Logger.log('RightSidebarData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    Logger.error('RightSidebarData 파싱 실패:', err);
    throw err;
  }
}

async function fetchPostReviewData(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(`/v1/users/reviews/post/${postId}`);
    Logger.log('PostReviewData 원본:', response.data);

    const parsedData = PostReviewResponseSchema.parse(response.data);
    Logger.log('PostReviewData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    Logger.error('PostReviewData 파싱 실패:', err);
    throw err;
  }
}

async function fetchSimilarPostsData(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(`/v1/users/posts/${postId}/similar`);
    Logger.log('PostReviewData 원본:', response.data);

    const parsedData = SimilarPostResponseSchema.parse(response.data);
    Logger.log('PostReviewData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    Logger.error('PostReviewData 파싱 실패:', err);
    throw err;
  }
}
