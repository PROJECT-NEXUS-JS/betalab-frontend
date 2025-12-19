'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import { usePostLikeCountQuery, usePostLikeMutation, usePostLikeStatusQuery } from '@/hooks/like';
import { ParticapationStatusEnum } from '@/hooks/posts/dto/postDetail';
import useScreenerStore from '@/stores/screenerStore';

interface Props {
  projectId: number;
  ApplyCardProps: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'>;
}

export default function ProjectDetailCardClient({ projectId, ApplyCardProps }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setIsScreenerOpen } = useScreenerStore();
  const { data: isLiked } = usePostLikeStatusQuery(projectId);
  const { data: likeCount } = usePostLikeCountQuery(projectId);

  const postLikeMutation = usePostLikeMutation();

  const handleScrap = () => {
    postLikeMutation.mutate(projectId, {
      onSuccess: (data: { data: { isLiked: boolean } }) => {
        queryClient.invalidateQueries({ queryKey: ['postLikeStatus', projectId] });
        queryClient.invalidateQueries({ queryKey: ['postLikeCount', projectId] });
        // 쿼리 없이 바로 refetch
        queryClient.invalidateQueries({
          queryKey: ['myBookmarks'],
          refetchType: 'active',
        });
      },
    });
  };

  const handleRegister = () => {
    // status 받아서 테스트를 완료했으면 피드백 페이지로 이동
    if (ApplyCardProps.participationStatus === ParticapationStatusEnum.enum.TEST_COMPLETED) {
      router.push(`/project/${projectId}/feedback`);
    } else {
      // 스크리너 오픈
      setIsScreenerOpen(true);
    }
  };

  const updatedProps = {
    ...ApplyCardProps,
    scrapedNumber: likeCount?.data || 0,
    scraped: isLiked?.data || false,
  };

  return (
    <ApplyCard {...updatedProps} scrapClicked={handleScrap} registerClicked={handleRegister} />
  );
}
