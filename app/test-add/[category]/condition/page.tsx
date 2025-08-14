'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TestAddLayout from '@/components/test-add/layouts/TestAddLayout';
import ConditionCard from '@/components/test-add/ConditionCard';
import Input from '@/components/common/atoms/Input';
import Button from '@/components/common/atoms/Button';
import Chip from '@/components/common/atoms/Chip';

type ButtonState = 'Focused' | 'Solid';

export default function TestAddConditionsPage() {
  const router = useRouter();
  const { category } = useParams<{ category?: string }>();

  const [openGender, setOpenGender] = useState(false);
  const [openAge, setOpenAge] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const [openReward, setOpenReward] = useState(false);

  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [ageMode, setAgeMode] = useState<'adult' | 'custom' | null>(null);
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');
  const [otherConditions, setOtherConditions] = useState('');
  const [rewardType, setRewardType] = useState<'cash' | 'gift' | 'product' | 'etc' | null>(null);
  const [rewardDesc, setRewardDesc] = useState('');
  const [rewardRule, setRewardRule] = useState('');

  const storageKey = `test-add:conditions:${category ?? 'default'}`;

  const handleSave = () => {
    const payload = {
      open: { gender: openGender, age: openAge, other: openOther, reward: openReward },
      gender,
      age: {
        from: ageFrom ? Number(ageFrom) : null,
        to: ageTo ? Number(ageTo) : null,
      },
      other: otherConditions.trim(),
      reward: {
        type: rewardType,
        desc: rewardDesc.trim(),
        rule: rewardRule.trim(),
      },
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
    alert('임시 저장되었습니다.');
  };

  const handleNext = () => {
    handleSave();
    router.push(`/test-add/${category}/detail`);
  };

  const getButtonState = (isActive: boolean): ButtonState => (isActive ? 'Focused' : 'Solid');

  return (
    <TestAddLayout
      leftImageSrc="/test2.png"
      leftImageClassName="object-cover"
      leftPanelClassName="from-White to-Gray-50"
      stepIndex={6}
      totalSteps={10}
      onNext={handleNext}
      onSave={handleSave}
      showSave
      saveLabel="임시 저장"
    >
      <div className="mx-auto w-full max-w-[1000px]">
        <h1 className="text-subtitle-01 font-bold mb-6">참여 조건 설정이 필요하신가요 ?</h1>
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-12 md:col-span-4">
            <ConditionCard
              title="성별 설정이 필요해요"
              checked={openGender}
              onToggle={() => setOpenGender(v => !v)}
            >
              <div className="mb-2 text-caption-01 text-Gray-300">성별 설정</div>
              <div className="flex gap-3">
                <Button
                  State={getButtonState(gender === 'male')}
                  Size="xxxl"
                  label="남성"
                  onClick={() => setGender('male')}
                />
                <Button
                  State={getButtonState(gender === 'female')}
                  Size="xxxl"
                  label="여성"
                  onClick={() => setGender('female')}
                />
              </div>
            </ConditionCard>
          </div>

          <div className="col-span-12 md:col-span-4">
            <ConditionCard
              title="연령 설정이 필요해요"
              checked={openAge}
              onToggle={() => setOpenAge(v => !v)}
            >
              <div className="mb-2 text-caption-01 text-Gray-300">연령 모드</div>
              <div className="flex gap-3 mb-3">
                <Chip
                  variant={ageMode === 'adult' ? 'active' : 'solid'}
                  size="sm"
                  onClick={() => {
                    setAgeMode('adult');
                    setAgeFrom('');
                    setAgeTo('');
                  }}
                  showArrowIcon={false}
                >
                  성인
                </Chip>
                <Chip
                  variant={ageMode === 'custom' ? 'active' : 'solid'}
                  size="sm"
                  onClick={() => setAgeMode('custom')}
                  showArrowIcon={false}
                >
                  직접 입력
                </Chip>
              </div>

              {ageMode === 'custom' && (
                <>
                  <div className="mb-2 text-caption-01 text-Gray-300">직접 입력</div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      state={
                        ageMode === 'custom' ? (ageFrom ? 'has value' : 'no value') : 'disabled'
                      }
                      size="sm"
                      placeholder="시작 연령"
                      value={ageFrom}
                      onChange={e => setAgeFrom(e.target.value)}
                    />
                    <span className="text-Gray-300">~</span>
                    <Input
                      type="text"
                      state={ageMode === 'custom' ? (ageTo ? 'has value' : 'no value') : 'disabled'}
                      size="sm"
                      placeholder="종료 연령"
                      value={ageTo}
                      onChange={e => setAgeTo(e.target.value)}
                    />
                  </div>
                </>
              )}
            </ConditionCard>
          </div>

          <div className="col-span-12 md:col-span-4">
            <ConditionCard
              title="이외의 원하는 대상 조건이 있어요"
              checked={openOther}
              onToggle={() => setOpenOther(v => !v)}
            >
              <div className="mb-2 text-caption-01 text-Gray-300">대상 조건</div>
              <Input
                type="text area"
                state={otherConditions ? 'has value' : 'no value'}
                size="sm"
                placeholder="ex. 서울 거주자, iOS 사용자 등"
                value={otherConditions}
                onChange={e => setOtherConditions(e.target.value)}
              />
            </ConditionCard>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <ConditionCard
              title="제공할 리워드가 있어요"
              checked={openReward}
              onToggle={() => setOpenReward(v => !v)}
            >
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-4">
                  <p className="text-caption-01 text-Gray-300 mb-2">리워드 종류</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-full max-w-[480px]">
                    <Button
                      State={getButtonState(rewardType === 'cash')}
                      Size="xxl"
                      label="현금"
                      onClick={() => setRewardType('cash')}
                    />
                    <Button
                      State={getButtonState(rewardType === 'gift')}
                      Size="xxl"
                      label="기프티콘"
                      onClick={() => setRewardType('gift')}
                    />
                    <Button
                      State={getButtonState(rewardType === 'product')}
                      Size="xxl"
                      label="상품"
                      onClick={() => setRewardType('product')}
                    />
                    <Button
                      State={getButtonState(rewardType === 'etc')}
                      Size="xxl"
                      label="기타"
                      onClick={() => setRewardType('etc')}
                    />
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                  <p className="text-caption-01 text-Gray-300 mb-2">리워드 세부 설명</p>
                  <Input
                    type="text"
                    state={rewardDesc ? 'has value' : 'no value'}
                    size="sm"
                    placeholder="ex. 설문 완료 시 현금 1만 원 지급"
                    value={rewardDesc}
                    onChange={e => setRewardDesc(e.target.value)}
                  />
                </div>

                <div className="col-span-12 lg:col-span-4">
                  <p className="text-caption-01 text-Gray-300 mb-2">지급 조건</p>
                  <Input
                    type="text"
                    state={rewardRule ? 'has value' : 'no value'}
                    size="sm"
                    placeholder="ex. 설문 내역 검수 후 리워드 제공"
                    value={rewardRule}
                    onChange={e => setRewardRule(e.target.value)}
                  />
                </div>
              </div>
            </ConditionCard>
          </div>
        </div>
      </div>
    </TestAddLayout>
  );
}
