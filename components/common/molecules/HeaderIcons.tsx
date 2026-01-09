import { useState } from 'react';
import BookMark from '@/components/common/svg/BookMark';
import Bell from '../svg/Bell';
import UserProfile from '@/components/common/svg/UserProfile';
import ArrowDown from '@/components/common/svg/ArrowDown';
import Dropdown from './Dropdown';
import { DropdownElementProps } from '../atoms/DropdownElement';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BetaLabModal from './BetalabModal';
import { QueryCache } from '@tanstack/react-query';

interface HeaderIconsProps {
  userData?: {
    nickname: string;
    avatar: string | null;
    affiliation: string | null;
  };
}

const HeaderIcons = ({ userData }: HeaderIconsProps) => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const queryCache = new QueryCache();

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('localStorageChange'));
    queryCache.clear();
    setIsLogoutModalOpen(false);
    router.push('/login');
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleHelpClick = () => {
    window.open('https://tally.so/r/7RLkL0', '_blank', 'noopener,noreferrer');
  };

  const DROPDOWN_ELEMENTS: DropdownElementProps[] = [
    {
      onClick: () => {
        router.push('/mypage');
      },
      children: <p className="text-caption-01 font-semibold">{userData?.nickname || '베타랩'}님</p>,
    },
    {
      onClick: () => {
        router.push('/mypage?tab=posted-tests');
      },
      children: <p className="text-caption-02 font-semibold">내 활동</p>,
    },
    {
      onClick: () => {
        router.push('/mypage?tab=account-management');
      },
      children: <p className="text-caption-02 font-semibold">프로필 설정</p>,
    },
    {
      onClick: handleHelpClick,
      children: <p className="text-caption-02 font-semibold">도움말/문의</p>,
    },
    {
      onClick: handleLogoutClick,
      children: <p className="text-caption-02 font-semibold">로그아웃</p>,
    },
  ];

  return (
    <>
      <div className="flex flex-row gap-5 items-center">
        <Link href="/mypage?tab=bookmarked-tests">
          <BookMark className="size-6 fill-transparent text-Gray-300 stroke-Gray-300 stroke-2 cursor-pointer" />
        </Link>
        <div className="flex relative group flex-row cursor-pointer">
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt="프로필 이미지"
              className="size-6 rounded-full object-cover"
            />
          ) : (
            <UserProfile className="size-6" />
          )}
          <ArrowDown className="size-6" />
          <div className="absolute right-0 top-full hidden group-hover:block z-50">
            <div className="h-2" />
            <Dropdown elements={DROPDOWN_ELEMENTS} />
          </div>
        </div>
      </div>

      <BetaLabModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default HeaderIcons;
