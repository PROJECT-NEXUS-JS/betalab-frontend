'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import { usePostLikeCountQuery, usePostLikeMutation, usePostLikeStatusQuery } from '@/hooks/like';
import { ParticipationStatusEnum } from '@/hooks/posts/dto/postDetail';
import useScreenerStore from '@/stores/screenerStore';
import InfoModal from '@/components/common/molecules/InfoModal';

interface Props {
  projectId: number;
  ApplyCardProps: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'>;
}

export default function ProjectDetailCardClient({ projectId, ApplyCardProps }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const { setIsScreenerOpen } = useScreenerStore();
  const { data: isLiked } = usePostLikeStatusQuery(projectId);
  const { data: likeCount } = usePostLikeCountQuery(projectId);

  const postLikeMutation = usePostLikeMutation();

  const handleScrap = () => {
    postLikeMutation.mutate(projectId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['postLikeStatus', projectId] });
        queryClient.invalidateQueries({ queryKey: ['postLikeCount', projectId] });
        queryClient.invalidateQueries({
          queryKey: ['myBookmarks'],
          refetchType: 'active',
        });
      },
    });
  };

  const handleRegister = () => {
    if (ApplyCardProps.participationStatus === ParticipationStatusEnum.enum.TEST_COMPLETED) {
      router.push(`/project/${projectId}/feedback`);
    } else {
      setInfoModalOpen(true);
    }
  };

  const handleInfoModalConfirm = () => {
    setIsScreenerOpen(true);
  };

  const updatedProps = {
    ...ApplyCardProps,
    scrapedNumber: likeCount?.data || 0,
    scraped: isLiked?.data || false,
  };

  return (
    <>
      <ApplyCard {...updatedProps} scrapClicked={handleScrap} registerClicked={handleRegister} />
      <InfoModal
        type="participant"
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        onConfirm={handleInfoModalConfirm}
      />
    </>
  );
}
