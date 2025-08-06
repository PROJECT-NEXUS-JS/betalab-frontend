import Button from "@/components/common/Button";
import BetalabLogo from "@/components/common/svg/BetalabLogo";
import HeaderIcons from "../molecules/HeaderIcons";
import Searchbar from "@/components/common/molecules/Searchbar";

interface HeaderProps {
  isLogin?: boolean;
  isSearchbar?: boolean;
}

export default function Header({
  isLogin = false,
  isSearchbar = false,
}: HeaderProps) {
  return (
    <header className="w-full flex flex-row items-center px-16 py-4 justify-between">
      <div className="flex h-11 flex-row items-center gap-4">
        <BetalabLogo className="w-25 h-6" />
        {isSearchbar && <Searchbar />}
      </div>
      {isLogin ? (
        <HeaderIcons />
      ) : (
        <Button
          State="Sub"
          Size="xs"
          label="로그인/회원가입"
          onClick={() => {}}
        />
      )}
    </header>
  );
}

export function HeaderAdmin() {
  return (
    <header className="w-full flex flex-row items-center px-16 py-4 justify-between">
      <div className="flex h-11 flex-row items-center gap-3">
        <BetalabLogo className="w-25 h-6" />
        <h3 className="text-body-01 font-semibold text-Dark-Gray">관리자용</h3>
      </div>
    </header>
  );
}
