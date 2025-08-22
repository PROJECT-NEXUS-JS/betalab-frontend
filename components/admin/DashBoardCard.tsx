import Image from 'next/image';

export interface DashBoardCardProps {
  current: number;
  previousDay: number;
  changeAmount: number;
  type: 'likes' | 'pendingApplications' | 'approvedParticipants' | 'reviews' | 'views';
}

export default function DashBoardCard({
  current,
  previousDay,
  changeAmount,
  type,
}: DashBoardCardProps) {
  return (
    <div className="flex w-[258px] h-auto p-[14px] flex-col items-start gap-[10px] rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)]">
      <div className="w-full flex flex-col gap-3">
        <h3 className="text-[40px] text-Black font-bold">{current}</h3>
        <p>{`${TEXT_MAP[type]} ${changeAmount}`}</p>
      </div>
      <div className="h-full flex justify-end items-end">
        <div className="w-25 h-25 flex items-center justify-center">
          <Image src={`/images/${type}.png`} alt={type} width={40} height={40} />
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
};
