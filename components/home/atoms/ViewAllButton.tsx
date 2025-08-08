import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ViewAllButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  href: string;
}

export default function ViewAllButton({
  children = "전체보기",
  className,
  href,
  ...props
}: ViewAllButtonProps) {
  return (
    <Link href={href} passHref>
      <button
        className={cn(
          "py-[15.5px] border-1 cursor-pointer border-Gray-100 px-[200.5px] text-body-02 font-semibold text-Dark-Gray",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Link>
  );
}
