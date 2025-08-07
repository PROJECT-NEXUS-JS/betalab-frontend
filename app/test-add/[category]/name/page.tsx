'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/common/atoms/Input';
import CarouselBar from '@/components/common/molecules/CarouselBar';
import StepNextButton from '@/components/common/molecules/StepNextButton';
import Button from '@/components/common/atoms/Button';
import type { InputProps } from '@/components/common/atoms/Input';
import { useRouter } from 'next/navigation';

export default function TestAddNamePage() {
  const { category } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const STEP_INDEX = 3;

  const getInputState = (): InputProps['state'] => {
    if (title.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const handleNext = () => {
    if (!title.trim()) return alert('제목을 입력해주세요!');
    localStorage.setItem(`temp-title-${category}`, title.trim());
    console.log('입력된 제목:', title);
    router.push('/test-add/app/intro');
  };

  return (
    <main className="flex min-h-screen">
      <div className="w-1/4 bg-gradient-to-b from-white to-[#D4EED8] relative">
        <Image src="/test2.png" alt="테스트 이미지" fill className="object-cover" priority />
      </div>

      <div className="w-1/2 flex flex-col justify-between px-12 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-subtitle-01 font-bold">
              어떤 제목이면 테스터의 눈길을 끌 수 있을까요 ?
            </p>
            <p className="text-body-02 text-Gray-300">
              참여자들에게 직접 보여지는 썸네일 제목입니다.
            </p>
          </div>

          <Input
            type="text"
            state={getInputState()}
            size="xl"
            placeholder="ex. 베타랩: 효율적인 베타테스트 플랫폼"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-8">
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
      </div>
    </main>
  );
}
