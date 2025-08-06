import Image from "next/image";
import BlueIcon from "@/public/icons/toast-icon/blue.svg";
import RedIcon from "@/public/icons/toast-icon/red.svg";

export interface ToastProps {
  style: "default" |  "error";
  message: string;
}

const THEME = {
  default: "bg-Primary-100 text-Dark-Gray border-[1px] border-Primary-200",
  error: "bg-Error text-White",
};

const ICON = {
  default: BlueIcon,
  error: RedIcon,
};

export default function Toast({ style, message }: ToastProps) {
  return (
    <div className={`flex items-center justify-center gap-2 rounded-sm pl-3 pr-[17px] py-3 ${THEME[style]}`}>
      <Image src={ICON[style]} alt="" />
      <p className="text-base font-semibold">{message}</p>
    </div>
  )
}