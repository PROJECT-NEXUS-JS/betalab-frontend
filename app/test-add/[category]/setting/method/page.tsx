'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import CheckTag from '@/components/common/atoms/CheckTag';
import Chip from '@/components/common/atoms/Chip';
import Input, { type InputProps } from '@/components/common/atoms/Input';

const FEEDBACK_OPTIONS = [
  '구글폼 제출',
  '앱 내 피드백 경로',
  '이메일 회신',
  '슬랙/디스코드 커뮤니티 댓글',
];
const TIME_OPTIONS = [
  '하루 미만',
  '3일 이상 사용',
  '일주일 이상 사용',
  '하루 미만 사용 (간단 테스트)',
];

export default function TestAddPurposePage() {
  const { category } = useParams();
  const [step, setStep] = useState(1);

  const [feedbackTags, setFeedbackTags] = useState<string[]>([]);
  const [customFeedbackOpen, setCustomFeedbackOpen] = useState(false);
  const [customFeedbackValue, setCustomFeedbackValue] = useState('');

  const [timeTags, setTimeTags] = useState<string[]>([]);
  const [customTimeOpen, setCustomTimeOpen] = useState(false);
  const [customTimeValue, setCustomTimeValue] = useState('');

  const feedbackInputState: InputProps['state'] = useMemo(() => {
    if (!customFeedbackOpen) return 'no value';
    if (customFeedbackValue.length === 0) return 'no value';
    return 'has value';
  }, [customFeedbackOpen, customFeedbackValue]);

  const timeInputState: InputProps['state'] = useMemo(() => {
    if (!customTimeOpen) return 'no value';
    if (customTimeValue.length === 0) return 'no value';
    return 'has value';
  }, [customTimeOpen, customTimeValue]);

  const toggleTag = (tag: string, type: 'feedback' | 'time') => {
    if (type === 'feedback') {
      setFeedbackTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    } else {
      setTimeTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      const feedbackData = [...feedbackTags, ...(customFeedbackValue ? [customFeedbackValue] : [])];
      const timeData = [...timeTags, ...(customTimeValue ? [customTimeValue] : [])];
      localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(feedbackData));
      localStorage.setItem(`temp-time-${category}`, JSON.stringify(timeData));
      // TODO: 마지막에 router.push() 넣기
    }
  };

  return (
    <TestAddLayout
      leftImageSrc="/test2.png"
      stepIndex={7}
      onNext={handleNext}
      showSave
      onSave={() => {
        localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(feedbackTags));
        localStorage.setItem(`temp-time-${category}`, JSON.stringify(timeTags));
      }}
    >
      <div className="flex flex-col gap-10">
        {/* Step 1 - 피드백 수집 */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <p className="text-subtitle-01 font-semibold">
              어떤 방식으로 피드백을 수집할 계획인가요?
            </p>
            <CheckTag>중복 선택 가능</CheckTag>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            {FEEDBACK_OPTIONS.map(option => (
              <Chip
                key={option}
                variant={feedbackTags.includes(option) ? 'active' : 'solid'}
                size="sm"
                onClick={() => toggleTag(option, 'feedback')}
                showArrowIcon={false}
              >
                {option}
              </Chip>
            ))}
            <Chip
              variant={customFeedbackOpen ? 'active' : 'solid'}
              size="sm"
              onClick={() => setCustomFeedbackOpen(prev => !prev)}
              showArrowIcon={false}
            >
              직접 입력
            </Chip>
          </div>
          {customFeedbackOpen && (
            <div className="flex flex-col gap-2">
              <p className="text-body-01 font-semibold">직접 입력</p>
              <Input
                type="text"
                size="xl"
                state={feedbackInputState}
                placeholder="수집할 피드백 방식을 입력해주세요"
                value={customFeedbackValue}
                onChange={e => setCustomFeedbackValue(e.currentTarget.value)}
              />
            </div>
          )}
        </div>
        {step >= 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <p className="text-subtitle-01 font-semibold">
                참여자가 테스트에 얼마의 시간을 들여야 할까요?
              </p>
              <CheckTag>중복 선택 가능</CheckTag>
            </div>
            <div className="flex gap-3 flex-wrap items-center">
              {TIME_OPTIONS.map(option => (
                <Chip
                  key={option}
                  variant={timeTags.includes(option) ? 'active' : 'solid'}
                  size="sm"
                  onClick={() => toggleTag(option, 'time')}
                  showArrowIcon={false}
                >
                  {option}
                </Chip>
              ))}
              <Chip
                variant={customTimeOpen ? 'active' : 'solid'}
                size="sm"
                onClick={() => setCustomTimeOpen(prev => !prev)}
                showArrowIcon={false}
              >
                직접 입력
              </Chip>
            </div>
            {customTimeOpen && (
              <div className="flex flex-col gap-2">
                <p className="text-body-01 font-semibold">직접 입력</p>
                <Input
                  type="text"
                  size="xl"
                  state={timeInputState}
                  placeholder="테스트 소요시간을 입력해주세요"
                  value={customTimeValue}
                  onChange={e => setCustomTimeValue(e.currentTarget.value)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </TestAddLayout>
  );
}
