'use client';
import Image from 'next/image';
import { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Button from '../common/atoms/Button';
import UserProfile from '../common/svg/UserProfile';

import { useApplicationQuery } from '@/hooks/dashboard/quries/useApplicationQuery';

export default function QuickActionSheet({ postId }: { postId: number }) {
  const [showAll, setShowAll] = useState(false);
  const { data: applicationData, isLoading, isError } = useApplicationQuery(postId, 'PENDING');
  const applications = applicationData?.data?.content ?? [];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="absolute bottom-[22px] right-[64px] bg-Primary-200 rounded-full p-[14px]">
          {!applicationData?.data.empty && (
            <span className="absolute top-3.75 right-4 inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-Primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-Primary-500"></span>
            </span>
          )}
          <Image src="/icons/admin-icon/bell.svg" alt="Notification" width={24} height={24} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-Black">빠른 액션</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col w-full gap-5 px-[14px]">
          <h3 className="text-base font-bold text-Black">참여 대기</h3>

          {isLoading && <p>로딩 중...</p>}
          {isError && <p>데이터를 불러오는데 실패했습니다.</p>}

          {!isLoading && !isError && applications.length === 0 && (
            <p className="text-sm text-Dark-Gray">참여 대기중인 신청이 없습니다.</p>
          )}

          {!applicationData?.data && (
            <p className="text-sm text-Dark-Gray">신청 데이터를 불러오는 중입니다.</p>
          )}

          {!isLoading && !isError && applications.length > 0 && (
            <div className="flex flex-col gap-3">
              {applications.map(item => (
                <ApplyApproveAndRejectCard
                  key={item.id}
                  name={item.applicantName}
                  imageUrl="" // 이미지 URL이 없으므로 빈 문자열 전달
                  applyDate={item.appliedAt || '날짜가 없음'}
                  handleApprove={() => console.log('Approved', item.id)}
                  handleReject={() => console.log('Rejected', item.id)}
                />
              ))}
            </div>
          )}

          <Button
            State="Solid"
            Size="lg"
            onClick={() => setShowAll(prev => !prev)}
            label={showAll ? '접기' : '전체보기'}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ApplyApproveAndRejectCard({
  name,
  imageUrl,
  applyDate,
  handleApprove,
  handleReject,
}: {
  name: string;
  imageUrl: string;
  applyDate: string;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-1 h-max">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={36}
            height={36}
            onError={e => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
            }}
            className="rounded-full"
          />
        ) : (
          <UserProfile className="w-9 h-9" />
        )}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold text-Dark-Gray">{name}</p>
          <p className="text-xs font-bold text-Dark-Gray">{applyDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button State="Sub" Size="sm" label="거절하기" onClick={handleReject} />
        <Button State="Primary" Size="sm" label="승인하기" onClick={handleApprove} />
      </div>
    </div>
  );
}
