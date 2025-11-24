import Image from 'next/image';

export type DashboardConfigEnum =
  | 'likes'
  | 'pendingApplications'
  | 'approvedParticipants'
  | 'reviews'
  | 'views'
  | 'pendingPayments';
export interface DashBoardCardProps {
  current: number;
  previousDay: number;
  changeAmount: number;
  type: DashboardConfigEnum;
}

export default function DashBoardCard({
  current,
  previousDay,
  changeAmount,
  type,
}: DashBoardCardProps) {
  return (
    <div className="flex w-[258px] h-auto p-[14px] items-end gap-[10px] rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)]">
      <div className="w-full flex flex-col gap-3">
        <h3 className="text-[40px] text-Black font-bold">{current}</h3>
        <div className="flex justify-start items-center gap-1">
          <p className="text-Gray-300 text-sm font-medium">{`${TEXT_MAP[type]} ${changeAmount}`}</p>
          <Image
            src={`/icons/admin-icon/triangle.svg`}
            alt={type}
            width={16}
            height={16}
            className={changeAmount > 0 ? '' : 'rotate-180'}
          />
        </div>
      </div>
      <div className="h-full flex justify-end items-end">
        <div className="w-15 h-15 flex items-center justify-center">
          <Image src={ICON_MAP[type]} alt={type} width={40} height={40} />
        </div>
      </div>
    </div>
  );
}

const TEXT_MAP = {
  likes: '스크랩 수',
  pendingApplications: '대기 중인 신청 수',
  approvedParticipants: '승인된 참가자 수',
  reviews: '리뷰 수',
  views: '조회 수',
  pendingPayments: '지급 대기',
};

const ICON_MAP = {
  likes: '/icons/admin-icon/bookmark.svg',
  pendingApplications: '/icons/admin-icon/smile.svg',
  approvedParticipants: '/icons/admin-icon/check.svg',
  reviews: '/icons/admin-icon/star.svg',
  views: '/icons/admin-icon/clicked.svg',
  pendingPayments: '/icons/admin-icon/dollar.svg',
};
