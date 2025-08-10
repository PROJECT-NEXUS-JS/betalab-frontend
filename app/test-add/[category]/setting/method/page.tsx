'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import CheckTag from '@/components/common/atoms/CheckTag';
import Chip from '@/components/common/atoms/Chip';
import type { InputProps } from '@/components/common/atoms/Input';
import Input from '@/components/common/atoms/Input';

const OPTIONS = ['구글폼 제출', '앱 내 피드백 경로', '이메일 회신', '슬랙/디스코드 커뮤니티 댓글'];

export default function TestAddPurposePage() {
  const { category } = useParams();
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const inputState: InputProps['state'] = useMemo(() => {
    if (!customOpen) return 'no value';
    if (customValue.length === 0) return 'no value';
    return 'has value';
  }, [customOpen, customValue]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const handleNext = () => {
    localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(selectedTags));
    router.push(`/test-add/${category}/setting/method`);
  };

  const handleSave = () => {
    localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(selectedTags));
  };

  return (
    <TestAddLayout
      leftImageSrc="/test2.png"
      stepIndex={7}
      onNext={handleNext}
      showSave
      onSave={handleSave}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <p className="text-subtitle-01 font-semibold">
            어떤 방식으로 피드백을 수집할 계획인가요?
          </p>
          <CheckTag>중복 선택 가능</CheckTag>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          {OPTIONS.map(option => (
            <Chip
              key={option}
              variant={selectedTags.includes(option) ? 'active' : 'solid'}
              size="sm"
              onClick={() => toggleTag(option)}
              showArrowIcon={false}
            >
              {option}
            </Chip>
          ))}
          <Chip
            variant={customOpen ? 'active' : 'solid'}
            size="sm"
            onClick={() => setCustomOpen(prev => !prev)}
            showArrowIcon={false}
          >
            직접 입력
          </Chip>
        </div>

        {customOpen && (
          <div className="flex flex-col gap-2">
            <p className="text-body-01 font-semibold">직접 입력</p>
            <Input
              type="text"
              size="xl"
              state={inputState}
              placeholder="수집할 피드백 방식을 입력해주세요"
              value={customValue}
              onChange={e => setCustomValue(e.currentTarget.value)}
            />
          </div>
        )}
      </div>
    </TestAddLayout>
  );
}
