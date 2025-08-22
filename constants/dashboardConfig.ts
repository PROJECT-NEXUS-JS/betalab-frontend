import { DashboardConfigEnum } from '@/components/admin/DashBoardCard';

export const STATS_CONFIG: Array<{ key: DashboardConfigEnum; label: string }> = [
  {
    key: 'views',
    label: '조회수',
  },
  {
    key: 'likes',
    label: '좋아요',
  },
  {
    key: 'pendingApplications',
    label: '대기 중인 신청',
  },
  {
    key: 'approvedParticipants',
    label: '승인된 참여자',
  },
  {
    key: 'reviews',
    label: '리뷰 수',
  },
];
