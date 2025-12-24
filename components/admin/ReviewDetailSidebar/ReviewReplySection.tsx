'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Button from '@/components/common/atoms/Button';

interface ReviewReplySectionProps {
  replyContent?: string | null;
  replyDate?: string | null;
  onReplySubmit: (content: string) => void;
  onReplyEdit?: () => void;
  onReplyDelete?: () => void;
  isEditing?: boolean;
  replyText: string;
  onReplyTextChange: (text: string) => void;
}

export default function ReviewReplySection({
  replyContent,
  replyDate,
  onReplySubmit,
  onReplyEdit,
  onReplyDelete,
  isEditing = false,
  replyText,
  onReplyTextChange,
}: ReviewReplySectionProps) {
  const [isReplying, setIsReplying] = useState(!replyContent || isEditing);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  React.useEffect(() => {
    setIsReplying(isEditing);
  }, [isEditing]);

  return (
    <>
      {isReplying ? (
        <div className="w-full p-5 bg-gray-200 rounded outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col gap-11">
          <div className="flex flex-col gap-5">
            <div className="text-base font-bold text-gray-900">답변</div>
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={e => onReplyTextChange(e.target.value)}
                placeholder="답변을 입력하세요..."
                className="w-full h-[153px] p-3 resize-none text-base text-gray-900"
              />
            </div>
          </div>
        </div>
      ) : replyContent ? (
        <div className="w-full p-5 bg-gray-200 rounded outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col gap-11">
          <div className="flex flex-col gap-5">
            <div className="text-base font-bold text-gray-900">답변</div>
            <div className="max-h-52 overflow-y-auto">
              <div className="text-base font-medium text-gray-900 leading-6">{replyContent}</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="w-full h-0 relative">
                <div className="w-full h-0 absolute rounded-[20px] outline-[1.50px] outline-offset-[-0.75px] outline-gray-400"></div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-base font-medium text-gray-400">
                  {replyDate ? `${replyDate}에 답변` : '답변 완료'}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onReplyEdit}
                    className="p-2.5 bg-white rounded outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center"
                  >
                    <Image src="/icons/admin-icon/pen.svg" alt="수정" width={24} height={24} />
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-2.5 bg-white rounded outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center"
                  >
                    <Image src="/icons/admin-icon/delete.svg" alt="삭제" width={24} height={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className="w-[460px] p-10 flex flex-col justify-center items-end gap-10 bg-white rounded shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)]"
          showCloseButton={false}
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-10">
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="inline-flex flex-col justify-start items-start gap-2">
                  <DialogTitle className="text-xl font-bold text-gray-900 leading-8">
                    답변을 삭제할까요?
                  </DialogTitle>
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-6 h-6 relative overflow-hidden flex items-center justify-center"
                >
                  <XIcon className="w-3 h-3 text-slate-500" strokeWidth={1.5} />
                </button>
              </div>
              <div className="self-stretch min-w-72 text-gray-600 text-sm font-bold leading-5">
                삭제 시 복구할 수 없어요
              </div>
            </div>
          </div>
          <DialogFooter className="inline-flex justify-start items-center gap-4">
            <Button
              State="Solid"
              Size="lg"
              onClick={() => setIsDeleteModalOpen(false)}
              label="취소하기"
              className="h-11 px-5"
            />
            <Button
              State="Primary"
              Size="lg"
              onClick={() => {
                onReplyDelete?.();
                setIsDeleteModalOpen(false);
              }}
              label="삭제하기"
              className="h-11 px-5"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
