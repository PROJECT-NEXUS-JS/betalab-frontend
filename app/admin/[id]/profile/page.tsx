import { cookies } from 'next/headers';
import { serverInstance } from '@/apis/server-instance';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';

import ProfileClient from './ProfileClient';

export default async function AdminProfilePage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col w-full max-w-[854px] mb-40 gap-10">
      <h2 className="text-2xl font-bold text-Black">내 프로필</h2>
      <ProfileClient id={id} />
    </div>
  );
}
