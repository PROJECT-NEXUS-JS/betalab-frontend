'use client';

import { useEffect, useState } from 'react';
import { BETALAB_GUIDE } from '@/constants/betalabGuide';
import Input from '@/components/common/atoms/Input';
import Toggle from '@/components/common/atoms/Toggle';

const isEmpty = (v: string) => v.replace(/\s+/g, '') === '';

export type StoryPatch = {
  storyGuide?: string;
};

type Props = {
  initial?: StoryPatch;
  onChange?: (patch: StoryPatch) => void;
};

export default function StorySection({ initial, onChange }: Props) {
  const [value, setValue] = useState(initial?.storyGuide ?? '');

  const isBetalabGuide = (text: string | undefined) => {
    if (!text) return false;
    return text.trim() === BETALAB_GUIDE.trim();
  };

  const [guideOn, setGuideOn] = useState(() => isBetalabGuide(initial?.storyGuide));

  useEffect(() => {
    const restoredValue = initial?.storyGuide ?? '';
    setValue(restoredValue);
    setGuideOn(isBetalabGuide(restoredValue));
  }, [initial?.storyGuide]);
  const emit = (next: string) => {
    onChange?.({ storyGuide: isEmpty(next) ? undefined : next });
  };

  const handleToggle = (on: boolean) => {
    setGuideOn(on);
    if (on) {
      setValue(BETALAB_GUIDE);
      emit(BETALAB_GUIDE);
    } else if (value.trim() === BETALAB_GUIDE.trim()) {
      setValue('');
      emit('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.currentTarget.value;
    setValue(next);
    emit(next);
  };

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <div className="max-w-[1152px] grid gap-2 md:grid-cols-[1fr_auto] md:items-start">
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
            onChange={handleChange}
            state={isEmpty(value) ? 'no value' : 'has value'}
          />
        </div>
      )}
    </section>
  );
}
