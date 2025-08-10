'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '@/components/common/atoms/Input';
import TextCounter from '@/components/test-add/TextCounter';
import type { InputProps } from '@/components/common/atoms/Input';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';

export default function TestAddIntroPage() {
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
    if (!title.trim()) return alert('소속이나 이름을 입력해주세요!');
    localStorage.setItem(storageKey, title.trim());
    router.push(`/test-add/${category}/tel`);
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
          <p className="text-subtitle-01 font-bold">소속이나 이름을 간단하게 적어주세요</p>
          <p className="text-body-02 text-Gray-300">참여자들이 보고 문의를 할 수 있어요</p>
        </div>

        <div className="relative w-fit">
          <Input
            type="text"
            state={getInputState()}
            size="xl"
            placeholder="ex. 베타랩 팀, S대 팀 프로젝트"
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
