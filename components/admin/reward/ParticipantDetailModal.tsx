'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useParticipationDetailQuery } from '@/hooks/reward/queries/useParticipationDetailQuery';
import Button from '@/components/common/atoms/Button';

function mapParticipationStatus(
  status: string | null,
  rewardStatus: string | null,
): '승인대기' | '진행 중' | '피드백 완료' | '테스트 완료' | '완료요청' | '완료' | '거절됨' {
  if (!status) return '승인대기';
  
  switch (status) {
    case 'PENDING':
      return '승인대기';
    case 'APPROVED':
      return '진행 중';
    case 'FEEDBACK_COMPLETED':
      return '피드백 완료';
    case 'TEST_COMPLETED':
      return '테스트 완료';
    case 'COMPLETED':
      if (rewardStatus === 'PENDING' || rewardStatus === null) {
        return '완료요청';
      }
      return '완료';
    case 'REJECTED':
      return '거절됨';
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

interface ParticipantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  participationId: number | null;
  participationStatus: string | null;
  rewardStatus: string | null;
  onApprove?: () => void;
}

function formatDate(dateString: string | null | undefined): string | undefined {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function ParticipantDetailModal({
  isOpen,
  onClose,
  participationId,
  participationStatus,
  rewardStatus,
  onApprove,
}: ParticipantDetailModalProps) {
  const { data, isLoading, error } = useParticipationDetailQuery(participationId);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !participationId) return null;

  const participationStatusLabel = mapParticipationStatus(participationStatus, rewardStatus);
  const rewardStatusLabel = mapRewardStatus(rewardStatus);

  const getParticipationBadgeClass = (status: string) => {
    switch (status) {
      case '승인대기':
        return 'bg-blue-600 text-sky-50';
      case '진행 중':
        return 'bg-sky-50 text-gray-600';
      case '피드백 완료':
        return 'bg-sky-50 text-gray-600';
      case '테스트 완료':
        return 'bg-sky-50 text-gray-600';
      case '완료요청':
        return 'bg-green-100 text-lime-700';
      case '완료':
        return 'bg-sky-50 text-blue-600';
      case '거절됨':
        return 'bg-gray-200 text-slate-500';
      default:
        return 'bg-gray-200 text-slate-500';
    }
  };

  const getRewardBadgeClass = (status: string) => {
    switch (status) {
      case '미지급':
        return 'bg-gray-200 text-slate-500';
      case '지급대기':
        return 'bg-gray-600 text-white';
      case '지급진행':
        return 'bg-sky-50 text-gray-600';
      case '지급완료':
        return 'bg-sky-50 text-blue-600';
      default:
        return 'bg-gray-200 text-slate-500';
    }
  };

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="absolute right-0 top-0 w-[620px] h-full px-5 py-10 bg-white rounded-tr rounded-br shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)] z-50"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full h-full flex flex-col justify-between items-start">
          <div className="self-stretch flex flex-col justify-start items-start gap-10">
            {/* Header */}
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="text-gray-900 text-xl font-medium font-['SUIT_Variable'] leading-8">
                  신청자 정보
                </div>
                <button
                  onClick={onClose}
                  className="w-6 h-6 relative overflow-hidden cursor-pointer"
                  data-size="lg"
                  data-style="x"
                >
                  <Image src="/icons/x.svg" alt="닫기" width={24} height={24} className="w-6 h-6" />
                </button>
              </div>
              <div className="inline-flex justify-start items-center gap-3">
                <div className="text-gray-900 text-sm font-medium font-['SUIT_Variable'] leading-5">
                  신청 ID: no.{participationId}
                </div>
                <div
                  data-property-1={participationStatusLabel}
                  className="flex justify-start items-start"
                >
                  <div
                    className={`h-5 px-1 ${getParticipationBadgeClass(participationStatusLabel)} rounded flex justify-center items-center gap-1`}
                    data-style="green"
                    data-icon="false"
                  >
                    <div className="text-[10px] font-bold font-['SUIT_Variable'] leading-4">
                      {participationStatusLabel}
                    </div>
                  </div>
                </div>
                <div data-property-1={rewardStatusLabel} className="flex justify-start items-start">
                  <div
                    className={`h-5 px-1 ${getRewardBadgeClass(rewardStatusLabel)} rounded flex justify-center items-center gap-1`}
                    data-style="gray"
                    data-icon="false"
                  >
                    <div className="text-[10px] font-bold font-['SUIT_Variable'] leading-4">
                      {rewardStatusLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div>로딩 중...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
              </div>
            ) : data?.data ? (
              <>
                <div className="self-stretch p-5 outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-5">
                  <div className="self-stretch text-gray-900 text-xl font-medium font-['SUIT_Variable'] leading-8">
                    기본 정보
                  </div>
                  <div className="self-stretch inline-flex flex-col justify-start items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-gray-600 text-base font-normal font-['SUIT_Variable'] leading-6">
                        이름
                      </div>
                      <div className="text-gray-900 text-base font-normal font-['SUIT_Variable'] leading-6">
                        {data.data.applicantName}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-gray-600 text-base font-normal font-['SUIT_Variable'] leading-6">
                        연락처
                      </div>
                      <div className="text-gray-900 text-base font-normal font-['SUIT_Variable'] leading-6">
                        {data.data.contactNumber}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-gray-600 text-base font-normal font-['SUIT_Variable'] leading-6">
                        이메일
                      </div>
                      <div className="text-gray-900 text-base font-normal font-['SUIT_Variable'] leading-6">
                        {data.data.applicantEmail}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 신청 정보 */}
                <div className="self-stretch p-5 outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-5">
                  <div className="self-stretch text-gray-900 text-xl font-medium font-['SUIT_Variable'] leading-8">
                    신청 정보
                  </div>
                  <div className="self-stretch inline-flex flex-col justify-start items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="w-24 text-gray-600 text-base font-normal font-['SUIT_Variable'] leading-6">
                        신청 사유
                      </div>
                      <div className="text-gray-900 text-base font-normal font-['SUIT_Variable'] leading-6">
                        {data.data.applicationReason}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="w-24 text-gray-600 text-base font-normal font-['SUIT_Variable'] leading-6">
                        신청 일시
                      </div>
                      <div className="text-gray-900 text-base font-normal font-['SUIT_Variable'] leading-6">
                        {formatDate(data.data.appliedAt) || '-'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 동의 항목 */}
                <div className="self-stretch p-5 outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-5">
                  <div className="self-stretch text-gray-900 text-xl font-medium font-['SUIT_Variable'] leading-8">
                    동의 항목
                  </div>
                  <div className="w-60 flex flex-col justify-start items-start gap-7">
                    <div className="self-stretch inline-flex justify-start items-center gap-2">
                      <div
                        data-size="md"
                        data-state={data.data.privacyAgreement ? 'checked' : 'disable'}
                        className="w-5 h-5 flex items-center justify-center"
                      >
                        <Image
                          src="/icons/check-box.svg"
                          alt={data.data.privacyAgreement ? '체크됨' : '체크 안됨'}
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="text-gray-900 text-base font-normal font-['SUIT_Variable'] leading-6">
                        개인정보 수집 및 이용 동의
                      </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <div
                        data-size="md"
                        data-state={data.data.termsAgreement ? 'checked' : 'disable'}
                        className="w-5 h-5 flex items-center justify-center"
                      >
                        <Image
                          src="/icons/check-box.svg"
                          alt={data.data.termsAgreement ? '체크됨' : '체크 안됨'}
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="text-gray-900 text-base font-normal font-['SUIT_Variable'] leading-6">
                        참여 조건 및 규칙 동의
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          {onApprove && participationStatusLabel === '승인대기' && (
            <div className="self-stretch">
              <Button
                State="Primary"
                Size="xxl"
                label="승인하기"
                onClick={async () => {
                  if (onApprove) {
                    await onApprove();
                    onClose();
                  }
                }}
                className="w-full h-12 px-7 bg-blue-600 rounded-[1px] text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
