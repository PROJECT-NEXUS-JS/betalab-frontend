'use client';

import RewardStateList, {
  ParticipantData,
  ParticipantRowType,
} from '@/components/admin/reward/RewardStateList';
import { useParticipantsQuery } from '@/hooks/reward/queries/useParticipantsQuery';
import { ParticipantItemType } from '@/hooks/reward/dto/participants';

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
  status: string,
  rewardStatus: string | null,
): '승인대기' | '진행 중' | '완료요청' | '완료' {
  switch (status) {
    case 'PENDING':
      return '승인대기';
    case 'APPROVED':
      return '진행 중';
    case 'COMPLETED':
      // rewardStatus가 PENDING이거나 null이면 완료요청, 아니면 완료
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
  participationStatus: string,
  rewardStatus: string | null,
): ParticipantRowType {
  // 승인대기
  if (participationStatus === 'PENDING') {
    return '승인전';
  }

  // 진행 중
  if (participationStatus === 'APPROVED') {
    return '진행중';
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
  const { data, error } = useParticipantsQuery({
    postId,
    page: 0,
    size: 100,
  });

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  const filteredContent =
    data?.data.content.filter(
      (item: ParticipantItemType) => item.participationStatus !== 'REJECTED',
    ) ?? [];

  const transformedData: ParticipantData[] = filteredContent.map(
    (item: ParticipantItemType, index: number) => {
      const rowType = determineRowType(item.participationStatus, item.rewardStatus);

      return {
        number: index + 1,
        name: item.nickname,
        email: item.applicantEmail,
        participationStatus: mapParticipationStatus(item.participationStatus, item.rewardStatus),
        appliedDate: formatDate(item.appliedAt) || '2025.07.29',
        approvedDate: formatDate(item.approvedAt),
        rewardStatus: mapRewardStatus(item.rewardStatus),
        paidDate: formatDate(item.paidAt),
        type: rowType,
        onApprove: rowType === '승인전' ? () => {} : undefined,
        onComplete: rowType === '완료요청' ? () => {} : undefined,
        onPay: rowType === '지급전' ? () => {} : undefined,
      };
    },
  );

  return <RewardStateList data={transformedData} />;
}
