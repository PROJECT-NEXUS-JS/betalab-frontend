'use client';
import { useState } from 'react';
import Image from 'next/image';
import { HydrationBoundary } from '@tanstack/react-query';
import BarChartClientWrapper from './BarChartClientWrapper';
import PieChartClientWrapper from './PieChartClientWrapper';
import LineChartClientWrapper from './LineChartClientWrapper';

type ChartType = 'bar' | 'donut' | 'line';

interface ChartToggleWrapperProps {
  postId: number;
  dehydratedState: any;
}

export default function ChartToggleWrapper({ postId, dehydratedState }: ChartToggleWrapperProps) {
  const [chartType, setChartType] = useState<ChartType>('bar');

  const toggleChart = () => {
    setChartType(prev => {
      if (prev === 'bar') return 'donut';
      if (prev === 'donut') return 'line';
      return 'bar';
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-Dark-Gray">데이터 분석 그래프</h3>
        <p className="text-sm text-Gray-300">최근 일주일</p>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <div className="relative w-full">
          {chartType === 'bar' ? (
            <BarChartClientWrapper postId={postId} />
          ) : chartType === 'donut' ? (
            <PieChartClientWrapper postId={postId} />
          ) : (
            <LineChartClientWrapper postId={postId} />
          )}
          <button
            onClick={() => {
              if (chartType === 'bar') setChartType('line');
              else if (chartType === 'donut') setChartType('bar');
              else setChartType('donut');
            }}
            className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 hover:opacity-80 transition-opacity cursor-pointer z-20"
            aria-label="이전 그래프"
          >
            <Image
              src="/icons/admin-icon/next.svg"
              alt="이전"
              width={48}
              height={48}
              className="rotate-180"
            />
          </button>
          <button
            onClick={() => {
              if (chartType === 'bar') setChartType('donut');
              else if (chartType === 'donut') setChartType('line');
              else setChartType('bar');
            }}
            className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 hover:opacity-80 transition-opacity cursor-pointer z-20"
            aria-label="다음 그래프"
          >
            <Image src="/icons/admin-icon/next.svg" alt="다음" width={48} height={48} />
          </button>
        </div>
      </HydrationBoundary>
    </div>
  );
}
