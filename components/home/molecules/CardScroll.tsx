import React from "react";
import { cn } from "@/lib/utils";

interface CardScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardScroll({ children, className }: CardScrollProps) {
  return (
    <div className={cn("flex flex-row gap-10", className)}>{children}</div>
  );
}
