'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Input from '@/components/common/atoms/Input';
import TextCounter from '@/components/test-add/TextCounter';
import type { InputProps } from '@/components/common/atoms/Input';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';

export default function TestAddAboutPage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const [summary, setSummary] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const STEP_INDEX = 4;
  const MAX_LENGTH = 30;

  useEffect(() => {
    setSummary(typeof form.description === 'string' ? form.description : '');
  }, [form.description]);

  useEffect(() => {
    setSummary(typeof form.description === 'string' ? form.description : '');
  }, [form.description]);

  const getInputState = (): InputProps['state'] => {
    if (summary.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const handleNext = () => {
    const trimmed = summary.trim();
    if (!trimmed) return alert('한줄 소개를 입력해주세요!');
    update({ description: trimmed });
    save();
    router.push(`/test-add/${category}/intro`);
  };

  const handleSave = () => {
    update({ description: summary });
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
      category={category}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-subtitle-01 font-bold">
            이 테스트는 어떤 서비스인가요?
            <br />
            한줄로 소개해주세요.
          </p>
          <p className="text-body-02 text-Gray-300">참여자들에게 직접 보여지는 한 줄 소개입니다.</p>
        </div>

        <div className="relative w-fit">
          <Input
            type="text"
            state={getInputState()}
            size="xl"
            placeholder="ex. 비효율적인 베타 테스트? 베타랩이 해결합니다"
            value={summary}
            onChange={e => {
              const v = e.target.value;
              if (v.length <= MAX_LENGTH) setSummary(v);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={MAX_LENGTH}
          />
          <div className="absolute right-1">
            <TextCounter value={summary} maxLength={MAX_LENGTH} />
          </div>
        </div>
      </div>
    </TestAddLayout>
  );
}
