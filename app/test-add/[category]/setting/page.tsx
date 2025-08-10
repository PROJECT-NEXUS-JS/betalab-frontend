'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  const router = useRouter();

  const [feedbackTags, setFeedbackTags] = useState<string[]>([]);
  const [customFeedbackOpen, setCustomFeedbackOpen] = useState(false);
  const [customFeedbackValue, setCustomFeedbackValue] = useState('');

  const [timeTags, setTimeTags] = useState<string[]>([]);
  const [customTimeOpen, setCustomTimeOpen] = useState(false);
  const [customTimeValue, setCustomTimeValue] = useState('');

  const [recruitCount, setRecruitCount] = useState(50);
  const [customRecruitOpen, setCustomRecruitOpen] = useState(false);
  const [customRecruitValue, setCustomRecruitValue] = useState('');

  const [deadline, setDeadline] = useState('');

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

  const recruitInputState: InputProps['state'] = useMemo(() => {
    if (!customRecruitOpen) return 'no value';
    if (customRecruitValue.length === 0) return 'no value';
    return 'has value';
  }, [customRecruitOpen, customRecruitValue]);

  const toggleTag = (tag: string, type: 'feedback' | 'time') => {
    if (type === 'feedback') {
      setFeedbackTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    } else {
      setTimeTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    }
  };

  const handleNext = () => {
    const feedbackData = [...feedbackTags, ...(customFeedbackValue ? [customFeedbackValue] : [])];
    const timeData = [...timeTags, ...(customTimeValue ? [customTimeValue] : [])];
    const recruitData = customRecruitValue ? parseInt(customRecruitValue, 10) : recruitCount;

    localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(feedbackData));
    localStorage.setItem(`temp-time-${category}`, JSON.stringify(timeData));
    localStorage.setItem(`temp-recruit-${category}`, JSON.stringify(recruitData));
    localStorage.setItem(`temp-deadline-${category}`, deadline);

    router.push(`/test-add/${category}/finish`);
  };

  const handleSave = () => {
    localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(feedbackTags));
    localStorage.setItem(`temp-time-${category}`, JSON.stringify(timeTags));
    localStorage.setItem(`temp-recruit-${category}`, JSON.stringify(recruitCount));
    localStorage.setItem(`temp-deadline-${category}`, deadline);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4 },
    }),
  };

  return (
    <TestAddLayout
      leftImageSrc="/test2.png"
      stepIndex={7}
      onNext={handleNext}
      showSave
      onSave={handleSave}
    >
      <div className="flex flex-col gap-10">
        <motion.div
          className="flex flex-col gap-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
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
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
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
                placeholder="예: 평일 매일 30분, 총 3일 등"
                value={customTimeValue}
                onChange={e => setCustomTimeValue(e.currentTarget.value)}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <p className="text-subtitle-01 font-semibold">몇 명의 참여자를 모집할까요?</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setRecruitCount(prev => Math.max(prev - 1, 1))}
              className="w-10 h-10 border rounded"
            >
              -
            </button>
            <div className="w-20 text-center bg-gray-50 py-2 rounded font-semibold">
              {recruitCount}
            </div>
            <button
              type="button"
              onClick={() => setRecruitCount(prev => prev + 1)}
              className="w-10 h-10 border rounded"
            >
              +
            </button>
          </div>
          <Chip
            variant={customRecruitOpen ? 'active' : 'solid'}
            size="sm"
            onClick={() => setCustomRecruitOpen(prev => !prev)}
            showArrowIcon={false}
          >
            직접 입력
          </Chip>
          {customRecruitOpen && (
            <Input
              type="number"
              size="xl"
              placeholder="참여자 수를 입력해주세요"
              state={recruitInputState}
              value={customRecruitValue}
              onChange={e => setCustomRecruitValue(e.currentTarget.value)}
            />
          )}
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <p className="text-subtitle-01 font-semibold">언제까지 참여자를 모집할까요?</p>
          <Input
            type="date"
            size="xl"
            placeholder="YYYY.MM.DD"
            state="no value"
            value={deadline}
            onChange={e => setDeadline(e.currentTarget.value)}
          />
        </motion.div>
      </div>
    </TestAddLayout>
  );
}
