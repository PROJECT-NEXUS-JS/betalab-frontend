import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import ProjectDetailClient from './ProjectDetailClient';
import { similarPostData } from './data';
import { queryKeys } from '@/constants/query-keys';
import { serverInstance } from '@/apis/server-instance';

import { ProjectDetailResponseSchema } from '@/hooks/posts/query/usePostDetailQuery';
import { RightSidebarResponseSchema } from '@/hooks/posts/query/usePostRightSidebar';
import { PostReviewResponseSchema } from '@/hooks/review/quries/usePostReviewQuery';

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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectDetailClient id={Number(id)} similarPostData={similarPostData} />
    </HydrationBoundary>
  );
}

async function fetchProjectData(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(`/v1/users/posts/${id}`);
    console.log('ProjectData 원본:', response.data);

    const parsedData = ProjectDetailResponseSchema.parse(response.data);
    console.log('ProjectData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    console.error('ProjectData 파싱 실패:', err);
    throw err; // 필요하면 에러를 상위로 던짐
  }
}

async function fetchRightSidebarData(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(`/v1/users/posts/${postId}/sidebar`);
    console.log('RightSidebarData 원본:', response.data);

    const parsedData = RightSidebarResponseSchema.parse(response.data);
    console.log('RightSidebarData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    console.error('RightSidebarData 파싱 실패:', err);
    throw err;
  }
}

async function fetchPostReviewData(postId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await serverInstance(accessToken).get(`/v1/users/reviews/post/${postId}`);
    console.log('PostReviewData 원본:', response.data);

    const parsedData = PostReviewResponseSchema.parse(response.data);
    console.log('PostReviewData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    console.error('PostReviewData 파싱 실패:', err);
    throw err;
  }
}
