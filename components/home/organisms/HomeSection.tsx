import React from "react";

interface HomeSectionProps {
  children: React.ReactNode;
}

export default function HomeSection({ children }: HomeSectionProps) {
  return (
    <section className="flex flex-col gap-5 items-center">{children}</section>
  );
}
