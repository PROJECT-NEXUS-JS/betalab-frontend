'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import { usePostLikeCountQuery, usePostLikeMutation, usePostLikeStatusQuery } from '@/hooks/like';

interface Props {
  projectId: number;
  ApplyCardProps: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'>;
}

export default function ProjectDetailCardClient({ projectId, ApplyCardProps }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: isLiked } = usePostLikeStatusQuery(projectId);
  const { data: likeCount } = usePostLikeCountQuery(projectId);

  const postLikeMutation = usePostLikeMutation();

  const handleScrap = () => {
    postLikeMutation.mutate(projectId, {
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: ['postLikeStatus', projectId] });
        queryClient.invalidateQueries({ queryKey: ['postLikeCount', projectId] });
        queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
      },
    });
  };

  const handleRegister = () => {
    router.push(`/project/${projectId}/application`);
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
