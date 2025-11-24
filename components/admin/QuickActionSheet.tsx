'use client';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
export default function QuickActionSheet({ postId }: { postId: number }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="absolute bottom-[22px] right-[64px] bg-Primary-200 rounded-full p-[14px]">
          <Image src="/icons/admin-icon/bell.svg" alt="Notification" width={24} height={24} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-Black">빠른 액션</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col w-full gap-5 px-[14px]">
          <h3 className="text-base font-bold text-Black">참여 대기</h3>

          <p className="text-sm text-Dark-Gray">참여 대기중인 신청이 없습니다.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
