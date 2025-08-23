'use client';

import { useState } from 'react';
import { BETALAB_GUIDE } from '@/constants/betalabGuide';
import Input from '@/components/common/atoms/Input';
import Toggle from '@/components/common/atoms/Toggle';

const isEmpty = (v: string) => v.replace(/\s+/g, '') === '';

export default function StorySection() {
  const [value, setValue] = useState('');
  const [guideOn, setGuideOn] = useState(false);

  const handleToggle = (on: boolean) => {
    setGuideOn(on);
    if (on) setValue(BETALAB_GUIDE);
    else if (value.trim() === BETALAB_GUIDE.trim()) setValue('');
  };

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <div className="w-[1152px] grid gap-2 md:grid-cols-[1fr_auto] md:items-start">
        <div className="min-w-0">
          <p className="text-subtitle-01 font-semibold">이미지가 없으신가요?</p>
          <p className="mt-1 text-body-02 text-Gray-300">
            걱정 마세요. 아래에 소개글을 쉽게 쓸 수 있도록 베타랩이 도와줄게요!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 whitespace-nowrap md:mt-1">
          <span className="text-caption-01 text-Gray-300">베타랩 가이드 이용하기</span>
          <Toggle checked={guideOn} onChange={handleToggle} aria-label="베타랩 가이드 이용하기" />
        </div>
      </div>

      {isEmpty(value) ? null : (
        <div className="mt-1">
          <Input
            type="text area"
            size="xl"
            placeholder="소개글을 입력해주세요."
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            state={isEmpty(value) ? 'no value' : 'has value'}
          />
        </div>
      )}
    </section>
  );
}
