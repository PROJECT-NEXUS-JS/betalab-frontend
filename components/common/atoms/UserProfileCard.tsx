import Image from 'next/image';
import UserProfile from '../svg/UserProfile';
import { cn } from '@/lib/utils';

export interface UserProfileCardProps {
  profileImageUrl: string | null | undefined;
  imageSize?: 24 | 36;
  name: string;
  affiliation: string;
}

export default function UserProfileCard({
  profileImageUrl,
  name,
  affiliation,
  imageSize = 24,
}: UserProfileCardProps) {
  return (
    <div className="flex items-center gap-3 h-max px-3 py-5 border border-Gray-100 rounded-sm">
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt={name}
          width={imageSize}
          height={imageSize}
          onError={e => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none'; // 이미지 에러 시 숨김 처리 가능
          }}
        />
      ) : (
        <UserProfile
          className={cn(UserProfileImageSize[imageSize], 'bg-Primary-100 rounded-full')}
        />
      )}
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold text-Dark-Gray">{name}</p>
        <p className="text-xs font-medium text-Dark-Gray">{affiliation}</p>
      </div>
    </div>
  );
}

const UserProfileImageSize = {
  24: 'w-6 h-6',
  36: 'w-9 h-9',
};
