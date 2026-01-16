'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Button from '@/components/common/atoms/Button';

interface PostDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PostDeleteModal({ isOpen, onClose, onConfirm }: PostDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-10 w-[480px] max-w-[calc(100%-2rem)] rounded-2xl shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)]"
        showCloseButton={false}
      >
        <DialogTitle className="text-center text-subtitle-01 text-Black font-bold">
          프로젝트를 삭제하시겠습니까?
        </DialogTitle>
        <div className="flex flex-col gap-10">
          {/* 본문 설명 */}
          <p className="text-center text-subtitle-02 text-Gray-300 ">
            삭제된 프로젝트는 다시 복구할 수 없으며,
            <br />
            수집된 모든 응답 데이터가 영구히 삭제됩니다.
          </p>

          {/* 버튼 영역 */}
          <div className="flex gap-x-2 w-full">
            <Button State="Solid" Size="xl" label="취소" onClick={onClose} className="flex-1" />
            <Button
              State="Primary"
              Size="xl"
              label="삭제하기"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
