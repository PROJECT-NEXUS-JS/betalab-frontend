import BookMark from '@/components/common/svg/BookMark';
import Bell from '../svg/Bell';
import UserProfile from '@/components/common/svg/UserProfile';
import ArrowDown from '@/components/common/svg/ArrowDown';
import Dropdown from './Dropdown';
import { DropdownElementProps } from '../atoms/DropdownElement';
import { useRouter } from 'next/navigation';

interface HeaderIconsProps {
  userData?: {
    nickname: string;
    avatar: string | null;
    affiliation: string | null;
  };
}

const HeaderIcons = ({ userData }: HeaderIconsProps) => {
  const router = useRouter();

  const DROPDOWN_ELEMENTS: DropdownElementProps[] = [
    {
      onClick: () => {
        router.push('/mypage');
      },
      children: <p className="text-caption-01 font-semibold">{userData?.nickname || '베타랩'}님</p>,
    },
    {
      onClick: () => {
        router.push('/mypage');
      },
      children: <p className="text-caption-02 font-semibold">내 활동</p>,
    },
    {
      onClick: () => {
        router.push('/mypage');
      },
      children: <p className="text-caption-02 font-semibold">프로필 설정</p>,
    },
    {
      onClick: () => {
        router.push('/mypage');
      },
      children: <p className="text-caption-02 font-semibold">도움말/문의</p>,
    },
    {
      onClick: () => {},
      children: <p className="text-caption-02 font-semibold">로그아웃</p>,
    },
  ];

  return (
    <div className="flex flex-row gap-5 items-center">
      <Bell className="size-6 text-Gray-300" />
      <BookMark className="size-6 fill-transparent text-Gray-300 stroke-Gray-300 stroke-2" />
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
        <div className="absolute right-0 hidden group-hover:block">
          <div className="h-10 w-full" />
          <Dropdown elements={DROPDOWN_ELEMENTS} className="" />
        </div>
      </div>
    </div>
  );
};

export default HeaderIcons;
