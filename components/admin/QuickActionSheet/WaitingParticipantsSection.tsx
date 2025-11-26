'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useWaitingParticipantsQuery } from '@/hooks/dashboard/quries/useWaitingParticipantsQuery';
import {
  useApproveApplicationMutation,
  useRejectApplicationMutation,
} from '@/hooks/dashboard/mutations/useApplicationMutation';
import UserProfile from '@/components/common/svg/UserProfile';
import Button from '@/components/common/atoms/Button';
import { useRouter } from 'next/navigation';

const formatAppliedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

function ParticipantAvatar({
  profileImageUrl,
  nickname,
}: {
  profileImageUrl: string | null;
  nickname: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div data-size="md" className="w-9 h-9 relative">
      <div className="w-9 h-9 bg-sky-50 rounded-full overflow-hidden flex items-center justify-center">
        {profileImageUrl && !imageError ? (
          <Image
            src={profileImageUrl}
            alt={nickname}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <UserProfile className="w-6 h-7 text-blue-400" />
        )}
      </div>
    </div>
  );
}

export default function WaitingParticipantsSection({ postId }: { postId: number }) {
  const router = useRouter();
  const { data, isLoading, isError } = useWaitingParticipantsQuery(postId, { page: 0, size: 5 });
  const approveMutation = useApproveApplicationMutation(postId);
  const rejectMutation = useRejectApplicationMutation(postId);

  const participants = data?.data?.content || [];
  const isEmpty = participants.length === 0;

  const handleApprove = async (participant: { participationId: number }) => {
    try {
      await approveMutation.mutateAsync(participant.participationId);
    } catch (error: any) {
      console.error('승인 실패:', error);
    }
  };

  const handleReject = async (participant: { participationId: number }) => {
    try {
      await rejectMutation.mutateAsync(participant.participationId);
    } catch (error: any) {
      console.error('거절 실패:', error);
    }
  };

  const handleViewAll = () => {
    router.push(`/admin/${postId}/project-manage`);
  };

  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      <div className="self-stretch justify-start text-gray-900 text-base font-bold font-['SUIT_Variable'] leading-6">
        참여 대기
      </div>

      {isLoading ? (
        <p className="text-sm text-Dark-Gray">로딩 중...</p>
      ) : isError ? (
        <p className="text-sm text-Dark-Gray">데이터를 불러오는 데 실패했습니다.</p>
      ) : isEmpty ? (
        <p className="text-sm text-Dark-Gray">참여 대기중인 신청이 없습니다.</p>
      ) : (
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          {participants.map(participant => (
            <div
              key={participant.participationId}
              className="self-stretch inline-flex justify-between items-start"
            >
              <div className="flex justify-start items-center gap-4">
                <ParticipantAvatar
                  profileImageUrl={participant.profileImageUrl}
                  nickname={participant.nickname}
                />
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-0.5">
                  <div className="self-stretch justify-start text-gray-600 text-base font-bold font-['SUIT_Variable'] leading-6">
                    {participant.nickname}님의 신청
                  </div>
                  <div className="self-stretch justify-start text-gray-600 text-xs font-medium font-['SUIT_Variable'] leading-4">
                    신청일 : {formatAppliedDate(participant.appliedAt)}
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2">
                <button
                  data-chips="false"
                  data-icon-r="false"
                  data-size="Sm"
                  data-state="Sub"
                  className="h-9 px-3 bg-blue-100 rounded-[1px] flex justify-center items-center gap-2.5 hover:opacity-80 transition-opacity"
                  onClick={() => handleReject(participant)}
                  disabled={rejectMutation.isPending}
                >
                  <div className="justify-start text-blue-600 text-[10px] font-bold font-['SUIT_Variable'] leading-4">
                    거절하기
                  </div>
                </button>
                <button
                  data-chips="false"
                  data-icon-r="false"
                  data-size="Sm"
                  data-state="Primary"
                  className="h-9 px-3 bg-blue-600 rounded-[1px] flex justify-center items-center gap-2.5 hover:opacity-80 transition-opacity"
                  onClick={() => handleApprove(participant)}
                  disabled={approveMutation.isPending}
                >
                  <div className="justify-start text-white text-[10px] font-bold font-['SUIT_Variable'] leading-4">
                    승인하기
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isEmpty && (
        <Button
          State="Solid"
          Size="sm"
          label="전체보기"
          onClick={handleViewAll}
          className="self-stretch"
        />
      )}
    </div>
  );
}

