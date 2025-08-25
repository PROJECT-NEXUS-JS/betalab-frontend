'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useProfileQuery } from '@/hooks/profile/quries/useProfileQurey';

import UserProfile from '@/components/common/svg/UserProfile';
import Input from '@/components/common/atoms/Input';
import Button from '@/components/common/atoms/Button';

import { ProfileUpdatePayload } from '@/hooks/profile/dto';
import { useProfileMutation } from '@/hooks/profile/mutations/useProfileMutation';

export default function ProfileClient({ id }: { id: number }) {
  const { data: profile, isLoading, isError } = useProfileQuery();
  const mutation = useProfileMutation(id);
  const [form, setForm] = useState<ProfileUpdatePayload>({
    nickname: '',
    introduction: '',
    profileImage: null,
  });

  useEffect(() => {
    if (profile?.data) {
      setForm({
        nickname: profile.data.nickname || '',
        introduction: profile.data.introduction || '',
        profileImage: null,
      });
    }
  }, [profile]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, profileImage: file }));
  };

  return (
    <div className="flex flex-col w-full max-w-[854px] gap-10">
      {/** 프로필 수정 */}
      <section className="flex h-17 flex-col justify-between items-start">
        <div className="flex gap-2 items-center justify-center">
          <p className="text-Dark-Gray text-base font-bold">프로필 이미지</p>
          <label
            htmlFor="profileImageUpload"
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <Image
              src="/icons/admin-icon/pen.svg"
              alt="edit button"
              width={24}
              height={24}
              className="rounded-full"
            />
          </label>

          {/* 실제 파일 입력 (숨김 처리) */}
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* 이미지 미리보기 */}
        {form.profileImage ? (
          <Image
            src={URL.createObjectURL(form.profileImage)}
            alt="새 프로필 이미지"
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : profileData.profileImageUrl ? (
          <Image
            src={profileData.profileImageUrl}
            alt={profileData.nickname || '프로필 이미지'}
            width={36}
            height={36}
            className="rounded-full"
            onError={e => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
            }}
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
          value={form.nickname || ''}
          onChange={e => setForm(prev => ({ ...prev, nickname: e.target.value }))}
        />
      </section>
      <section className="flex gap-3 flex-col justify-between items-start">
        <p className="text-Dark-Gray text-base font-bold">내 소개</p>
        <Input
          type="text"
          state="has value"
          placeholder="내 소개를 입력해주세요."
          size="lg"
          value={form.introduction || ''}
          onChange={e => setForm(prev => ({ ...prev, introduction: e.target.value }))}
        />
      </section>
      <Button
        State="Primary"
        Size="lg"
        label="변경사항 저장하기"
        onClick={() => mutation.mutate(form)}
      />
    </div>
  );
}
