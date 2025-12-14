'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import ApplyCard, { ApplyCardDataProps } from '@/components/common/molecules/ApplyCard';
import useMyFeedbackQuery from '@/hooks/feedback/queries/useMyFeedbackQuery';
import { usePostLikeCountQuery, usePostLikeMutation, usePostLikeStatusQuery } from '@/hooks/like';
import { ParticipationStatusEnum } from '@/hooks/posts/dto/postDetail';
import useScreenerStore from '@/stores/screenerStore';
import InfoModal from '@/components/common/molecules/InfoModal';
import { showToast } from '@/components/common/toast/ToastHost';

interface Props {
  projectId: number;
  applyCardData: ApplyCardDataProps;
}

export default function ProjectDetailCardClient({ projectId, applyCardData }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const { setIsScreenerOpen } = useScreenerStore();
  const { data: feedbackDetail } = useMyFeedbackQuery(projectId);

  // 피드백이 이미 제출되었는지 여부
  const isFeedbackSubmitted = !!feedbackDetail?.feedback;
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

  // 버튼 라벨, 활성화 여부 결정
  const participationStatus = applyCardData.participationStatus;
  const { buttonLabel, isButtonDisabled, canWriteFeedback } = useMemo(() => {
    // 피드백 완료
    if (isFeedbackSubmitted) {
      return { buttonLabel: '참여 완료', isButtonDisabled: true, canWriteFeedback: false };
    }

    // 피드백 작성 가능 (승인됨)
    if (participationStatus === ParticipationStatusEnum.enum.APPROVED) {
      return { buttonLabel: '완료하기', isButtonDisabled: false, canWriteFeedback: true };
    }

    // 신청 중/참여 중 (버튼 비활성화)
    const isPendingProcess =
      participationStatus === ParticipationStatusEnum.enum.PENDING ||
      participationStatus === ParticipationStatusEnum.enum.TEST_COMPLETED ||
      participationStatus === ParticipationStatusEnum.enum.COMPLETED;

    if (isPendingProcess) {
      return { buttonLabel: '신청 완료', isButtonDisabled: true, canWriteFeedback: false };
    }

    // 기본 상태 (신청하기)
    return { buttonLabel: '신청하기', isButtonDisabled: false, canWriteFeedback: false };
  }, [participationStatus, isFeedbackSubmitted]);

  const handleRegister = () => {
    // Case A: 이미 최종 완료한 경우
    if (isFeedbackSubmitted) {
      showToast({ type: 'alert', message: '이미 피드백을 제출하셨습니다.', iconName: 'red' });
      return;
    }

    // Case B: 피드백 작성 페이지로 이동 (승인된 상태)
    if (canWriteFeedback) {
      router.push(`/project/${projectId}/feedback`);
      return;
    }

    // Case C: 이미 신청했으나 아직 승인 전이거나 진행 중인 경우 (isButtonDisabled가 true인 경우)
    if (isButtonDisabled) {
      showToast({ type: 'alert', message: '이미 신청하신 테스트입니다.', iconName: 'red' });
      return;
    }

    // Case D: 아무것도 해당 안 되면 '신청하기' 단계
    setInfoModalOpen(true);
  };

  const handleInfoModalConfirm = () => {
    setIsScreenerOpen(true);
  };

  return (
    <>
      <ApplyCard
        {...applyCardData}
        scrapClicked={handleScrap}
        registerClicked={handleRegister}
        buttonLabel={buttonLabel}
        isButtonDisabled={isButtonDisabled}
        // API 결과 반영
        scraped={isLiked?.data ?? false}
        scrapedNumber={likeCount?.data ?? 0}
      />
      <InfoModal
        type="participant"
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        onConfirm={handleInfoModalConfirm}
      />
    </>
  );
}
