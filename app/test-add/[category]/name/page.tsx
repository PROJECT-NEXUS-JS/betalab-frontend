'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Input from '@/components/common/atoms/Input';
import TextCounter from '@/components/test-add/TextCounter';
import type { InputProps } from '@/components/common/atoms/Input';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';

export default function TestAddNamePage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const STEP_INDEX = 3;
  const MAX_LENGTH = 30;

  useEffect(() => {
    const legacyKey = `temp-title-${category}`;
    const legacy = typeof window !== 'undefined' ? localStorage.getItem(legacyKey) : null;
    const initial = (typeof form.title === 'string' && form.title) || legacy || '';
    setTitle(initial);
  }, [form.title, category]);

  const getInputState = (): InputProps['state'] => {
    if (title.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const handleNext = () => {
    const trimmed = title.trim();
    if (!trimmed) return alert('제목을 입력해주세요!');
    update({ title: trimmed });
    router.push(`/test-add/${category}/about`);
  };

  const handleSave = () => {
    update({ title });
    save();
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
              const v = e.target.value;
              if (v.length <= MAX_LENGTH) setTitle(v);
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
