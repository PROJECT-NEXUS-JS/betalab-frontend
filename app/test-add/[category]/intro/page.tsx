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
  const [teamSize, setTeamSize] = useState('');
  const [isTeamSizeFocused, setIsTeamSizeFocused] = useState(false);
  const [isIndividual, setIsIndividual] = useState(false);

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

  const getTeamSizeInputState = (): InputProps['state'] => {
    if (teamSize.length === 0) return 'no value';
    if (isTeamSizeFocused) return 'focused';
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
              <div className={isIndividual ? 'opacity-50 pointer-events-none' : ''}>
                <Input
                  type="text"
                  state={isIndividual ? 'disabled' : getTeamSizeInputState()}
                  size="md"
                  placeholder="모집자 수를 입력해주세요"
                  value={teamSize}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, '');
                    setTeamSize(v);
                  }}
                  onFocus={() => setIsTeamSizeFocused(true)}
                  onBlur={() => setIsTeamSizeFocused(false)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsIndividual(!isIndividual);
                if (!isIndividual) {
                  setTeamSize('');
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
                setIsIndividual(!isIndividual);
                if (!isIndividual) {
                  setTeamSize('');
                }
              }}
            >
              개인이에요
            </label>
          </div>
        </div>
      </div>
    </TestAddLayout>
  );
}
