'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import CheckTag from '@/components/common/atoms/CheckTag';
import Chip from '@/components/common/atoms/Chip';
import Input, { type InputProps } from '@/components/common/atoms/Input';
import DatePicker from '@/components/common/molecules/DatePicker';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

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
  const [recruitTouched, setRecruitTouched] = useState(false);

  const [deadlineRange, setDeadlineRange] = useState<DateRange | undefined>();

  const feedbackInputState: InputProps['state'] = useMemo(() => {
    if (!customFeedbackOpen) return 'no value';
    return customFeedbackValue.length === 0 ? 'no value' : 'has value';
  }, [customFeedbackOpen, customFeedbackValue]);

  const timeInputState: InputProps['state'] = useMemo(() => {
    if (!customTimeOpen) return 'no value';
    return customTimeValue.length === 0 ? 'no value' : 'has value';
  }, [customTimeOpen, customTimeValue]);

  const recruitInputState: InputProps['state'] = useMemo(() => {
    if (!customRecruitOpen) return 'no value';
    return customRecruitValue.length === 0 ? 'no value' : 'has value';
  }, [customRecruitOpen, customRecruitValue]);

  const isFeedbackDone =
    feedbackTags.length > 0 || (customFeedbackOpen && customFeedbackValue.trim().length > 0);
  const showTimeSection = isFeedbackDone;

  const isTimeDone = timeTags.length > 0 || (customTimeOpen && customTimeValue.trim().length > 0);
  const showRecruitSection = showTimeSection && isTimeDone;

  const isRecruitValid = customRecruitOpen
    ? !!customRecruitValue && Number(customRecruitValue) > 0
    : recruitCount > 0;
  const isRecruitDone = recruitTouched && isRecruitValid;
  const showDeadlineSection = showRecruitSection && isRecruitDone;

  const isDeadlineDone = !!(deadlineRange?.from && deadlineRange?.to);
  const canProceed = isFeedbackDone && isTimeDone && isRecruitDone && isDeadlineDone;

  const timeRef = useRef<HTMLDivElement | null>(null);
  const recruitRef = useRef<HTMLDivElement | null>(null);
  const deadlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showTimeSection) timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [showTimeSection]);

  useEffect(() => {
    if (showRecruitSection)
      recruitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [showRecruitSection]);

  useEffect(() => {
    if (showDeadlineSection)
      deadlineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [showDeadlineSection]);

  const toggleTag = (tag: string, type: 'feedback' | 'time') => {
    if (type === 'feedback') {
      setFeedbackTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    } else {
      setTimeTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    }
  };

  const saveDeadlineToLS = (range: DateRange | undefined) => {
    const formatted =
      range?.from && range?.to
        ? `${format(range.from, 'yyyy.MM.dd')} - ${format(range.to, 'yyyy.MM.dd')}`
        : '';

    const raw =
      range?.from && range?.to
        ? {
            from: range.from.toISOString(),
            to: range.to.toISOString(),
          }
        : null;

    localStorage.setItem(`temp-deadline-${category}`, formatted);
    localStorage.setItem(`temp-deadline-raw-${category}`, JSON.stringify(raw));
  };

  const handleNext = () => {
    if (!canProceed) {
      alert('모든 항목을 입력/선택해 주세요.');
      return;
    }

    const feedbackData = [...feedbackTags, ...(customFeedbackValue ? [customFeedbackValue] : [])];
    const timeData = [...timeTags, ...(customTimeValue ? [customTimeValue] : [])];
    const recruitData = customRecruitValue ? parseInt(customRecruitValue, 10) : recruitCount;

    localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(feedbackData));
    localStorage.setItem(`temp-time-${category}`, JSON.stringify(timeData));
    localStorage.setItem(`temp-recruit-${category}`, JSON.stringify(recruitData));
    saveDeadlineToLS(deadlineRange);

    router.push(`/test-add/${category}/condition`);
  };

  const handleSave = () => {
    localStorage.setItem(`temp-purpose-${category}`, JSON.stringify(feedbackTags));
    localStorage.setItem(`temp-time-${category}`, JSON.stringify(timeTags));
    localStorage.setItem(`temp-recruit-${category}`, JSON.stringify(recruitCount));
    saveDeadlineToLS(deadlineRange);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.35 },
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

        <AnimatePresence>
          {showTimeSection && (
            <motion.div
              ref={timeRef}
              className="flex flex-col gap-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              custom={1}
              layout
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
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRecruitSection && (
            <motion.div
              ref={recruitRef}
              className="flex flex-col gap-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              custom={2}
              layout
            >
              <p className="text-subtitle-01 font-semibold">몇 명의 참여자를 모집할까요?</p>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setRecruitTouched(true);
                    setRecruitCount(prev => Math.max(prev - 1, 1));
                  }}
                  className="w-10 h-10 border rounded"
                >
                  -
                </button>
                <div className="w-20 text-center bg-Gray-50 py-2 rounded font-semibold">
                  {recruitCount}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRecruitTouched(true);
                    setRecruitCount(prev => prev + 1);
                  }}
                  className="w-10 h-10 border rounded"
                >
                  +
                </button>
              </div>

              <Chip
                variant={customRecruitOpen ? 'active' : 'solid'}
                size="sm"
                onClick={() => {
                  setRecruitTouched(true);
                  setCustomRecruitOpen(prev => !prev);
                }}
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
                  onChange={e => {
                    setRecruitTouched(true);
                    setCustomRecruitValue(e.currentTarget.value);
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeadlineSection && (
            <motion.div
              ref={deadlineRef}
              className="flex flex-col gap-4"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              custom={3}
              layout
            >
              <p className="text-subtitle-01 font-semibold">언제까지 참여자를 모집할까요?</p>
              <DatePicker value={deadlineRange} onChange={setDeadlineRange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TestAddLayout>
  );
}
