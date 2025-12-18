'use client';

import {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import Button from '@/components/common/atoms/Button';
import Chip from '@/components/common/atoms/Chip';
import Tag from '@/components/common/atoms/Tag';
import Label from '@/components/common/molecules/Label';
import { useUserInfoQuery } from '@/hooks/auth/queries/useUserInfoQuery';
import { useUpdateCustomInfoMutation } from '@/hooks/mypage/mutations/useUpdateCustomInfoMutation';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TEST_CHIP_LIST,
  PREFERRED_GENRES_LIST,
  TEST_CHIP_SELECT_MAX,
  ENTER_DIRECTLY_MAX_LENGTH,
} from '@/components/mypage/constants/customInfo';

type Gender = 'MALE' | 'FEMALE';

export interface CustomInfoContentRef {
  handleSave: () => void;
  isFormValid: boolean;
}

interface CustomInfoContentProps {
  onBack: () => void;
  onFormValidChange?: (isValid: boolean) => void;
}

const CustomInfoContent = forwardRef<CustomInfoContentRef, CustomInfoContentProps>(
  ({ onBack, onFormValidChange }, ref) => {
    const { data: userInfo, isLoading } = useUserInfoQuery();
    const { mutate: updateCustomInfo, isPending: isSaving } = useUpdateCustomInfoMutation();
    const onBackRef = useRef(onBack);

    useEffect(() => {
      onBackRef.current = onBack;
    }, [onBack]);

    const [gender, setGender] = useState<Gender | null>(null);
    const [birthYear, setBirthYear] = useState('');
    const [job, setJob] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [enterDirectly, setEnterDirectly] = useState(false);
    const [enterDirectlyValue, setEnterDirectlyValue] = useState('');
    const [isDirectlyInputValid, setIsDirectlyInputValid] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const [initialInterests, setInitialInterests] = useState<string[]>([]);
    const [initialGenres, setInitialGenres] = useState<string[]>([]);
    const [initialEnterDirectly, setInitialEnterDirectly] = useState(false);
    const [initialEnterDirectlyValue, setInitialEnterDirectlyValue] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
      if (userInfo && !isInitialized) {
        setGender((userInfo.gender as Gender) || null);
        if (userInfo.birthDate) {
          const year = userInfo.birthDate.split('-')[0];
          setBirthYear(`${year}년`);
        } else {
          setBirthYear('');
        }
        setJob(userInfo.job || '');
        const interests = userInfo.interests || [];
        setSelectedInterests(interests);

        setInitialInterests(interests);
        setInitialGenres([]);
        setIsInitialized(true);
      }
    }, [userInfo, isInitialized]);

    const handleTagClick = (tag: string) => {
      const isSelected = selectedInterests.includes(tag);
      const totalSelected = selectedInterests.length + (enterDirectly ? 1 : 0);

      if (isSelected) {
        setSelectedInterests(selectedInterests.filter(t => t !== tag));
      } else {
        if (totalSelected >= TEST_CHIP_SELECT_MAX) {
          return;
        }
        setSelectedInterests(prev => [...prev, tag]);
      }
    };

    const handleEnterDirectlyToggle = () => {
      const totalSelected = selectedInterests.length + (enterDirectly ? 0 : 1);
      if (totalSelected >= TEST_CHIP_SELECT_MAX) {
        return;
      }

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

    const handleSave = useCallback(() => {
      const filteredInterests = [
        ...selectedInterests,
        enterDirectly && enterDirectlyValue.trim() ? enterDirectlyValue : '',
      ].filter(item => item.trim() !== '');

      updateCustomInfo(
        {
          job,
          birthYear,
          gender: gender || '',
          interests: filteredInterests,
          preferredGenres: selectedGenres,
        },
        {
          onSuccess: () => {
            setInitialInterests(filteredInterests);
            setInitialGenres(selectedGenres);
            setInitialEnterDirectly(enterDirectly);
            setInitialEnterDirectlyValue(enterDirectlyValue);
            onBackRef.current();
          },
        },
      );
    }, [
      selectedInterests,
      enterDirectly,
      enterDirectlyValue,
      selectedGenres,
      job,
      birthYear,
      gender,
      updateCustomInfo,
    ]);

    const currentInterests = useMemo(() => {
      return [
        ...selectedInterests,
        enterDirectly && enterDirectlyValue.trim() ? enterDirectlyValue : '',
      ]
        .filter(item => item.trim() !== '')
        .sort();
    }, [selectedInterests, enterDirectly, enterDirectlyValue]);

    const hasInterestsChanged = useMemo(() => {
      if (!isInitialized) return false;
      const sortedCurrent = [...currentInterests].sort();
      const sortedInitial = [...initialInterests].sort();
      return JSON.stringify(sortedCurrent) !== JSON.stringify(sortedInitial);
    }, [isInitialized, currentInterests, initialInterests]);

    const hasGenresChanged = useMemo(() => {
      if (!isInitialized) return false;
      const sortedCurrent = [...selectedGenres].sort();
      const sortedInitial = [...initialGenres].sort();
      return JSON.stringify(sortedCurrent) !== JSON.stringify(sortedInitial);
    }, [isInitialized, selectedGenres, initialGenres]);

    const hasChanges = useMemo(() => {
      if (!isInitialized) return false;
      return hasInterestsChanged || hasGenresChanged;
    }, [isInitialized, hasInterestsChanged, hasGenresChanged]);

    const isFormValid = hasChanges && !isSaving;

    useEffect(() => {
      if (onFormValidChange) {
        onFormValidChange(isFormValid);
      }
    }, [isFormValid, onFormValidChange]);

    useImperativeHandle(
      ref,
      () => ({
        handleSave,
        isFormValid,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleSave, isFormValid],
    );

    return (
      <div className="w-full inline-flex flex-col justify-start items-end gap-10">
        <div className="self-stretch flex flex-col justify-start items-start">
          <h2 className="text-xl font-bold text-Black mb-5">
            베타랩님에게 딱 맞는 서비스를 위한 정보
          </h2>
          <p className="text-body-02 font-medium text-Dark-Gray mb-5">
            맞춤 정보는 테스트 추천에 활용됩니다.
          </p>
        </div>

        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          <div className="self-stretch inline-flex justify-start items-center gap-10">
            <div className="w-14 text-body-01 font-semibold text-Black">성별</div>
            {isLoading ? (
              <Skeleton className="w-[556px] h-11" />
            ) : (
              <div className="flex justify-start items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGender('MALE')}
                  className={`h-11 px-5 rounded-[1px] outline-1 outline-offset-[-1px] flex justify-center items-center gap-2.5 transition-colors ${
                    gender === 'MALE'
                      ? 'bg-sky-50 outline-blue-600'
                      : 'bg-white outline-gray-200 hover:outline-gray-300'
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      gender === 'MALE' ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    남성
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('FEMALE')}
                  className={`h-11 px-5 rounded-[1px] outline-1 outline-offset-[-1px] flex justify-center items-center gap-2.5 transition-colors ${
                    gender === 'FEMALE'
                      ? 'bg-sky-50 outline-blue-600'
                      : 'bg-white outline-gray-200 hover:outline-gray-300'
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      gender === 'FEMALE' ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    여성
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="self-stretch inline-flex justify-start items-start gap-10">
            <div className="text-body-01 font-semibold text-Black">출생년도</div>
            {isLoading ? (
              <Skeleton className="w-[556px] h-11" />
            ) : (
              <div className="w-[556px] p-4 bg-gray-200 rounded-sm flex justify-between items-center">
                <div className="flex-1 text-caption-01 font-bold text-Light-Gray">
                  {birthYear || '정보 없음'}
                </div>
              </div>
            )}
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-10">
            <div className="w-14 text-body-01 font-semibold text-Black">직업</div>
            {isLoading ? (
              <Skeleton className="w-[556px] h-11" />
            ) : (
              <div className="w-[556px] p-4 bg-white rounded-sm outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-center">
                <input
                  type="text"
                  className="flex-1 text-caption-01 font-bold text-gray-600 focus:outline-none"
                  value={job}
                  onChange={e => setJob(e.target.value)}
                  placeholder="예) 개발자, 디자이너, 대학생 등"
                />
              </div>
            )}
          </div>
        </div>

        <div className="self-stretch flex flex-col gap-6">
          <h2 className="text-xl font-bold text-Black">내 관심사</h2>
          <div className="w-full flex items-center justify-between">
            <h2 className="text-subtitle-01 font-bold text-Black">
              어떤 테스트에 관심 있으신가요 ?
            </h2>
            <Tag style="gray" icon={false} onClick={() => {}} label="중복선택 가능" />
          </div>
          <div className="flex flex-wrap gap-4">
            {TEST_CHIP_LIST.map((tag, index) => (
              <Chip
                key={index}
                value={tag}
                variant={selectedInterests.includes(tag) ? 'active' : 'solid'}
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
              showArrowIcon={false}
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

        <div className="self-stretch flex flex-col gap-6">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-subtitle-01 font-bold text-Black">
              선호하는 테스트의 장르가 있으신가요?
            </h2>
            <Tag style="gray" icon={false} onClick={() => {}} label="중복선택 가능" />
          </div>
          <div className="flex flex-wrap gap-4">
            {PREFERRED_GENRES_LIST.map((genre, index) => (
              <Chip
                key={index}
                value={genre}
                variant={selectedGenres.includes(genre) ? 'active' : 'solid'}
                size="lg"
                onClick={() => {
                  if (selectedGenres.includes(genre)) {
                    setSelectedGenres(selectedGenres.filter(g => g !== genre));
                  } else {
                    setSelectedGenres([...selectedGenres, genre]);
                  }
                }}
                showArrowIcon={false}
              >
                {genre}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

CustomInfoContent.displayName = 'CustomInfoContent';

export default CustomInfoContent;
