'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/common/atoms/Input';
import CarouselBar from '@/components/common/molecules/CarouselBar';
import StepNextButton from '@/components/common/molecules/StepNextButton';
import Button from '@/components/common/atoms/Button';
import TextCounter from '@/components/test-add/TextCounter';
import type { InputProps } from '@/components/common/atoms/Input';
import { useRouter } from 'next/navigation';

export default function TestAddNamePage() {
  const { category } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const STEP_INDEX = 3;
  const MAX_LENGTH = 30;

  const getInputState = (): InputProps['state'] => {
    if (title.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const handleNext = () => {
    if (!title.trim()) return alert('제목을 입력해주세요!');
    localStorage.setItem(`temp-title-${category}`, title.trim());
    router.push(`/test-add/${category}/about`);
  };

  return (
    <main className="flex min-h-screen w-full">
      <div className="w-1/4 bg-gradient-to-b from-white to-[#D4EED8] relative">
        <Image src="/test2.png" alt="테스트 이미지" fill className="object-center" priority />
      </div>
      <div className="w-3/4 flex flex-col justify-between px-12 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-subtitle-01 font-bold">
              어떤 제목이면 테스터의 눈길을 끌 수 있을까요 ?
            </p>
            <p className="text-body-02 text-Gray-300">
              참여자들에게 직접 보여지는 썸네일 제목입니다.
            </p>
          </div>

          <div className="relative w-fit">
            <Input
              type="text"
              state={getInputState()}
              size="xl"
              placeholder="ex. 베타랩: 효율적인 베타테스트 플랫폼"
              value={title}
              onChange={e => {
                const inputValue = e.target.value;
                if (inputValue.length <= MAX_LENGTH) {
                  setTitle(inputValue);
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={MAX_LENGTH}
            />

            <div className="absolute right-1">
              <TextCounter value={title} maxLength={MAX_LENGTH} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            State="Sub"
            Size="xl"
            label="임시 저장"
            onClick={() => localStorage.setItem(`temp-title-${category}`, title)}
          />
          <CarouselBar activeIndex={STEP_INDEX} total={10} />
          <StepNextButton onClick={handleNext} />
        </div>
      </div>
    </main>
  );
}
