'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Input from '@/components/common/atoms/Input';
import TextCounter from '@/components/test-add/TextCounter';
import type { InputProps } from '@/components/common/atoms/Input';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';

export default function TestAddIntroPage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const [intro, setIntro] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const STEP_INDEX = 5;
  const MAX_LENGTH = 30;

  useEffect(() => {
    setIntro(typeof form.creatorIntroduction === 'string' ? form.creatorIntroduction : '');
  }, [form.creatorIntroduction]);

  useEffect(() => {
    setIntro(typeof form.creatorIntroduction === 'string' ? form.creatorIntroduction : '');
  }, [form.creatorIntroduction]);

  const getInputState = (): InputProps['state'] => {
    if (intro.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const handleNext = () => {
    const trimmed = intro.trim();
    if (!trimmed) return alert('소속이나 이름을 입력해주세요!');
    update({ creatorIntroduction: trimmed });
    router.push(`/test-add/${category}/tel`);
  };

  const handleSave = () => {
    update({ creatorIntroduction: intro });
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
          <p className="text-subtitle-01 font-bold">소속이나 이름을 간단하게 적어주세요</p>
          <p className="text-body-02 text-Gray-300">참여자들이 보고 문의를 할 수 있어요</p>
        </div>

        <div className="relative w-fit">
          <Input
            type="text"
            state={getInputState()}
            size="xl"
            placeholder="ex. 베타랩 팀, S대 팀 프로젝트"
            value={intro}
            onChange={e => {
              const v = e.target.value;
              if (v.length <= MAX_LENGTH) setIntro(v);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={MAX_LENGTH}
          />
          <div className="absolute right-1">
            <TextCounter value={intro} maxLength={MAX_LENGTH} />
          </div>
        </div>
      </div>
    </TestAddLayout>
  );
}
