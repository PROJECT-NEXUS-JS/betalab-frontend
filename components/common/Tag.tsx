import Image from "next/image";
import diamond_orange from "@/public/icons/tag-icon/diamond-orange.svg";
import fire_red from "@/public/icons/tag-icon/fire-red.svg";
import calender_green from "@/public/icons/tag-icon/calender-green.svg";
import siren from "@/public/icons/tag-icon/siren.svg";
import diamond_white from "@/public/icons/tag-icon/diamond-white.svg";
import fire_blue from "@/public/icons/tag-icon/fire-blue.svg";
import calender_gray from "@/public/icons/tag-icon/calender-gray.svg";

export interface TagProps {
  style: "orange" | "red" | "green" | "purple" | "black" | "blue" | "gray" | "필수";
  onClick: () => void;
  dday?: number;
}

export default function Tag({ style, onClick, dday = 7 }: TagProps) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center text-[10px] font-semibold px-1 h-5 gap-1 rounded-sm cursor-pointer ${TAG_COLORS[style]}`}
    >
      {TAG_ICONS[style] && (
        <Image
          src={TAG_ICONS[style]}
          alt={style}
          width={12}
          height={12}
        />
      )}
      {TAG_TEXT(dday)[style]}
    </div>
  );
}


const TAG_ICONS: Record<string, string | null> = {
  orange: diamond_orange,
  red: fire_red,
  green: calender_green,
  purple: siren,
  black: diamond_white, 
  blue: fire_blue,
  gray: calender_gray,
  필수: null
};

const TAG_COLORS: Record<string, string> = {
  orange: "bg-[#FFF3E0] text-[#E86400]",
  red: "bg-[#FFF0F1] text-[#E11321]",
  green: "bg-[#E6FFDC] text-[#2FA800]",
  purple: "bg-[#F7EAFF] text-[#9230CF]",
  black: "bg-[#1A1E27] bg-opacity-80 text-white",
  blue: "bg-[#F3F7FF] text-[#0E62FF]",
  gray: "bg-[#E8EAEC] text-[#64768C]",
  필수: "text-Primary-500",
};

const TAG_TEXT = (dday: number) => ({
  orange: "리워드 제공",
  red: "자세할수록 좋아요",
  green: "단기 테스트",
  purple: "오늘 마감",
  black: "리워드 제공",
  blue: "참여자에 대해 자세히 파악할 수 있어요",
  gray: `D-${dday}`,
  필수: "*필수",
});