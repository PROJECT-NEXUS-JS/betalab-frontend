'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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

  React.useEffect(() => {
    if (isEditing) {
      setIsReplying(true);
    }
  }, [isEditing]);

  if (isReplying && !replyContent) {
    return (
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
    );
  }

  if (replyContent) {
    return (
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
                  onClick={onReplyDelete}
                  className="p-2.5 bg-white rounded outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center"
                >
                  <Image src="/icons/admin-icon/delete.svg" alt="삭제" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
