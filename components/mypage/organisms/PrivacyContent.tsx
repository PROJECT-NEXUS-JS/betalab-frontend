'use client';

import Button from '@/components/common/atoms/Button';
import { useAccountInfoQuery } from '@/hooks/mypage/queries/useAccountInfoQuery';
import { Skeleton } from '@/components/ui/skeleton';

export default function PrivacyContent({ onBack }: { onBack: () => void }) {
  const { data: accountInfo, isLoading } = useAccountInfoQuery();

  return (
    <div className="w-full inline-flex flex-col justify-start items-end gap-10">
      <div className="self-stretch flex flex-col justify-start items-start">
        <p className="text-body-02 font-medium text-Dark-Gray mb-5">
          개인 정보는 상대방에게 노출되지 않습니다.
        </p>
      </div>

      <div className="self-stretch flex flex-col justify-start items-end gap-5">
        <div className="self-stretch inline-flex justify-start items-center gap-10">
          <div className="text-body-01 font-semibold text-Black">연결된 카카오 계정</div>
          {isLoading ? (
            <Skeleton className="w-[556px] h-11" />
          ) : (
            <div className="w-[556px] p-4 bg-Gray-100 rounded-sm flex justify-between items-center">
              <div className="flex-1 text-caption-01 font-bold text-Light-Gray">
                {accountInfo?.data?.email || '정보 없음'}
              </div>
            </div>
          )}
        </div>

        <div className="self-stretch inline-flex justify-start items-center gap-10">
          <div className="text-body-01 font-semibold text-Black">비밀번호</div>
          {isLoading ? (
            <Skeleton className="w-[556px] h-11" />
          ) : (
            <div className="w-[556px] p-4 bg-Gray-100 rounded-sm flex justify-between items-center ml-15">
              <div className="flex-1 text-caption-01 font-bold text-Light-Gray">********</div>
            </div>
          )}
        </div>
      </div>

      <Button
        label="이전으로"
        Size="lg"
        State="Default"
        className="cursor-pointer"
        onClick={onBack}
      />
    </div>
  );
}
