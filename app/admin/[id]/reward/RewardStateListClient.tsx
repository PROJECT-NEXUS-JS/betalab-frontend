'use client';

import { useState } from 'react';
import RewardStateList, {
  ParticipantData,
  ParticipantRowType,
} from '@/components/admin/reward/RewardStateList';
import { useParticipantsQuery } from '@/hooks/reward/queries/useParticipantsQuery';
import { ParticipantItemType } from '@/hooks/reward/dto/participants';
import { useApproveApplicationMutation } from '@/hooks/dashboard/mutations/useApplicationMutation';
import { useCompleteApplicationMutation } from '@/hooks/dashboard/mutations/useApplicationMutation';
import { usePayRewardMutation } from '@/hooks/reward/mutations/usePayRewardMutation';
import ParticipantDetailModal from '@/components/admin/reward/ParticipantDetailModal';

interface RewardStateListClientProps {
  postId: number;
}

function formatDate(dateString: string | null | undefined): string | undefined {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function mapParticipationStatus(
  status: string | null,
  rewardStatus: string | null,
): '승인대기' | '진행 중' | '완료요청' | '완료' {
  if (!status) return '승인대기';

  switch (status) {
    case 'PENDING':
      return '승인대기';
    case 'APPROVED':
      return '진행 중';
    case 'FEEDBACK_COMPLETED':
      return '완료요청';
    case 'TEST_COMPLETED':
      return '완료';
    case 'COMPLETED':
      if (rewardStatus === 'PENDING' || rewardStatus === null) {
        return '완료요청';
      }
      return '완료';
    case 'REJECTED':
      return '승인대기';
    default:
      return '승인대기';
  }
}

function mapRewardStatus(status: string | null): '미지급' | '지급대기' | '지급진행' | '지급완료' {
  if (!status) return '미지급';
  switch (status) {
    case 'PENDING':
      return '미지급';
    case 'PAYMENT_PENDING':
      return '지급대기';
    case 'PAYMENT_IN_PROGRESS':
      return '지급진행';
    case 'PAID':
      return '지급완료';
    default:
      return '미지급';
  }
}

function determineRowType(
  participationStatus: string | null,
  rewardStatus: string | null,
  isPaid: boolean,
): ParticipantRowType {
  if (!participationStatus) {
    return '승인전';
  }

  // 승인대기
  if (participationStatus === 'PENDING') {
    return '승인전';
  }

  // 진행 중
  if (participationStatus === 'APPROVED') {
    return '진행중';
  }

  // 피드백 완료
  if (participationStatus === 'FEEDBACK_COMPLETED') {
    return '완료요청';
  }

  // 테스트 완료
  if (participationStatus === 'TEST_COMPLETED') {
    if (isPaid) {
      return '지급완료';
    }
    return '지급전';
  }

  // 거절됨
  if (participationStatus === 'REJECTED') {
    return '승인전';
  }

  // 완료 요청
  if (participationStatus === 'COMPLETED') {
    if (rewardStatus === 'PENDING' || rewardStatus === null) {
      return '완료요청';
    }
    // 지급대기
    if (rewardStatus === 'PAYMENT_PENDING') {
      return '지급전';
    }
    // 지급 진행 중
    if (rewardStatus === 'PAYMENT_IN_PROGRESS') {
      return '지급중';
    }
    // 지급완료
    if (rewardStatus === 'PAID') {
      return '지급완료';
    }
  }
  return '승인전';
}

export default function RewardStateListClient({ postId }: RewardStateListClientProps) {
  const [selectedParticipationId, setSelectedParticipationId] = useState<number | null>(null);
  const [selectedParticipationStatus, setSelectedParticipationStatus] = useState<string | null>(
    null,
  );
  const [selectedRewardStatus, setSelectedRewardStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error } = useParticipantsQuery({
    postId,
    page: 0,
    size: 100,
  });

  const approveMutation = useApproveApplicationMutation(postId);
  const completeMutation = useCompleteApplicationMutation(postId);
  const payRewardMutation = usePayRewardMutation(postId);

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  const filteredContent =
    data?.data.content.filter(
      (item: ParticipantItemType) => item.participationStatus !== 'REJECTED',
    ) ?? [];

  const transformedData: ParticipantData[] = filteredContent.map(
    (item: ParticipantItemType, index: number) => {
      const rowType = determineRowType(item.participationStatus, item.rewardStatus, item.isPaid);

      return {
        number: index + 1,
        name: item.nickname,
        email: item.applicantEmail,
        participationId: item.participationId,
        participationStatus: mapParticipationStatus(item.participationStatus, item.rewardStatus),
        appliedDate: formatDate(item.appliedAt) || '2025.07.29',
        approvedDate: formatDate(item.approvedAt),
        rewardStatus: mapRewardStatus(item.rewardStatus),
        paidDate: formatDate(item.paidAt),
        type: rowType,
        onApprove:
          rowType === '승인전'
            ? async () => {
                try {
                  await approveMutation.mutateAsync(item.participationId);
                } catch (error) {
                  console.error('승인 실패:', error);
                }
              }
            : undefined,
        onComplete:
          rowType === '완료요청'
            ? async () => {
                try {
                  await completeMutation.mutateAsync(item.participationId);
                } catch (error) {
                  console.error('완료처리 실패:', error);
                }
              }
            : undefined,
        onPay:
          rowType === '지급전'
            ? async () => {
                try {
                  await payRewardMutation.mutateAsync(item.participationId);
                  window.location.reload();
                } catch (error) {
                  console.error('리워드 지급 실패:', error);
                }
              }
            : undefined,
      };
    },
  );

  const handleRowClick = (row: ParticipantData) => {
    const originalItem = filteredContent.find(
      (item: ParticipantItemType) => item.participationId === row.participationId,
    );
    if (originalItem) {
      setSelectedParticipationId(row.participationId);
      setSelectedParticipationStatus(originalItem.participationStatus);
      setSelectedRewardStatus(originalItem.rewardStatus);
      setIsModalOpen(true);
    }
  };

  const handleApproveFromModal = async () => {
    if (selectedParticipationId) {
      try {
        await approveMutation.mutateAsync(selectedParticipationId);
      } catch (error) {
        console.error('승인 실패:', error);
      }
    }
  };

  return (
    <>
      <RewardStateList data={transformedData} onRowClick={handleRowClick} />
      <ParticipantDetailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedParticipationId(null);
        }}
        participationId={selectedParticipationId}
        participationStatus={selectedParticipationStatus}
        rewardStatus={selectedRewardStatus}
        onApprove={selectedParticipationStatus === 'PENDING' ? handleApproveFromModal : undefined}
      />
    </>
  );
}
