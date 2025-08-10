'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '@/components/common/atoms/Input';
import TextCounter from '@/components/test-add/TextCounter';
import type { InputProps } from '@/components/common/atoms/Input';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';

export default function TestAddContactPage() {
  const { category } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const STEP_INDEX = 5;
  const MAX_LENGTH = 30;
  const storageKey = `temp-title-${category}`;

  const getInputState = (): InputProps['state'] => {
    if (title.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const handleNext = () => {
    if (!title.trim()) return alert('연락처를 입력해주세요!');
    localStorage.setItem(storageKey, title.trim());
    router.push(`/test-add/${category}/purpose`);
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, title);
  };

  return (
    <TestAddLayout
      leftImageSrc="/test2.png"
      stepIndex={STEP_INDEX}
      onNext={handleNext}
      showSave
      onSave={handleSave}
      saveLabel="임시 저장"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">연락 가능한 채널을 등록해주세요</p>
          <p className="text-body-02 text-Gray-300">
            참여자들이 직접 연락할 수 있도록, 전화·이메일·오픈채팅 등 원하는 채널을 남겨주세요.
          </p>
        </div>

        <div className="relative w-fit">
          <Input
            type="text"
            state={getInputState()}
            size="xl"
            placeholder="예: open.kakao.com/abcd1234 또는 BetaLab@email.com"
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
    </TestAddLayout>
  );
}
