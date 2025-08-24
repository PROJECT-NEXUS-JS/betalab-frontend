'use client';

import { useQueryClient } from '@tanstack/react-query';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import { usePostLikeCountQuery, usePostLikeMutation, usePostLikeStatusQuery } from '@/hooks/like';

type Props = Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> & {
  postId: number;
};

export default function ProjectDetailCardClient(props: Props) {
  const queryClient = useQueryClient();
  const { postId, ...applyCardProps } = props;

  const { data: isLiked } = usePostLikeStatusQuery(postId);
  const { data: likeCount } = usePostLikeCountQuery(postId);

  const postLikeMutation = usePostLikeMutation();

  const handleScrap = () => {
    postLikeMutation.mutate(postId, {
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: ['postLikeStatus', postId] });
        queryClient.invalidateQueries({ queryKey: ['postLikeCount', postId] });
        queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
      },
    });
  };

  const handleRegister = () => {
    console.log('register clicked');
  };

  const updatedProps = {
    ...applyCardProps,
    scrapedNumber: likeCount?.data || 0,
    scraped: isLiked?.data || false,
  };

  return (
    <ApplyCard {...updatedProps} scrapClicked={handleScrap} registerClicked={handleRegister} />
  );
}
