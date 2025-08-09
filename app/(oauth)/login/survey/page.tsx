'use client';
import { useState } from 'react';
import Tag from '@/components/common/atoms/Tag';
import Button from '@/components/common/atoms/Button';
import Chip from '@/components/common/atoms/Chip';
import Label from '@/components/common/molecules/Label';
import ToastPortal from '@/components/common/molecules/ToastPortal';

import { useProfileEditMutation } from '@/hooks/auth/mutations/useProfileEditMutation';

const TEST_CHIP_SELECT_MAX = 5;
const ENTER_DIRECTLY_MAX_LENGTH = 5;

export default function SurveyPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [enterDirectly, setEnterDirectly] = useState(false);
  const [enterDirectlyValue, setEnterDirectlyValue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isDirectlyInputValid, setIsDirectlyInputValid] = useState(true);

  const mutation = useProfileEditMutation();

  const handleTagClick = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    const totalSelected = selectedTags.length + (enterDirectly ? 1 : 0);

    if (isSelected) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (totalSelected >= TEST_CHIP_SELECT_MAX) {
        setShowToast(true);
        return;
      }
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleEnterDirectlyToggle = () => {
    const totalSelected = selectedTags.length + (enterDirectly ? 0 : 1);
    if (totalSelected > TEST_CHIP_SELECT_MAX) return;

    setEnterDirectly(prev => !prev);
    setEnterDirectlyValue('');
  };

  const handleEnterDirectlyValueChange = (text: string) => {
    if (text.length <= ENTER_DIRECTLY_MAX_LENGTH) {
      setEnterDirectlyValue(text);
      setIsDirectlyInputValid(true);
    } else {
      setIsDirectlyInputValid(false);
    }
  };

  const isButtonVisible =
    inputValue.trim() !== '' &&
    isDirectlyInputValid &&
    (selectedTags.length > 0 || // 칩 하나라도 선택 OR
      (enterDirectly && enterDirectlyValue.trim() !== '')); // 직접입력 켜져있고 값 있음

  const handleSubmitButtonClick = () => {
    const formData = {
      job: inputValue,
      interests: [...selectedTags, enterDirectly ? enterDirectlyValue : ''],
    };
    mutation.mutate(formData);
  };

  return (
    <div className="mt-30 w-full flex justify-center">
      <div className="flex flex-col items-center gap-10 w-[556px]">
        <section className="w-full flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-Black">어떤 일을 하고 계신가요 ?</h2>
          <Label
            size="md"
            help={false}
            label={true}
            tag={false}
            tag2={false}
            textCounter={false}
            labelText="직업 입력"
            placeholder="예) 개발자, 디자이너, 대학생 등"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </section>
        <section className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-2xl font-bold text-Black">어떤 테스트에 관심 있으신가요 ?</h2>
              <Tag style="gray" icon={false} onClick={() => {}} label="중복선택 가능" />
            </div>
            <div className="flex flex-wrap gap-4">
              {TEST_CHIP_LIST.map((tag, index) => (
                <Chip
                  key={index}
                  value={tag}
                  variant={selectedTags.includes(tag) ? 'active' : 'solid'}
                  size="lg"
                  onClick={() => {
                    handleTagClick(tag);
                  }}
                  showArrowIcon={false}
                >
                  {tag}
                </Chip>
              ))}
              <Chip
                key={TEST_CHIP_LIST.length}
                value="직접 입력"
                variant={enterDirectly ? 'active' : 'solid'}
                size="lg"
                onClick={handleEnterDirectlyToggle}
              >
                직접 입력
              </Chip>
            </div>
            <div className="w-full flex flex-col">
              {enterDirectly && (
                <Label
                  size="sm"
                  help={!isDirectlyInputValid}
                  label={true}
                  tag={false}
                  tag2={false}
                  textCounter={true}
                  labelText="직접 입력"
                  helpText={`최대 ${ENTER_DIRECTLY_MAX_LENGTH}자까지 가능해요`}
                  placeholder="예) 강아지"
                  value={enterDirectlyValue}
                  onChange={e => handleEnterDirectlyValueChange(e.target.value)}
                  maxLength={ENTER_DIRECTLY_MAX_LENGTH}
                />
              )}
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col">
          {isButtonVisible && (
            <Button
              State="Primary"
              Size="md"
              onClick={handleSubmitButtonClick}
              label="회원가입 하기"
            />
          )}
        </section>
        <ToastPortal
          visible={showToast}
          onClose={() => setShowToast(false)}
          style="error"
          message={`최대 ${TEST_CHIP_SELECT_MAX}개까지 선택할 수 있어요`}
        />
      </div>
    </div>
  );
}

const TEST_CHIP_LIST = [
  '앱',
  '웹',
  '게임',
  'UX 피드백',
  'AI',
  '기능 검증',
  '설문형 테스트',
  '신규 서비스 런칭',
  '리워드 있음',
  '실시간 테스트 참여',
  '핀테크',
  '소셜/커뮤니티',
  '여행/모빌리티',
];
