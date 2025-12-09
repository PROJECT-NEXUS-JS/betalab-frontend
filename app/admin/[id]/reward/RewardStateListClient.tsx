'use client';

import RewardStateList, { ParticipantData } from '@/components/admin/reward/RewardStateList';

interface RewardStateListClientProps {
  postId: number;
}

export default function RewardStateListClient({ postId }: RewardStateListClientProps) {
  const mockData: ParticipantData[] = [
    {
      number: 1,
      name: '베타랩',
      email: 'betalab@example.com',
      participationStatus: '승인대기',
      appliedDate: '2025.07.29',
      approvedDate: undefined,
      rewardStatus: '미지급',
      paidDate: undefined,
      type: '승인전',
      onApprove: () => console.log('승인하기: 1'),
    },
    {
      number: 2,
      name: '베타랩',
      email: 'betalab@example.com',
      participationStatus: '진행 중',
      appliedDate: '2025.07.29',
      approvedDate: undefined,
      rewardStatus: '미지급',
      paidDate: undefined,
      type: '진행중',
    },
    {
      number: 3,
      name: '베타랩',
      email: 'betalab@example.com',
      participationStatus: '완료요청',
      appliedDate: '2025.07.29',
      approvedDate: undefined,
      rewardStatus: '미지급',
      paidDate: undefined,
      type: '완료요청',
      onComplete: () => console.log('완료처리: 3'),
    },
    {
      number: 4,
      name: '베타랩',
      email: 'betalab@example.com',
      participationStatus: '완료',
      appliedDate: '2025.07.29',
      approvedDate: '2025.07.29',
      rewardStatus: '지급대기',
      paidDate: undefined,
      type: '지급전',
      onPay: () => console.log('지급하기: 4'),
    },
    {
      number: 5,
      name: '베타랩',
      email: 'betalab@example.com',
      participationStatus: '완료',
      appliedDate: '2025.07.29',
      approvedDate: '2025.07.29',
      rewardStatus: '지급진행',
      paidDate: undefined,
      type: '지급중',
    },
    {
      number: 6,
      name: '베타랩',
      email: 'betalb@example.com',
      participationStatus: '완료',
      appliedDate: '2025.07.29',
      approvedDate: '2025.07.29',
      rewardStatus: '지급완료',
      paidDate: '2025.07.29',
      type: '지급완료',
    },
  ];

  return <RewardStateList data={mockData} />;
}
