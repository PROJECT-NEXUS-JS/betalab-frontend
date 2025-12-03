'use client';

import { ParticipantType } from '@/hooks/reward/dto/participants';
import Button from '@/components/common/atoms/Button';

interface ParticipantsTableProps {
  participants: ParticipantType[];
  onApprove?: (participationId: number) => void;
  onComplete?: (participationId: number) => void;
  onPay?: (participationId: number) => void;
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const getStatusBadge = (status: string, type: 'participation' | 'reward') => {
  if (type === 'participation') {
    switch (status) {
      case 'PENDING':
        return { text: '승인대기', bg: 'bg-blue-600', textColor: 'text-sky-50' };
      case 'APPROVED':
        return { text: '진행 중', bg: 'bg-sky-50', textColor: 'text-gray-600' };
      case 'COMPLETED':
        return { text: '완료', bg: 'bg-sky-50', textColor: 'text-blue-600' };
      case 'REJECTED':
        return { text: '거절', bg: 'bg-gray-200', textColor: 'text-gray-600' };
      default:
        return { text: status, bg: 'bg-gray-200', textColor: 'text-gray-600' };
    }
  } else {
    if (!status || status === null) {
      return { text: '미지급', bg: 'bg-gray-200', textColor: 'text-slate-500' };
    }
    switch (status) {
      case 'PENDING':
        return { text: '미지급', bg: 'bg-gray-200', textColor: 'text-slate-500' };
      case 'PAYMENT_PENDING':
        return { text: '지급대기', bg: 'bg-gray-600', textColor: 'text-white' };
      case 'PAYMENT_IN_PROGRESS':
        return { text: '지급진행', bg: 'bg-sky-50', textColor: 'text-gray-600' };
      case 'PAID':
        return { text: '지급완료', bg: 'bg-sky-50', textColor: 'text-blue-600' };
      default:
        return { text: status || '미지급', bg: 'bg-gray-200', textColor: 'text-slate-500' };
    }
  }
};

export default function ParticipantsTable({
  participants,
  onApprove,
  onComplete,
  onPay,
}: ParticipantsTableProps) {
  const getActionButton = (participant: ParticipantType) => {
    if (participant.participationStatus === 'PENDING') {
      return (
        <div className="flex justify-start items-start">
          <Button
            State="Primary"
            Size="sm"
            onClick={() => onApprove?.(participant.participationId)}
            label="승인하기"
            className="bg-blue-600 rounded-[1px]"
          />
        </div>
      );
    }

    if (participant.participationStatus === 'APPROVED') {
      return <div className="text-gray-600 text-sm font-medium">-</div>;
    }

    if (participant.participationStatus === 'COMPLETED' && participant.rewardStatus === 'PENDING') {
      return (
        <div className="flex justify-start items-start">
          <Button
            State="Primary"
            Size="sm"
            onClick={() => onComplete?.(participant.participationId)}
            label="완료처리"
            className="bg-lime-700 rounded-[1px] hover:bg-lime-800"
          />
        </div>
      );
    }

    if (
      participant.participationStatus === 'COMPLETED' &&
      participant.rewardStatus === 'PAYMENT_PENDING'
    ) {
      return (
        <div className="flex justify-start items-start">
          <Button
            State="Secondary"
            Size="sm"
            onClick={() => onPay?.(participant.participationId)}
            label="지급하기"
            className="bg-gray-900 rounded-[1px] hover:bg-gray-800"
          />
        </div>
      );
    }

    return <div className="text-gray-600 text-sm font-medium">-</div>;
  };

  const getParticipationBadge = (participant: ParticipantType) => {
    const badge = getStatusBadge(participant.participationStatus, 'participation');
    if (participant.participationStatus === 'COMPLETED' && participant.rewardStatus === 'PENDING') {
      return { text: '완료요청', bg: 'bg-green-100', textColor: 'text-lime-700' };
    }
    return badge;
  };

  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-5">
      <div className="w-[854px] bg-white inline-flex justify-start items-center gap-5">
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">No.</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">참여자</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden max-w-[200px]">
          <div className="text-gray-600 text-sm font-bold leading-5">이메일</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">승인</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">승인 신청일</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">승인일</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">리워드</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">리워드 지급일</div>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <div className="text-gray-600 text-sm font-bold leading-5">액션</div>
        </div>
      </div>

      {/* Table Rows */}
      {participants.map((participant, index) => {
        const participationBadgeStyle = getParticipationBadge(participant);
        const rewardBadge = getStatusBadge(participant.rewardStatus || '', 'reward');

        return (
          <div key={participant.participationId} className="inline-flex justify-start items-start">
            <div className="w-[854px] h-9 bg-white flex justify-start items-center gap-5">
              <div className="flex justify-start items-center overflow-hidden">
                <div className="text-gray-600 text-sm font-medium leading-5">{index + 1}</div>
              </div>
              <div className="flex justify-start items-center overflow-hidden">
                <div className="text-gray-600 text-sm font-medium leading-5 line-clamp-1">
                  {participant.nickname}
                </div>
              </div>
              <div className="flex justify-start items-center overflow-hidden max-w-[200px]">
                <div className="text-gray-600 text-sm font-medium leading-5 line-clamp-1 truncate">
                  {participant.applicantEmail}
                </div>
              </div>
              <div className="flex justify-start items-center overflow-hidden">
                <div
                  className={`h-5 px-1 ${participationBadgeStyle.bg} rounded flex justify-center items-center gap-1`}
                >
                  <div
                    className={`${participationBadgeStyle.textColor} text-[10px] font-bold leading-4`}
                  >
                    {participationBadgeStyle.text}
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center overflow-hidden">
                <div className="text-gray-600 text-sm font-medium leading-5">
                  {formatDate(participant.appliedAt)}
                </div>
              </div>
              <div className="flex justify-start items-center overflow-hidden">
                <div className="text-gray-600 text-sm font-medium leading-5">
                  {formatDate(participant.approvedAt)}
                </div>
              </div>
              <div className="flex justify-start items-center overflow-hidden">
                <div
                  className={`h-5 px-1 ${rewardBadge.bg} rounded flex justify-center items-center gap-1`}
                >
                  <div className={`${rewardBadge.textColor} text-[10px] font-bold leading-4`}>
                    {rewardBadge.text}
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center overflow-hidden">
                <div className="text-gray-600 text-sm font-medium leading-5">
                  {formatDate(participant.paidAt)}
                </div>
              </div>
              <div className="flex justify-start items-start">{getActionButton(participant)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
