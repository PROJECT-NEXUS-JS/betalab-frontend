'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import BookmarkIcon from '@/public/icons/notifi-icon/bookmark.svg';
import UserRoundCheckIcon from '@/public/icons/notifi-icon/user-round-check.svg';
import TimerIcon from '@/public/icons/notifi-icon/timer.svg';
import { useMyNotificationsQuery } from '@/hooks/mypage/queries/useMyNotificationsQuery';
import { NotificationItemType } from '@/hooks/mypage/dto/notifications';

export type NotificationType = 'review' | 'test check' | 'test waiting';

export interface NotificationItem {
  type: NotificationType;
  message: string;
  isRead?: boolean;
}

interface NotificationComponentProps {
  notifications?: NotificationItem[];
  className?: string;
  useApi?: boolean; // API 사용 여부
}

const ICON_MAP: Record<NotificationType, { icon: typeof BookmarkIcon; alt: string }> = {
  review: { icon: BookmarkIcon, alt: '리뷰 아이콘' },
  'test check': { icon: UserRoundCheckIcon, alt: '승인 완료 아이콘' },
  'test waiting': { icon: TimerIcon, alt: '대기 중 아이콘' },
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    type: 'review',
    message: '리뷰에 답변이 달렸어요',
    isRead: false,
  },
  {
    type: 'test check',
    message: '테스트 승인이 완료 됐어요',
    isRead: false,
  },
  {
    type: 'test waiting',
    message: '테스트 승인을 대기중이에요',
    isRead: false,
  },
];

// API 타입을 컴포넌트 타입으로 매핑
const mapApiTypeToComponentType = (apiType: string): NotificationType => {
  // API 타입에 따라 매핑 (필요에 따라 수정)
  if (apiType.includes('REVIEW') || apiType.includes('MESSAGE')) {
    return 'review';
  }
  if (apiType.includes('APPROVED') || apiType.includes('COMPLETE')) {
    return 'test check';
  }
  if (apiType.includes('WAITING') || apiType.includes('PENDING')) {
    return 'test waiting';
  }
  // 기본값
  return 'review';
};

// API 응답을 컴포넌트 형식으로 변환
const mapApiNotificationsToComponent = (
  apiNotifications: NotificationItemType[] | undefined,
): NotificationItem[] => {
  if (!apiNotifications || apiNotifications.length === 0) {
    return [];
  }

  return apiNotifications.map(apiNotif => ({
    type: mapApiTypeToComponentType(apiNotif.type),
    message: apiNotif.content,
    isRead: apiNotif.read,
  }));
};

export default function NotificationComponent({
  notifications,
  className,
  useApi = false,
}: NotificationComponentProps) {
  const { data: apiNotifications, isLoading } = useMyNotificationsQuery({
    enabled: useApi,
  });

  const displayNotifications = useApi
    ? mapApiNotificationsToComponent(apiNotifications)
    : notifications || DEFAULT_NOTIFICATIONS;

  if (useApi && isLoading) {
    return (
      <div
        className={cn(
          'h-96 w-56 px-4 py-5 bg-Gray-50 rounded inline-flex justify-center items-start gap-2.5 overflow-hidden',
          className,
        )}
      >
        <div className="w-56 inline-flex flex-col justify-start items-start gap-5">
          <Skeleton className="h-6 w-20" />
          <div className="self-stretch flex flex-col justify-start items-center gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="self-stretch px-5 py-3 bg-white rounded shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)] flex flex-col justify-start items-start gap-2.5"
              >
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="w-2 h-2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'h-96 w-56 px-4 py-5 bg-Gray-50 rounded inline-flex justify-center items-start gap-2.5 overflow-hidden',
        className,
      )}
    >
      <div className="w-56 inline-flex flex-col justify-start items-start gap-5">
        <div className="self-stretch justify-start text-gray-600 text-base font-bold font-['SUIT_Variable'] leading-6">
          최근 알림
        </div>

        <div className="self-stretch flex flex-col justify-start items-center gap-2">
          {useApi && (!displayNotifications || displayNotifications.length === 0) ? (
            <div className="self-stretch flex flex-col items-center justify-center py-10">
              <div className="text-gray-500 text-sm font-medium font-['SUIT_Variable']">
                새로운 알림이 없어요
              </div>
            </div>
          ) : (
            (displayNotifications ?? []).map((notification, index) => {
              const icon = ICON_MAP[notification.type];
              const isRead = notification.isRead ?? false;

              return (
                <div
                  key={index}
                  data-속성-1={notification.type}
                  className="self-stretch px-5 py-3 bg-white rounded shadow-[0px_0px_10px_0px_rgba(26,30,39,0.08)] flex flex-col justify-start items-start gap-2.5 overflow-hidden"
                >
                  <div className="self-stretch inline-flex justify-start items-center gap-3">
                    <div
                      data-size="lg"
                      data-style={
                        notification.type === 'review'
                          ? 'star'
                          : notification.type === 'test check'
                            ? 'user - check'
                            : 'timer'
                      }
                      className="w-6 h-6 relative overflow-hidden flex-shrink-0"
                    >
                      {icon && (
                        <Image
                          src={icon.icon}
                          alt={icon.alt}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      )}
                    </div>
                    <div className="justify-start text-gray-600 text-xs font-bold font-['SUIT_Variable'] leading-4 flex-1">
                      {notification.message}
                    </div>
                    {!isRead && (
                      <div
                        data-속성-1="blue"
                        className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
