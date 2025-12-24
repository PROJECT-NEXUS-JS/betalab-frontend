import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import SidebarClientWrapper from './SidebarClientWrapper';

import { ProfileResponseSchema } from '@/hooks/profile/quries/useProfileQurey';

const BACKEND_URL = process.env.BACKEND_URL!;

export const metadata: Metadata = {
  title: 'Betalab Admin',
  description: 'Admin layout for managing the application',
};

export default async function AdminLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const { id } = await params;

  const SIDEBAR_ITEMS = [
    { label: '대시보드', path: `/admin/${id}/dashboard` },
    // { label: '내 프로필', path: `/admin/${id}/profile` },
    { label: '데이터 센터', path: `/admin/${id}/data-center` },
    { label: '프로젝트 관리', path: `/admin/${id}/project-manage` },
    { label: '리뷰', path: `/admin/${id}/review` },
    { label: '테스터 관리', path: `/admin/${id}/reward` },
  ];

  await queryClient.prefetchQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="max-w-7xl flex gap-10 w-full">
        <HydrationBoundary state={dehydratedState}>
          <SidebarClientWrapper items={SIDEBAR_ITEMS} />
        </HydrationBoundary>
        <div className="w-full flex-1">{children}</div>
      </div>
    </div>
  );
}

async function getProfile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${BACKEND_URL}/v1/users/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const data = await response.json();
  return ProfileResponseSchema.parse(data);
}
