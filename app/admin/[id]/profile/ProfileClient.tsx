'use client';
import Image from 'next/image';
import { useProfileQuery } from '@/hooks/profile/quries/useProfileQurey';

import UserProfile from '@/components/common/svg/UserProfile';
import Input from '@/components/common/atoms/Input';
import Button from '@/components/common/atoms/Button';

export default function ProfileClient({ id }: { id: number }) {
  const { data: profile, isLoading, isError } = useProfileQuery();
  if (isLoading) {
    return (
      <aside className="flex flex-col w-full max-w-[854px] p-4">
        <div>프로필 정보를 불러오는 중입니다...</div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="flex flex-col w-full max-w-[854px] p-4 text-red-500">
        <div>프로필 정보를 가져오는 데 실패했습니다.</div>
      </aside>
    );
  }

  if (!profile) {
    return (
      <aside className="flex flex-col w-full max-w-[854px] p-4">
        <div>프로필 정보가 없습니다.</div>
      </aside>
    );
  }
  const profileData = profile?.data;
  return (
    <div className="flex flex-col w-full max-w-[854px] gap-10">
      {/** 프로필 수정 */}
      <section className="flex h-17 flex-col justify-between items-start">
        <div className="flex gap-2 items-center justify-center">
          <p className="text-Dark-Gray text-base font-bold">프로필 이미지</p>
          <button onClick={() => {}} className="p-1 hover:bg-gray-100 rounded-lg">
            <Image
              src="/icons/admin-icon/pen.svg"
              alt="edit button"
              width={24}
              height={24}
              className="rounded-full"
            />
          </button>
        </div>
        {profileData.profileImageUrl ? (
          <Image
            src={profileData.profileImageUrl}
            alt={profileData.nickname || '프로필 이미지'}
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
      </section>
      {/** 닉네임 */}
      <section className="flex gap-3 flex-col justify-between items-start">
        <p className="text-Dark-Gray text-base font-bold">닉네임</p>
        <Input
          type="text"
          state="has value"
          placeholder="닉네임을 입력해주세요."
          size="lg"
          value={profileData.nickname || ''}
        />
      </section>
      <section className="flex gap-3 flex-col justify-between items-start">
        <p className="text-Dark-Gray text-base font-bold">내 소개</p>
        <Input
          type="text"
          state="has value"
          placeholder="내 소개를 입력해주세요."
          size="lg"
          value={profileData.introduction || ''}
        />
      </section>
      <Button State="Primary" Size="lg" label="변경사항 저장하기" onClick={() => {}} />
    </div>
  );
}
