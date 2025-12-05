'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [teamSize, setTeamSize] = useState('');
  const [isTeamSizeFocused, setIsTeamSizeFocused] = useState(false);
  const [isIndividual, setIsIndividual] = useState(false);

  const STEP_INDEX = 5;
  const MAX_LENGTH = 30;

  useEffect(() => {
    setIntro(typeof form.creatorIntroduction === 'string' ? form.creatorIntroduction : '');
  }, [form.creatorIntroduction]);

  const getInputState = (): InputProps['state'] => {
    if (intro.length === 0) return 'no value';
    if (isFocused) return 'focused';
    return 'has value';
  };

  const getTeamSizeInputState = (): InputProps['state'] => {
    if (isIndividual) return 'disabled';
    if (teamSize.length === 0) return 'no value';
    if (isTeamSizeFocused) return 'focused';
    return 'has value';
  };

  const isIntroDone = intro.trim().length > 0;
  const showTeamSizeSection = isIntroDone;

  const handleNext = () => {
    const trimmed = intro.trim();
    if (!trimmed) return alert('소속이나 이름을 입력해주세요!');

    const teamMemberCount = isIndividual ? 1 : teamSize ? parseInt(teamSize, 10) : undefined;

    update({
      creatorIntroduction: trimmed,
      teamMemberCount: teamMemberCount,
    });
    save();
    router.push(`/test-add/${category}/tel`);
  };

  const handleSave = () => {
    const teamMemberCount = isIndividual ? 1 : teamSize ? parseInt(teamSize, 10) : undefined;

    update({
      creatorIntroduction: intro,
      teamMemberCount: teamMemberCount,
    });
    save();
  };

  const isButtonVisible = intro.trim().length > 0;

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
      stepIndex={STEP_INDEX}
      onNext={handleNext}
      showSave
      onSave={handleSave}
      saveLabel="임시 저장"
      category={category}
      showNextButton={isButtonVisible}
    >
      <div className="flex flex-col gap-10">
        <motion.div
          className="flex flex-col gap-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
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
        </motion.div>

        <AnimatePresence>
          {isIntroDone && (
            <motion.div
              className="flex flex-col gap-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              custom={1}
              layout
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-5">
                  <div className="flex items-end gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-subtitle-01 font-bold">팀원 수를 적어주세요</p>
                    </div>
                  </div>
                  <div className="w-[556px] flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <div className="text-base font-bold text-Black">직접 입력</div>
                    </div>
                    <Input
                      type="text"
                      state={getTeamSizeInputState()}
                      size="md"
                      placeholder="모집자 수를 입력해주세요"
                      value={teamSize}
                      onChange={e => {
                        if (!isIndividual) {
                          const v = e.target.value.replace(/\D/g, '');
                          const num = parseInt(v, 10);
                          if (v === '' || (!Number.isNaN(num) && num <= 1000)) {
                            setTeamSize(v);
                          }
                        }
                      }}
                      onFocus={() => {
                        if (!isIndividual) {
                          setIsTeamSizeFocused(true);
                        }
                      }}
                      onBlur={() => setIsTeamSizeFocused(false)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newValue = !isIndividual;
                      setIsIndividual(newValue);
                      if (newValue) {
                        setTeamSize('');
                        setIsTeamSizeFocused(false);
                      }
                    }}
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      isIndividual
                        ? 'bg-Primary-500 border border-Primary-500'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {isIndividual && (
                      <svg
                        className="w-2 h-1"
                        viewBox="0 0 8 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 2L3 4L7 0"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                  <label
                    className="text-base font-medium text-gray-600 cursor-pointer"
                    onClick={() => {
                      const newValue = !isIndividual;
                      setIsIndividual(newValue);
                      if (newValue) {
                        setTeamSize('');
                        setIsTeamSizeFocused(false);
                      }
                    }}
                  >
                    개인이에요
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TestAddLayout>
  );
}
