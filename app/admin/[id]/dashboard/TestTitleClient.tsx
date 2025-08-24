'use client';
import { useGetRightSidebar } from '@/hooks/posts/queries/usePostRightSidebar';

export default function TestTitleClient({ id }: { id: number }) {
  const {
    data: rightSidebarData,
    isLoading: isRightSidebarLoading,
    isError: isRightSidebarError,
  } = useGetRightSidebar(Number(id));

  if (rightSidebarData && !isRightSidebarLoading && !isRightSidebarError) {
    return <h2 className="text-2xl font-bold text-Black">{rightSidebarData.data.testName}</h2>;
  }
}
