import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { serverInstance } from '@/apis/server-instance';
import Logger from '@/lib/logger';

import ApplicationClientWrapper from './ApplicationClientWrapper';
import { RightSidebarResponseSchema } from '@/hooks/posts/query/usePostRightSidebar';

export default async function ProjectApplicationPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.rightSidebar(Number(id)),
    queryFn: () => fetchRightSidebarData(Number(id)),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ApplicationClientWrapper id={Number(id)} />
    </HydrationBoundary>
  );
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
