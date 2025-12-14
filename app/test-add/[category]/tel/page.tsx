'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Input from '@/components/common/atoms/Input';
import type { InputProps } from '@/components/common/atoms/Input';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';

export default function TestAddContactPage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const [contact, setContact] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const STEP_INDEX = 6;

  useEffect(() => {
    setContact(typeof form.qnaMethod === 'string' ? form.qnaMethod : '');
  }, [form.qnaMethod]);

  useEffect(() => {
    setContact(typeof form.qnaMethod === 'string' ? form.qnaMethod : '');
  }, [form.qnaMethod]);

  const getInputState = (): InputProps['state'] => {
    if (contact.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const handleNext = () => {
    const trimmed = contact.trim();
    if (!trimmed) return alert('연락처를 입력해주세요!');
    update({ qnaMethod: trimmed });
    save();
    router.push(`/test-add/${category}/purpose`);
  };

  const handleSave = () => {
    update({ qnaMethod: contact });
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
            value={contact}
            onChange={e => {
              setContact(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
    </TestAddLayout>
  );
}
