'use client';

import { useParams } from 'next/navigation';
import AppGenre from '@/components/test-add/genre/AppGenre';
import GameGenre from '@/components/test-add/genre/GameGenre';
import WebGenre from '@/components/test-add/genre/WebGenre';

export default function TestAddGenrePage() {
  const { category } = useParams();

  if (typeof category !== 'string') {
    return <div>잘못된 접근입니다.</div>;
  }
  if (category === 'web') {
    return <WebGenre />;
  }

  if (category === 'app') {
    return <AppGenre />;
  }

  if (category === 'game') {
    return <GameGenre />;
  }

  return <div>지원하지 않는 카테고리입니다: {category}</div>;
}
