import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { serverInstance } from '@/apis/server-instance';

import Logger from '@/lib/logger';

import { ProjectDetailResponseSchema } from '@/hooks/posts/queries/usePostDetailQuery';

export default async function FeebackPage({
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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
    </HydrationBoundary>
  );
}

async function fetchProjectData(id: number, accessToken?: string, refreshToken?: string) {
  try {
    const response = await serverInstance(accessToken, refreshToken).get(`/v1/users/posts/${id}`);
    Logger.log('ProjectData 원본:', response.data);

    const parsedData = ProjectDetailResponseSchema.parse(response.data);
    Logger.log('ProjectData 파싱 성공:', parsedData);

    return parsedData;
  } catch (err) {
    Logger.error('ProjectData 파싱 실패:', err);
    throw err; // 필요하면 에러를 상위로 던짐
  }
}