'use client';

import Button from '@/components/common/atoms/Button';
import BetaLabModal from '@/components/common/molecules/BetalabModal';
import ArrowRight from '@/components/common/svg/ArrowRight';
import UserProfile from '@/components/common/svg/UserProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyPageProfileQuery } from '@/hooks/mypage/queries/useMyPageProfileQuery';
import { useUpdateBasicInfoMutation } from '@/hooks/mypage/mutations/useUpdateBasicInfoMutation';
import { useWithdrawMutation } from '@/hooks/mypage/mutations/useWithdrawMutation';
import { useKakaoToken } from '@/hooks/common/useKakaoToken';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Loader } from 'lucide-react';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressError, setCompressError] = useState(false);

  const { data: userData, isLoading } = useMyPageProfileQuery();
  const updateBasicInfoMutation = useUpdateBasicInfoMutation();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLogoutModalOpen(false);
    router.push('/login');
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setNickname(userData?.name || '');
    setSelectedImage(null);
    setPreviewImage(null);
    setCompressError(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setNickname('');
    setSelectedImage(null);
    setPreviewImage(null);
    setCompressError(false);
  };

  const compressImage = async (file: File): Promise<File | null> => {
    setIsCompressing(true);
    setCompressError(false);

    try {
      const compressedBlob = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });

      const finalFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type || file.type,
        lastModified: Date.now(),
      });
      setIsCompressing(false);
      return finalFile;
    } catch (error) {
      console.error('❌ 이미지 압축 실패:', error);
      setCompressError(true);
      setIsCompressing(false);
      return null;
    }
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file);

      if (compressedFile) {
        setSelectedImage(compressedFile);

        const reader = new FileReader();
        reader.onload = e => {
          setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } else {
        alert('이미지 압축에 실패했습니다. 다른 이미지를 선택해 주세요.');
      }
    } catch (error) {
      console.error('이미지 처리 실패:', error);
      alert('이미지 처리 중 오류가 발생했습니다.');
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
      setCompressError(false);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  const openFileManager = () => {
    if (isCompressing) return;
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
                      label={isCompressing ? '압축 중...' : '이미지 변경하기'}
                      Size="lg"
                      State="Sub"
                      onClick={openFileManager}
                      className={`font-bold ${isCompressing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    />
                    {isCompressing && <Loader size={16} className="animate-spin ml-2" />}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={isCompressing}
                  />
                  {selectedImage && (
                    <p className="text-sm text-Gray-400">
                      {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)}MB)
                    </p>
                  )}
                  {compressError && (
                    <p className="text-sm text-red-500">
                      이미지 압축에 실패했습니다. 다른 이미지를 선택해 주세요.
                    </p>
                  )}
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
      <div className="w-full h-[1.5px] bg-Gray-100" />
      <BetaLabModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </section>
  );
}
