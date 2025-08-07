import BookMark from '@/components/common/svg/BookMark';
import Bell from '../svg/Bell';
import Mail from '../svg/Mail';
import UserProfile from '@/components/common/svg/UserProfile';
import ArrowDown from '@/components/common/svg/ArrowDown';

export default function HeaderIcons() {
  return (
    <div className="flex flex-row gap-5 items-center">
      <Bell className="size-6 text-Gray-300" />
      <Mail className="size-6 text-Gray-300" />
      <BookMark className="size-6 text-Gray-300" />
      <div className="flex flex-row">
        <UserProfile className="size-6" />
        <ArrowDown className="size-6" />
      </div>
    </div>
  );
}
