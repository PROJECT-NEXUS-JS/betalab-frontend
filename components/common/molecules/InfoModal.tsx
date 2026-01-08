'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Button from '@/components/common/atoms/Button';

export type InfoModalType = 'participant' | 'recruiter';

interface InfoModalProps {
  type: InfoModalType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PARTICIPANT_CONTENT = {
  title: ['참여자이신가요?', '시작 전에 확인해 주세요'],
  subtitle: (
    <>
      <span className="text-gray-600 text-sm font-medium">베타랩은</span>
      <span className="text-blue-600 text-sm font-medium"> 테스트 참여 신청, 피드백 제출</span>
      <span className="text-gray-600 text-sm font-medium">을 돕는 플랫폼이에요</span>
    </>
  ),
  alertText: '아래 항목은 모집자가 직접 제공해드려요',
  items: [
    {
      icon: '/icons/popup-icon/Link.svg',
      title: '실행 파일 / 링크 전달:',
      description: '앱 파일, 접속 링크 등은 모집자가 직접 전달해요',
    },
    {
      icon: '/icons/popup-icon/reward.svg',
      title: '리워드 지급:',
      description: '리워드는 테스트 완료 후 모집자가 직접 지급해요',
    },
    {
      icon: '/icons/popup-icon/communication.svg',
      title: '외부 커뮤니케이션:',
      description: '추가 안내나 문의는 모집자가 안내한 채널을 이용해 주세요',
    },
  ],
} as const;

const RECRUITER_CONTENT = {
  title: ['모집자이신가요?', '시작 전에 확인해 주세요'],
  subtitle: (
    <>
      <span className="text-gray-600 text-sm font-medium">베타랩은</span>
      <span className="text-blue-600 text-sm font-medium"> 테스터 모집·신청·피드백·진행 관리</span>
      <span className="text-gray-600 text-sm font-medium">를 돕는 운영 플랫폼이에요</span>
    </>
  ),
  alertText: (
    <>
      현재 베타랩은 베타 버전이에요
      <br />
      베타 버전에서는 아래 항목은 모집자가 직접 진행해요
    </>
  ),
  items: [
    {
      icon: '/icons/popup-icon/Link.svg',
      title: '실행 파일 / 링크 전달:',
      description: '앱 파일(APK/IPA), 테스트 계정, 접속 링크 등',
    },
    {
      icon: '/icons/popup-icon/reward.svg',
      title: '리워드 지급:',
      description: '기프티콘 발송, 계좌이체 등',
    },
    {
      icon: '/icons/popup-icon/communication.svg',
      title: '외부 커뮤니케이션:',
      description: '추가 안내 및 문의 대응(필요 시)',
    },
  ],
} as const;

export default function InfoModal({ type, isOpen, onClose, onConfirm }: InfoModalProps) {
  const content = type === 'participant' ? PARTICIPANT_CONTENT : RECRUITER_CONTENT;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-10 w-[480px] max-w-[calc(100%-2rem)] rounded-2xl shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          {content.title.join(' ')}
        </DialogTitle>
        <div className="flex flex-col justify-start items-center gap-7">
          {/* Title */}
          <div className="flex flex-col justify-start items-center">
            {content.title.map((line, index) => (
              <div
                key={index}
                className="text-center justify-start text-gray-900 text-2xl font-medium leading-9"
              >
                {line}
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <div className="justify-start text-center">{content.subtitle}</div>

          {/* Alert Box */}
          <div className="self-stretch p-5 bg-sky-50 rounded-xl flex flex-col justify-start items-start gap-5">
            <div className="self-stretch p-2 bg-gray-200 rounded-lg inline-flex justify-start items-center gap-2">
              <div className="w-6 h-6 flex justify-center items-center gap-2.5">
                <Image src="/icons/popup-icon/caution.svg" alt="caution" width={20} height={20} />
              </div>
              <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-start text-gray-600 text-xs font-semibold leading-4">
                  {typeof content.alertText === 'string' ? (
                    content.alertText
                  ) : (
                    <>{content.alertText}</>
                  )}
                </div>
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              {content.items.map((item, index) => (
                <div key={index} className="inline-flex justify-start items-center gap-3">
                  <div className="w-6 h-6 relative bg-blue-100 rounded overflow-hidden flex items-center justify-center shrink-0">
                    <Image src={item.icon} alt={item.title} width={16} height={16} />
                  </div>
                  <div className="inline-flex flex-col justify-start items-start">
                    <div className="justify-start text-gray-900 text-sm font-medium leading-5">
                      {item.title}
                    </div>
                    <div className="justify-start text-gray-900 text-sm font-medium leading-5">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="self-stretch text-center justify-start text-slate-500 text-xs font-medium leading-4">
            기타 문의는 구글폼 또는 오픈채팅방으로 문의바랍니다.
          </div>

          <Button
            State="Primary"
            Size="xl"
            label="확인했어요"
            onClick={handleConfirm}
            className="w-full h-12"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
