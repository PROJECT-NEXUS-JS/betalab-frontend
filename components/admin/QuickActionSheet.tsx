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
import WaitingParticipantsSection from './QuickActionSheet/WaitingParticipantsSection';
import RecentReviewsSection from './QuickActionSheet/RecentReviewsSection';

export default function QuickActionSheet({ postId }: { postId: number }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="absolute bottom-[22px] right-[64px] bg-Primary-200 rounded-full p-[14px]">
          <Image src="/icons/admin-icon/bell.svg" alt="Notification" width={24} height={24} />
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg w-[500px] px-5">
        <div className="flex flex-col h-full py-5">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-Black">빠른 액션</SheetTitle>
          </SheetHeader>
          <div className="w-full flex flex-col justify-start items-start gap-5 flex-1 overflow-y-auto">
            <WaitingParticipantsSection postId={postId} />
            <RecentReviewsSection postId={postId} />
          </div>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
