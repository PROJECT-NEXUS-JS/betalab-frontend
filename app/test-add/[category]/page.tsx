'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import Selector from '@/components/common/molecules/Selector';
import Chip from '@/components/common/atoms/Chip';
import CheckTag from '@/components/common/atoms/CheckTag';
import { useTestAddForm } from '@/hooks/test-add/useTestAddForm';
import {
  UI_TO_API_APP,
  UI_TO_API_GAME,
  API_TO_UI_APP,
  API_TO_UI_GAME,
  PLATFORM_MAP,
} from '@/constants/platformMapping';

export default function TestAddPlatformStep() {
  const { category } = useParams<{ category: string }>();
  const STEP_INDEX = 1;
  const router = useRouter();
  const { form, update, save } = useTestAddForm();

  const options = useMemo(() => PLATFORM_MAP[category] ?? [], [category]);
  const isGame = category === 'game';
  const [selectedSingle, setSelectedSingle] = useState<string | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  useEffect(() => {
    const apiValues: string[] = Array.isArray(form.platformCategory) ? form.platformCategory : [];
    const API_TO_UI = isGame ? API_TO_UI_GAME : API_TO_UI_APP;
    const uiValues = apiValues.map((api: string) => API_TO_UI[api]).filter(Boolean) as string[];

    if (isGame) {
      const validValues = uiValues.filter(ui => options.includes(ui));
      if (validValues.length > 0) setSelectedMultiple(validValues);
    } else {
      const ui = uiValues[0];
      if (ui && options.includes(ui)) setSelectedSingle(ui);
    }
  }, [form.platformCategory, options, isGame]);

  const toggle = (value: string) =>
    setSelectedMultiple(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
    );

  const handleNext = () => {
    const UI_TO_API = isGame ? UI_TO_API_GAME : UI_TO_API_APP;

    if (isGame) {
      if (selectedMultiple.length === 0) {
        alert('플랫폼을 선택해주세요!');
        return;
      }
      update({
        platformCategory: selectedMultiple.map(ui => UI_TO_API[ui]),
      });
    } else {
      if (!selectedSingle) {
        alert('플랫폼을 선택해주세요!');
        return;
      }
      update({
        platformCategory: [UI_TO_API[selectedSingle]],
      });
    }
    save();
    router.push(`/test-add/${category}/genre`);
  };

  return (
    <TestAddLayout leftImageSrc="/test1.png" stepIndex={STEP_INDEX} onNext={handleNext}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-subtitle-01 font-bold">어떤 플랫폼을 이용해야 될까요?</p>
            {isGame && <CheckTag>중복 선택 가능</CheckTag>}
          </div>
          <p className="text-body-02 text-Gray-300">선택한 항목은 나중에도 변경할 수 있어요.</p>
        </div>

        {isGame ? (
          <div className="flex flex-wrap gap-2">
            {options.map(option => (
              <Chip
                key={option}
                variant={selectedMultiple.includes(option) ? 'active' : 'solid'}
                size="sm"
                onClick={() => toggle(option)}
                showArrowIcon={false}
              >
                {option}
              </Chip>
            ))}
          </div>
        ) : (
          <Selector<string>
            options={options}
            selected={selectedSingle}
            onSelect={setSelectedSingle}
          />
        )}
      </div>
    </TestAddLayout>
  );
}
