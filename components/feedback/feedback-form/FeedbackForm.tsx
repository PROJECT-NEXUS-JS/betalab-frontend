'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { Modal } from '@/components/category/molecules/Modal';
import Button from '@/components/common/atoms/Button';
import StarRating from './StarRating';
import Chip from '@/components/common/atoms/Chip';
import ToastPortal from '@/components/common/molecules/ToastPortal';
import type { ToastProps } from '@/components/common/atoms/Toast';
import TextAreaSection from './TextAreaSection';
import { cn } from '@/lib/utils';
import {
  FeedbackRequestType,
  FeedbackRequestSchema,
  BugType,
  BugTypeEnum,
  MostInconvenientType,
  MostInconvenientEnum,
} from '@/hooks/feedback/dto/feedback';
import useSaveFeedbackDraftMutation from '@/hooks/feedback/mutations/useSaveFeedbackDraftMutation';
import useSubmitFeedbackMutation from '@/hooks/feedback/mutations/useSubmitFeedbackMutation';
import useMyFeedbackQuery from '@/hooks/feedback/queries/useMyFeedbackQuery';

import { INCONVENIENT_LABELS, BUG_TYPE_LABELS, HAS_BUGS_OPTIONS } from '@/constants/feedback';

const chunkArray = <T,>(arr: T[], size: number) => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const CardHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-bold text-Black">{title}</h3>
      <div className="w-full h-[1.5px] bg-Gray-100"></div>
    </div>
  );
};

