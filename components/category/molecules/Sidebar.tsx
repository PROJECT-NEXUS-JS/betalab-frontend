'use client';

import { Suspense } from 'react';
import Breadcrumb from '@/components/category/atoms/Breadcrumb';
import SidetabElement from '@/components/category/atoms/SidetabElement';
import SidetabHeader from '@/components/category/atoms/SidetabHeader';
import { useCategoryStore } from '@/stores/categoryStore';
import { GENRE_CATEGORIES_MAP, PLATFORM_CATEGORIES_MAP } from '@/app/category/const';
import { useRouter, useSearchParams } from 'next/navigation';

function SidebarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mainCategory, genreCategory, platformCategory, setGenreCategory, setPlatformCategory } =
    useCategoryStore();

  const genreCategories = GENRE_CATEGORIES_MAP.get(mainCategory) || [];
  const platformCategories = PLATFORM_CATEGORIES_MAP.get(mainCategory) || [];

  const handleGenreClick = (genre: string) => {
    setGenreCategory(genre);
    const params = new URLSearchParams(searchParams.toString());
    params.set('genre', genre);
    router.push(`/category?${params.toString()}`, { scroll: false });
  };

  const handlePlatformClick = (platform: string) => {
    setPlatformCategory(platform);
    const params = new URLSearchParams(searchParams.toString());
    params.set('platform', platform);
    router.push(`/category?${params.toString()}`, { scroll: false });
  };

  const getBreadcrumbItems = () => {
    const items = [
      { label: '홈', href: '/' },
      { label: mainCategory, href: `/category?category=${mainCategory}` },
    ];

    if (genreCategory && genreCategory !== '전체') {
      items.push({ label: genreCategory, href: `/category?${searchParams.toString()}` });
    }

    if (platformCategory && platformCategory !== '무관' && platformCategories.length > 0) {
      items.push({ label: platformCategory, href: `/category?${searchParams.toString()}` });
    }

    return items;
  };

  return (
    <div className="w-[258px] gap-10 flex flex-col items-start justify-start">
      <div className="flex flex-col gap-2">
        <Breadcrumb items={getBreadcrumbItems()} />
        <h2 className="text-head text-Black font-bold">{mainCategory}</h2>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <SidetabHeader>장르</SidetabHeader>
        {genreCategories.map(genre => (
          <SidetabElement
            key={genre}
            isActive={genreCategory === genre}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </SidetabElement>
        ))}
      </div>
      {platformCategories.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          <SidetabHeader>플랫폼</SidetabHeader>
          {platformCategories.map(platform => (
            <SidetabElement
              key={platform}
              isActive={platformCategory === platform}
              onClick={() => handlePlatformClick(platform)}
            >
              {platform}
            </SidetabElement>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarContent />
    </Suspense>
  );
}
