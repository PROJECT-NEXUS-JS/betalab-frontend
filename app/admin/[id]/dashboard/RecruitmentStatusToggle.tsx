'use client';
import Toggle from '@/components/common/atoms/Toggle';
import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
import { useChangeRecruitmentStatusMutation } from '@/hooks/dashboard/mutations/useChangeRecruitmentStatusMutation';

interface RecruitmentStatusToggleProps {
  postId: number;
}

export default function RecruitmentStatusToggle({ postId }: RecruitmentStatusToggleProps) {
  const { data: postDetail, isLoading } = useGetPostDetailQuery(postId);
  const changeStatusMutation = useChangeRecruitmentStatusMutation(postId);

  const isActive = postDetail?.data?.status === 'ACTIVE';
  const statusText = isActive ? '모집중' : '모집 완료';

  const handleToggle = (checked: boolean) => {
    changeStatusMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 items-center">
        <p className="text-base font-bold text-Dark-Gray">로딩 중...</p>
        <Toggle checked={false} disabled />
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <p className="text-base font-bold text-Dark-Gray">{statusText}</p>
      <Toggle
        checked={isActive}
        onChange={handleToggle}
        disabled={changeStatusMutation.isPending}
      />
    </div>
  );
}
