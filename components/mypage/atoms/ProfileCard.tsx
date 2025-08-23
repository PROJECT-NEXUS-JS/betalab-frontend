import React from 'react';
import { cn } from '@/lib/utils';
import UserProfile from '@/components/common/svg/UserProfile';

interface ProfileCardProps {
  avatar?: string;
  nickname: string;
  affiliation?: string;
  className?: string;
}

export default function ProfileCard({
  avatar,
  nickname,
  affiliation,
  className,
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        'py-5 pl-3 flex flex-row items-start gap-3 border-Gray-100 border-1 rounded-[4px]',
        className,
      )}
    >
      {avatar ? (
        <img src={avatar} alt="프로필 이미지" className="size-9 rounded-full object-cover" />
      ) : (
        <UserProfile className="size-9" />
      )}
      <div className="text-center">
        <h3 className="text-body-01 font-semibold text-Dark-Gray">{nickname}</h3>
        {affiliation && (
          <p className="text-caption-01 font-medium text-Light-Gray">{affiliation}</p>
        )}
      </div>
    </div>
  );
}
