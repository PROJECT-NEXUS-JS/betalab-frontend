// components/test-add/layouts/TestAddLayout.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Button from '@/components/common/atoms/Button';
import CarouselBar from '@/components/common/molecules/CarouselBar';
import StepNextButton from '@/components/common/molecules/StepNextButton';

interface TestAddLayoutProps {
  children: React.ReactNode;
  leftImageSrc: string;
  leftImageClassName?: string;
  leftPanelClassName?: string;
  stepIndex: number;
  totalSteps?: number;
  onNext: () => void;
  showSave?: boolean;
  onSave?: () => void;
  saveLabel?: string;
  className?: string;
}

export default function TestAddLayout({
  children,
  leftImageSrc,
  leftImageClassName = 'object-contain object-top',
  leftPanelClassName,
  stepIndex,
  totalSteps = 10,
  onNext,
  showSave = false,
  onSave,
  saveLabel = '임시 저장',
  className,
}: TestAddLayoutProps) {
  return (
    <div className={cn('min-h-screen w-full flex flex-col bg-White', className)}>
      <div className="flex flex-1 w-full">
        <div
          className={cn(
            'relative shrink-0 basis-[322px] bg-gradient-to-b from-White',
            leftPanelClassName,
          )}
        >
          <Image
            src={leftImageSrc}
            alt="테스트 이미지"
            fill
            className={leftImageClassName}
            priority
          />
        </div>

        <div className="flex-1 flex flex-col px-12">
          <div className="flex-1">{children}</div>
          <div className="flex items-center justify-between mt-6 gap-4 pb-22">

            <div className="flex items-center gap-2">
              {showSave && <Button State="Sub" Size="xl" label={saveLabel} onClick={onSave} />}
            </div>

            <div className="flex-1 flex justify-center">
              <CarouselBar activeIndex={stepIndex} total={totalSteps} />
            </div>
            <div className="flex justify-end">
              <StepNextButton onClick={onNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
