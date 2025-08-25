'use client';

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import ConditionCard from '@/components/test-add/ConditionCard';
import Input from '@/components/common/atoms/Input';
import Button from '@/components/common/atoms/Button';
import Chip from '@/components/common/atoms/Chip';

export type Gender = 'male' | 'female' | null;
export type RewardUI = 'cash' | 'gift' | 'product' | 'etc' | null;
type AgeRange = { min?: number; max?: number } | null;

export type ConditionInitial = {
  genderRequired: boolean;
  gender?: Gender;
  ageRequired: boolean;
  ageMin?: number | null;
  ageMax?: number | null;
  extraRequired: boolean;
  extraText?: string;
  rewardRequired: boolean;
  rewardType?: RewardUI;
  rewardDesc?: string;
  rewardRule?: string;
};

type Props = {
  className?: string;
  initial?: ConditionInitial;
};

export default function ConditionCheck({ className, initial }: Props) {
  const [openGender, setOpenGender] = useState(false);
  const [openAge, setOpenAge] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const [openReward, setOpenReward] = useState(false);

  const [gender, setGender] = useState<Gender>(null);
  const [ageMode, setAgeMode] = useState<'adult' | 'custom' | null>(null);
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');
  const [otherConditions, setOtherConditions] = useState('');
  const [rewardType, setRewardType] = useState<RewardUI>(null);
  const [rewardDesc, setRewardDesc] = useState('');
  const [rewardRule, setRewardRule] = useState('');
  const genderRowRef = useRef<HTMLDivElement | null>(null);
  const ageRowRef = useRef<HTMLDivElement | null>(null);
  const otherRowRef = useRef<HTMLDivElement | null>(null);
  const rewardRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!initial) return;

    setOpenGender(initial.genderRequired);
    setGender(initial.gender ?? null);

    if (initial.ageRequired) {
      setOpenAge(true);
      if (initial.ageMin === 19 && !initial.ageMax) {
        setAgeMode('adult');
      } else {
        setAgeMode('custom');
        setAgeFrom(initial.ageMin?.toString() ?? '');
        setAgeTo(initial.ageMax?.toString() ?? '');
      }
    }

    setOpenOther(initial.extraRequired);
    setOtherConditions(initial.extraText ?? '');

    setOpenReward(initial.rewardRequired);
    setRewardType(initial.rewardType ?? null);
    setRewardDesc(initial.rewardDesc ?? '');
    setRewardRule(initial.rewardRule ?? '');
  }, [initial]);

  const openAndScroll = (which: 'gender' | 'age' | 'other' | 'reward') => {
    setOpenGender(which === 'gender');
    setOpenAge(which === 'age');
    setOpenOther(which === 'other');
    setOpenReward(which === 'reward');
    requestAnimationFrame(() => {
      ({ gender: genderRowRef, age: ageRowRef, other: otherRowRef, reward: rewardRowRef })[
        which
      ].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };
  const toggleOrOpen = (which: 'gender' | 'age' | 'other' | 'reward') => {
    if (which === 'gender' && openGender) return setOpenGender(false);
    if (which === 'age' && openAge) return setOpenAge(false);
    if (which === 'other' && openOther) return setOpenOther(false);
    if (which === 'reward' && openReward) return setOpenReward(false);
    openAndScroll(which);
  };
  const ageSummary: AgeRange =
    openAge && ageMode
      ? ageMode === 'adult'
        ? { min: 19 }
        : { min: Number(ageFrom) || undefined, max: Number(ageTo) || undefined }
      : null;

  const genderText = openGender
    ? gender === 'male'
      ? '남성'
      : gender === 'female'
        ? '여성'
        : '성별 미설정'
    : '성별 미설정';

  const ageText = (() => {
    if (!ageSummary) return '연령 미설정';
    const { min, max } = ageSummary;
    if (min && max) return `${min}-${max}`;
    if (min && !max) return `${min}+`;
    if (!min && max) return `~${max}`;
    return '연령 미설정';
  })();

  const otherText =
    openOther && otherConditions.trim() ? otherConditions.trim() : '추가 조건 미설정';

  const rewardText = openReward && rewardType ? rewardLabel[rewardType] : '리워드 미설정';

  return (
    <div className={clsx('mx-auto w-full max-w-[556px]', className)}>
      {/* 성별 */}
      <Row ref={genderRowRef}>
        <SummaryCard
          value={genderText}
          active={openGender}
          onEdit={() => toggleOrOpen('gender')}
          ariaLabel="성별 수정"
        />
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
              onClick={() => setGender(prev => (prev === 'male' ? null : 'male'))} // 다시 누르면 해제
            />
            <Button
              State={getButtonState(gender === 'female')}
              Size="xxxl"
              label="여성"
              onClick={() => setGender(prev => (prev === 'female' ? null : 'female'))} // 다시 누르면 해제
            />
          </div>
        </ConditionCard>
      </Row>

      {/* 연령 */}
      <Row ref={ageRowRef}>
        <SummaryCard
          value={ageText}
          active={openAge}
          onEdit={() => toggleOrOpen('age')}
          ariaLabel="연령 수정"
        />
        <ConditionCard
          title="연령 설정이 필요해요"
          checked={openAge}
          onToggle={() => setOpenAge(v => !v)}
        >
          <div className="mb-2 text-caption-01 text-Gray-300">연령 모드</div>
          <div className="mb-3 flex gap-3">
            <Chip
              variant={ageMode === 'adult' ? 'active' : 'solid'}
              size="sm"
              onClick={() => {
                setAgeMode(prev => (prev === 'adult' ? null : 'adult')); // 다시 누르면 해제
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
              onClick={() => setAgeMode(prev => (prev === 'custom' ? null : 'custom'))} // 다시 누르면 해제
              showArrowIcon={false}
            >
              직접 입력
            </Chip>
            <Chip
              variant={!ageMode ? 'active' : 'solid'}
              size="sm"
              onClick={() => {
                setAgeMode(null); // 선택 안함
                setAgeFrom('');
                setAgeTo('');
              }}
              showArrowIcon={false}
            >
              선택 안함
            </Chip>
          </div>

          {ageMode === 'custom' && (
            <>
              <div className="mb-2 text-caption-01 text-Gray-300">직접 입력</div>
              <div className="flex items-center gap-3">
                <Input
                  type="text"
                  state={ageFrom ? 'has value' : 'no value'}
                  size="sm"
                  placeholder="시작 연령"
                  value={ageFrom}
                  onChange={e => setAgeFrom(e.target.value)}
                />
                <span className="text-Gray-300">~</span>
                <Input
                  type="text"
                  state={ageTo ? 'has value' : 'no value'}
                  size="sm"
                  placeholder="종료 연령"
                  value={ageTo}
                  onChange={e => setAgeTo(e.target.value)}
                />
              </div>
            </>
          )}
        </ConditionCard>
      </Row>

      {/* 추가 조건 */}
      <Row ref={otherRowRef}>
        <SummaryCard
          value={otherText}
          active={openOther}
          onEdit={() => toggleOrOpen('other')}
          ariaLabel="추가 조건 수정"
        />
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
      </Row>

      {/* 리워드 */}
      <Row ref={rewardRowRef}>
        <SummaryCard
          value={rewardText}
          active={openReward}
          onEdit={() => toggleOrOpen('reward')}
          ariaLabel="리워드 수정"
        />
        <ConditionCard
          title="제공할 리워드가 있어요"
          checked={openReward}
          onToggle={() => setOpenReward(v => !v)}
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-caption-01 text-Gray-300">리워드 종류</p>
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  State={getButtonState(rewardType === 'cash')}
                  Size="xxl"
                  label="현금"
                  onClick={
                    () => setRewardType(prev => (prev === 'cash' ? null : 'cash')) // 다시 누르면 해제
                  }
                />
                <Button
                  className="w-full"
                  State={getButtonState(rewardType === 'gift')}
                  Size="xxl"
                  label="기프티콘"
                  onClick={
                    () => setRewardType(prev => (prev === 'gift' ? null : 'gift')) // 다시 누르면 해제
                  }
                />
                <Button
                  className="w-full"
                  State={getButtonState(rewardType === 'product')}
                  Size="xxl"
                  label="상품"
                  onClick={
                    () => setRewardType(prev => (prev === 'product' ? null : 'product')) // 다시 누르면 해제
                  }
                />
                <Button
                  className="w-full"
                  State={getButtonState(rewardType === 'etc')}
                  Size="xxl"
                  label="기타"
                  onClick={
                    () => setRewardType(prev => (prev === 'etc' ? null : 'etc')) // 다시 누르면 해제
                  }
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-caption-01 text-Gray-300">리워드 세부 설명</p>
              <Input
                className="w-full"
                type="text"
                state={rewardDesc ? 'has value' : 'no value'}
                size="sm"
                placeholder="ex. 설문 완료 시 현금 1만 원 지급"
                value={rewardDesc}
                onChange={e => setRewardDesc(e.target.value)}
              />
            </div>

            <div>
              <p className="mb-2 text-caption-01 text-Gray-300">지급 조건</p>
              <Input
                className="w-full"
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
      </Row>
    </div>
  );
}

const Row = React.forwardRef<HTMLDivElement, React.PropsWithChildren>(({ children }, ref) => {
  const [left, right] = React.Children.toArray(children);
  return (
    <div ref={ref as any} className="mb-4 flex items-start gap-4">
      <div className="w-[258px] shrink-0">{left}</div>
      <div className="w-[290px] shrink-0">{right}</div>
    </div>
  );
});
Row.displayName = 'ConditionRow';

const rewardLabel: Record<Exclude<RewardUI, null>, string> = {
  cash: '현금',
  gift: '기프티콘',
  product: '상품',
  etc: '기타',
};

function SummaryCard({
  value,
  onEdit,
  active,
  ariaLabel,
}: {
  value: string;
  onEdit: () => void;
  active?: boolean;
  ariaLabel?: string;
}) {
  return (
    <div
      className={clsx(
        'w-[258px] flex items-center justify-between rounded-[1px] border px-5 py-4 transition-colors',
        active
          ? 'border-[var(--color-Primary-500)] bg-[var(--color-Primary-100)]'
          : 'border-[var(--color-Gray-100)] bg-[var(--color-White)]',
      )}
    >
      <p
        className={clsx(
          'max-w-[260px] truncate text-body-01',
          active ? 'text-[var(--color-Primary-500)]' : 'text-[var(--color-Gray-300)]',
        )}
      >
        {value}
      </p>
      <button
        type="button"
        onClick={onEdit}
        aria-label={ariaLabel ?? '수정'}
        className={clsx(
          'inline-flex h-8 w-8 items-center justify-center rounded-[6px] transition-colors',
          active
            ? 'text-[var(--color-Primary-500)] bg-[var(--color-Primary-100)]'
            : 'text-[var(--color-Gray-300)] hover:bg-[var(--color-Gray-50)]',
        )}
      >
        <EditPencil className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

function EditPencil({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M19.3393 7.84999C19.7623 7.42712 19.9999 6.85354 20 6.25544C20.0001 5.65733 19.7626 5.0837 19.3397 4.66072C18.9168 4.23774 18.3433 4.00008 17.7452 4C17.1471 3.99992 16.5734 4.23745 16.1505 4.66032L5.47356 15.3398C5.28781 15.525 5.15045 15.753 5.07356 16.0038L4.01675 19.4855C3.99607 19.5546 3.99451 19.6281 4.01223 19.6981C4.02995 19.7681 4.06628 19.832 4.11739 19.8831C4.16849 19.9341 4.23245 19.9703 4.30248 19.9879C4.37251 20.0055 4.446 20.0039 4.51515 19.9831L7.99758 18.927C8.24812 18.8508 8.47613 18.7143 8.66159 18.5294L19.3393 7.84999Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getButtonState(isActive: boolean): 'Focused' | 'Solid' {
  return isActive ? 'Focused' : 'Solid';
}