const FeedbackForm = ({ projectId }: { projectId: number }) => {
  const router = useRouter();

  // --- 스타일 클래스 ---
  // 질문 카드 스타일 클래스
  const cardClass = 'px-3 py-5 shadow-card flex flex-col gap-y-5';
  // 질문 글자 스타일 클래스
  const questionStrClass = 'text-sm font-bold text-Black';

  // --- API Mutation ---
  // 임시저장
  const { mutate: saveDraft } = useSaveFeedbackDraftMutation(projectId);
  // 저장
  const { mutate: submit } = useSubmitFeedbackMutation(projectId);
  // --- API Query ---
  // 기존 피드백 불러오기
  const { data: feedbackDetail, isLoading } = useMyFeedbackQuery(projectId);
  const existingFeedbackData = feedbackDetail?.feedback;

  // --- State ---
  // 초기 상태
  const [formData, setFormData] = useState<FeedbackRequestType>({
    participationId: existingFeedbackData?.participationId ?? 0, // 기본값은 유효하지 않은 id
    overallSatisfaction: existingFeedbackData?.overallSatisfaction ?? 0,
    recommendationIntent: existingFeedbackData?.recommendationIntent ?? 0,
    reuseIntent: existingFeedbackData?.reuseIntent ?? 0,
    functionalityScore: existingFeedbackData?.functionalityScore ?? 0,
    comprehensibilityScore: existingFeedbackData?.comprehensibilityScore ?? 0,
    speedScore: existingFeedbackData?.speedScore ?? 0,
    responseTimingScore: existingFeedbackData?.responseTimingScore ?? 0,
    mostInconvenient: existingFeedbackData?.mostInconvenient ?? MostInconvenientEnum.enum.OTHER,
    hasBug: existingFeedbackData?.hasBug ?? false,
    bugTypes:
      (existingFeedbackData?.bugTypes ?? existingFeedbackData?.hasBug)
        ? [BugTypeEnum.enum.OTHER]
        : [],
    bugLocation: existingFeedbackData?.bugLocation ?? '',
    bugDescription: existingFeedbackData?.bugDescription ?? '',
    screenshotUrls: existingFeedbackData?.screenshotUrls ?? [],
    goodPoints: existingFeedbackData?.goodPoints ?? '',
    improvementSuggestions: existingFeedbackData?.improvementSuggestions ?? '',
    additionalComments: existingFeedbackData?.additionalComments ?? '',
  });

  // 유효성 검사 통과 여부
  const [isValid, setIsValid] = useState(false);
  // 토스트
  type ToastStyle = ToastProps['style'];
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    style: ToastStyle;
  }>({
    show: false,
    message: '',
    style: 'default',
  });
  // 제출 성공 모달
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // --- 유효성 검사 ---
  // 상태 변경 시마다 유효성 검사 (Zod 활용)
  useEffect(() => {
    const result = FeedbackRequestSchema.safeParse(formData);
    setIsValid(result.success);
  }, [formData]);

  // --- 기능 ---
  // 임시 저장
  const handleSaveDraft = useCallback(() => {
    // 제출 전 participationId 검증
    if (!formData.participationId || formData.participationId === 0) {
      setToast({
        show: true,
        message: '참여 정보가 확인되지 않아 제출할 수 없습니다.',
        style: 'error',
      });
      return;
    }

    // 임시: 임시 저장도 유효성 확인
    const result = FeedbackRequestSchema.safeParse(formData);
    if (!isValid) {
      setToast({
        show: true,
        message:
          result?.error?.issues[0].message ?? `앗! 빠진 항목이 있어요.\n내용을 확인해주세요.`,
        style: 'error',
      });
      return;
    }

    saveDraft(formData, {
      onSuccess: () => {
        setToast({ show: true, message: '임시 저장되었습니다.', style: 'default' });
      },
      onError: error => {
        console.error('임시 저장 실패', error);
        // setToast({
        //   show: true,
        //   message: `임시 저장에 실패했어요.\n(오류 코드: [${String(error)}])`,
        //   style: 'error',
        // });
      },
    });
  }, [formData, saveDraft]);

  // Ctrl+S 감지 및 네트워크 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Mac(Meta) 혹은 Windows(Ctrl) + S
      if ((e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault(); // 브라우저 저장 팝업 방지
        if (isValid) {
          handleSubmit();
        } else {
          handleSaveDraft();
        }
      }
    };

    const handleOffline = () => {
      setToast({
        show: true,
        message: `피드백 등록에 실패했어요.\n인터넷 연결을 확인해주세요.`,
        style: 'error',
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleSaveDraft]);

  // --- 핸들러 ---
  // 숫자형 (별점)
  const handleNumberChange = (field: keyof FeedbackRequestType, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  // 텍스트
  const handleTextChange = (field: keyof FeedbackRequestType, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  // 가장 불편했던 점 선택 (단일 선택)
  const selectMostIncovenientType = (value: MostInconvenientType) => {
    setFormData(prev => ({
      ...prev,
      mostInconvenient: value, // 필드명은 스키마(mostInconvenient)와 일치해야 함
    }));
  };
  // 버그 타입 (다중 선택)
  const toggleBugType = (type: BugType) => {
    setFormData(prev => {
      const currentTypes = prev.bugTypes ?? [];

      if (currentTypes.includes(type)) {
        // 이미 있으면 제거
        return { ...prev, bugTypes: currentTypes.filter(t => t !== type) };
      } else {
        // 없으면 추가
        return { ...prev, bugTypes: [...currentTypes, type] };
      }
    });
  };

  // 제출
  const handleSubmit = () => {
    // 제출 전 participationId 검증
    if (!formData.participationId || formData.participationId === 0) {
      setToast({
        show: true,
        message: '참여 정보가 확인되지 않아 제출할 수 없습니다.',
        style: 'error',
      });
      return;
    }

    // 버튼이 활성화되어 있어도 한 번 더 체크
    const result = FeedbackRequestSchema.safeParse(formData);
    if (!isValid) {
      setToast({
        show: true,
        message:
          result?.error?.issues[0].message ?? `앗! 빠진 항목이 있어요.\n내용을 확인해주세요.`,
        style: 'error',
      });
      return;
    }

    submit(formData, {
      onSuccess: () => {
        // 성공 모달 열기
        setSuccessModalOpen(true);
      },
      onError: error => {
        console.error('피드백 등록 실패', error);
        // setToast({
        //   show: true,
        //   message: `피드백 등록에 실패했어요.\n(오류 코드: [${String(error)}])`,
        //   style: 'error',
        // });
      },
    });
  };

  // 평점 섹션 렌더링 도우미
  const renderRatingSection = (label: string, field: keyof FeedbackRequestType) => (
    <div className="flex flex-col gap-y-3">
      <p className={questionStrClass}>{label}</p>
      <StarRating
        value={formData[field] as number}
        onChange={val => handleNumberChange(field, val)}
      />
    </div>
  );

  // 레이블들 개수 나누기 위함
  const chunkedInconvenientLabels = useMemo<[MostInconvenientType, string][][]>(() => {
    const entries = Object.entries(INCONVENIENT_LABELS) as [MostInconvenientType, string][];
    return chunkArray(entries, 3);
  }, []);
  const chunkedBugsLabels = useMemo<[BugType, string][][]>(() => {
    const entries = Object.entries(BUG_TYPE_LABELS) as [BugType, string][];
    return chunkArray(entries, 4);
  }, []);

  if (isLoading) {
    return <p>피드백 로딩 중...</p>;
  }

  return (
    <>
      <section className="flex flex-1 flex-col gap-10">
        {/* 헤더 */}
        <div className="px-3 py-[18px] bg-Gray-50 flex items-center gap-x-2">
          <Image src="/beaker.png" alt="Beaker Icon" width={44} height={44} />
          <h2>피드백 등록</h2>
        </div>
        {/* 전반 평가 */}
        <div className={cardClass}>
          <CardHeader title="전반 평가" />
          {renderRatingSection('전반적인 만족도를 나타내주세요.', 'overallSatisfaction')}
          {renderRatingSection(
            '이 테스트를 다른 사람에게 추천할 의향이 있나요?',
            'recommendationIntent',
          )}
          {renderRatingSection('정식 출시 시 다시 이용할 의향이 있나요?', 'reuseIntent')}
        </div>
        {/* 테스트 품질 관련 피드백 */}
        <div className={cardClass}>
          <CardHeader title="테스트 품질 관련 피드백" />
          <div className="flex flex-col gap-y-5">
            <p className={questionStrClass}>어떤 부분이 가장 불편했나요?</p>
            <div className="flex flex-col gap-y-5">
              {chunkedInconvenientLabels.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-x-3">
                  {row.map(([key, label]) => (
                    <Chip
                      key={key}
                      variant="solid"
                      active={formData.mostInconvenient === key}
                      onClick={() => selectMostIncovenientType(key)}
                      showArrowIcon={false}
                    >
                      {label}
                    </Chip>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 버그 리포트 */}
          <div className="flex flex-col gap-y-5">
            <p className={questionStrClass}>테스트 중 오류나 버그가 있었나요?</p>
            <div className="flex gap-x-3 items-center">
              {HAS_BUGS_OPTIONS.map(({ value, label }) => (
                <Chip
                  key={label}
                  variant="solid"
                  active={formData.hasBug === value}
                  onClick={() => setFormData(prev => ({ ...prev, hasBug: value }))}
                  showArrowIcon={false}
                >
                  {label}
                </Chip>
              ))}
            </div>
          </div>
          {/* 버그가 있을 때만 노출 */}
          {/* 발견된 문제 유형 */}
          {formData.hasBug && (
            <div className="flex flex-col gap-y-5">
              <p className={questionStrClass}>발견된 문제 유형</p>
              <div className="flex flex-col gap-y-5">
                {chunkedBugsLabels.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-x-3">
                    {row.map(([key, label]) => (
                      <Chip
                        key={key}
                        variant="solid"
                        active={(formData.bugTypes ?? []).includes(key)}
                        onClick={() => toggleBugType(key)}
                        showArrowIcon={false}
                      >
                        {label}
                      </Chip>
                    ))}
                  </div>
                ))}
              </div>
              {/* 문제 발생 위치 */}
              <TextAreaSection
                label="문제 발생 위치"
                value={formData.bugLocation ?? ''}
                onChange={val => handleTextChange('bugLocation', val)}
                placeholder="어떤 상황에서, 어떤 화면에서 버그가 발생했나요?"
              />
            </div>
          )}
        </div>
        {/* 기능별 사용성 평가 */}
        <div className={cardClass}>
          <CardHeader title="기능별 사용성 평가" />
          {renderRatingSection('주요 기능이 의도한대로 작동했나요?', 'functionalityScore')}
          {renderRatingSection('기능 설명(가이드)이 이해하기 쉬웠나요?', 'comprehensibilityScore')}
          {renderRatingSection('페이지 로딩 속도는 어땠나요?', 'speedScore')}
          {renderRatingSection('알림푸시 등 반응 타이밍은 적절했나요?', 'responseTimingScore')}
        </div>
        {/* 개선 제안 / 인사이트 */}
        <div className={cardClass}>
          <CardHeader title="개선 제안 / 인사이트" />
          <TextAreaSection
            label="개선되었으면 하는 점이 있었나요?"
            value={formData.improvementSuggestions ?? ''}
            onChange={val => handleTextChange('improvementSuggestions', val)}
            placeholder="예: 메뉴 구성이 직관적이지 않아요. 결제 버튼 위치가 불편해요."
          />
          <TextAreaSection
            label="인상 깊었던 점이나 좋았던 점은 무엇인가요?"
            value={formData.goodPoints ?? ''}
            onChange={val => handleTextChange('goodPoints', val)}
            placeholder="예: 결제 과정이 짧아서 편리해요. 직관적인 디자인이 마음에 들어요."
          />
        </div>
        {/* 기타 / 자유 의견 */}
        <div className={cardClass}>
          <CardHeader title="기타 / 자유 의견" />
          <TextAreaSection
            label="추가로 남기고 싶은 의견이 있다면 자유롭게 적어주세요."
            value={formData.additionalComments ?? ''}
            onChange={val => handleTextChange('additionalComments', val)}
            placeholder="궁금한 점이나 제안할 사항을 무엇이든지 적어주세요."
          />
        </div>
        {/* 하단 버튼 */}
        <div className="flex gap-10 items-center">
          <Button
            State="Sub"
            Size="xxl"
            label="임시 저장"
            className="w-full"
            onClick={handleSaveDraft}
          />
          <Button
            State={isValid ? 'Primary' : 'Disabled'}
            Size="xxl"
            label="완료하기"
            className={cn('w-full', !isValid && 'disabled')}
            onClick={handleSubmit}
          />
        </div>
      </section>
      {/* 토스트 영역 */}
      <ToastPortal
        visible={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
        style={toast.style}
        message={toast.message}
      />
      {/* 모달 영역 */}
      <Modal
        title="성공적으로 테스트를 완료했어요!"
        description="소중한 의견이 잘 전달되었어요. 시간을 내어주셔서 감사합니다."
        isOpen={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          // 진행 중인 테스트
          router.push('');
        }}
        btnLabel1="완료한 테스트 보기"
        btnLabel2="남은 테스트 완료하기"
        btnOnClick1={() => {
          setSuccessModalOpen(false);
          // 내가 참여한 테스트
          router.push('/mypage?tab=participated-tests');
        }}
        btnOnClick2={() => {
          setSuccessModalOpen(false);
          // 진행 중인 테스트
          router.push('');
        }}
      />
    </>
  );
};

export default FeedbackForm;
