'use client';

import Button from '@/components/common/atoms/Button';
import BetaLabModal from '@/components/common/molecules/BetalabModal';
import ArrowRight from '@/components/common/svg/ArrowRight';
import UserProfile from '@/components/common/svg/UserProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyPageProfileQuery } from '@/hooks/mypage/queries/useMyPageProfileQuery';
import { useUpdateBasicInfoMutation } from '@/hooks/mypage/mutations/useUpdateBasicInfoMutation';
import { useKakaoToken } from '@/hooks/common/useKakaoToken';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

const ProfileSkeleton = () => {
  return (
    <>
      <div className="flex flex-row gap-10">
        <h3 className="text-body-01 text-Black font-medium">베타랩 활동명</h3>
        <Skeleton className="w-20 h-5" />
      </div>
      <div className="flex flex-row gap-10">
        <h3 className="text-body-01 text-Black font-medium">프로필 이미지</h3>
        <Skeleton className="size-9 rounded-full" />
      </div>
    </>
  );
};

export default function AccountContent() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: userData, isLoading } = useMyPageProfileQuery();
  const updateBasicInfoMutation = useUpdateBasicInfoMutation();
  const { kakaoAccessToken } = useKakaoToken();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLogoutModalOpen(false);
    router.push('/login');
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleSignOutClick = () => {
    setIsSignOutOpen(true);
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsSignOutOpen(false);
      alert('계정이 성공적으로 탈퇴 처리되었습니다.');
      router.push('/login');
    } catch (error) {
      console.error('계정 탈퇴 실패:', error);
      alert('계정 탈퇴에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setNickname(userData?.name || '');
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setNickname('');
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateBasicInfoMutation.mutateAsync({
        basicInfo: {
          nickname: nickname.trim(),
        },
        profileImage: selectedImage || undefined,
      });

      setIsEditMode(false);
      setNickname('');
      setSelectedImage(null);
      setPreviewImage(null);
      alert('프로필이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const openFileManager = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="flex flex-col gap-10 mt-10 w-full items-start">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-row justify-between w-full">
          <h2 className="text-subtitle-02 font-semibold text-Black">기본 정보</h2>
          {isEditMode ? (
            <div className="flex gap-2">
              <Button
                label="취소"
                Size="lg"
                State="Default"
                className="cursor-pointer"
                onClick={handleCancelEdit}
              />
              <Button
                label="변경사항 저장하기"
                Size="lg"
                State="Primary"
                className="cursor-pointer"
                onClick={handleSaveChanges}
              />
            </div>
          ) : (
            <Button
              label="수정 하기"
              Size="lg"
              State="Default"
              className="cursor-pointer"
              onClick={handleEditClick}
            />
          )}
        </div>
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <div className="flex flex-row gap-10">
              <h3 className="text-body-01 text-Black font-medium">베타랩 활동명</h3>
              {isEditMode ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  className="text-body-02 text-Black font-semibold border border-Gray-100 rounded p-4 focus:outline-none max-w-[500px]"
                  placeholder="활동명을 입력하세요"
                />
              ) : (
                <p className="text-body-01 text-Dark-Gray font-medium">{userData?.name}</p>
              )}
            </div>
            <div className="flex flex-row gap-10">
              <h3 className="text-body-01 text-Black font-medium">프로필 이미지</h3>
              {isEditMode ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="프로필 이미지 미리보기"
                        className="size-15 rounded-full"
                      />
                    ) : userData?.profileImageUrl ? (
                      <img
                        src={userData.profileImageUrl}
                        alt="현재 프로필 이미지"
                        className="size-15 rounded-full"
                      />
                    ) : (
                      <UserProfile className="size-9" />
                    )}
                    <Button
                      label="이미지 변경하기"
                      Size="lg"
                      State="Sub"
                      onClick={openFileManager}
                      className="cursor-pointer font-bold"
                    />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  {selectedImage && <p className="text-sm text-Gray-400">{selectedImage.name}</p>}
                </div>
              ) : userData?.profileImageUrl ? (
                <img
                  src={userData.profileImageUrl}
                  alt="프로필 이미지"
                  className="size-15 rounded-full"
                />
              ) : (
                <UserProfile className="size-15" />
              )}
            </div>
          </>
        )}
      </div>
      <div className="w-full h-[1.5px] bg-Gray-100" />
      <div className="flex flex-row justify-between w-full items-center">
        <h2 className="text-subtitle-02 font-semibold text-Black">로그아웃</h2>
        <button className="cursor-pointer" onClick={handleLogoutClick}>
          <ArrowRight className="size-6" />
        </button>
      </div>
      {/* <div className="w-full h-[1.5px] bg-Gray-100" />
      <div className="flex flex-row justify-between w-full items-center">
        <h2 className="text-subtitle-02 font-semibold text-Black">탈퇴하기</h2>
        <button className="cursor-pointer" onClick={handleSignOutClick}>
          <ArrowRight className="size-6" />
        </button>
      </div> */}
      <BetaLabModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      <BetaLabModal
        isOpen={isSignOutOpen}
        onClose={handleSignOut}
        onConfirm={() => setIsSignOutOpen(false)}
        title="정말 베타랩을 떠나실 생각이신가요?"
        description={
          <>
            계정 삭제시 모든 개인 정보가 삭제되며
            <br />
            베타랩에서의 활동 기록이 모두 사라집니다.
          </>
        }
        rightLabel="계정 탈퇴"
        leftLabel="다시 생각 해볼게요!"
      />
    </section>
  );
}
