import Chip from "@/components/common/atoms/Chip";
import Searchbar from "@/components/common/molecules/Searchbar";
import ArrowDown from "@/components/common/svg/ArrowDown";
import CategoryButtons from "@/components/home/molecules/CategoryButtons";
import HomeTitle from "@/components/home/molecules/HomeTitle";
import React from "react";

export default function HomeHeader() {
  return (
    <header className="w-full flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <HomeTitle />
        <div className="flex flex-row gap-2">
          <Chip variant="secondary" size="lg">
            카테고리
          </Chip>
          <Searchbar />
        </div>
        <CategoryButtons className="mb-10 mt-5" />
      </div>
    </header>
  );
}
