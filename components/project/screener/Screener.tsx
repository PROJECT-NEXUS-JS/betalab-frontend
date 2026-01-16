'use client';

import { useState, useMemo, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
import useGetApplicationStatus from '@/hooks/application/queries/useGetApplicationStatus';
import useGetScreenerQuestions from '@/hooks/posts/queries/useGetScreenerQuestions';
import { ProjectDataModel } from '@/hooks/posts/dto/postDetail';

import useScreenerStore from '@/stores/screenerStore';

import { PRIVACY_ITEM_LABELS } from '@/constants/screener';

import CarouselBar from '@/components/common/molecules/CarouselBar';
import { Modal } from '@/components/category/molecules/Modal';
import Button from '@/components/common/atoms/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

/** 질문 타입 */
interface Question {
  id: string;
  question: string;
}

/** 스크리너 질문 배열 생성 함수 */
function createQuestions(
  postDetail: ProjectDataModel | undefined,
  screenerQuestions: string[] | undefined,
) {
  const questions: Question[] = [];

  // 1. AI가 생성한 질문들을 먼저 배열에 담기
  if (screenerQuestions && screenerQuestions.length > 0) {
    screenerQuestions.forEach((q, index) => {
      questions.push({
        id: `screener-${index}`,
        question: q,
      });
    });
  }

  // 2. 개인정보 이용 동의
  // 개인정보 로직은 postDetail이 있을 때만 수행하도록 분리
  const privacyItems = postDetail?.feedback?.privacyItems;

  if (privacyItems && privacyItems.length > 0 && !privacyItems.includes('OTHER')) {
    const koreanPrivacyItems = privacyItems.map(key => PRIVACY_ITEM_LABELS[key]);
    const privacyItemsString = koreanPrivacyItems.join(', ');

    questions.push({
      id: `privacyAgree-${questions.length}`,
      question: `개인 정보 이용 (${privacyItemsString})에 동의하시나요?`,
    });
  }
  return questions;
}

interface ScreenerProps {
  id: number;
}
const Screener = ({ id }: ScreenerProps) => {
  const { isScreenerOpen, setIsScreenerOpen } = useScreenerStore();
  const router = useRouter();

  const { data: postDetail, isLoading: isPostDetailLoading } = useGetPostDetailQuery(id);
  const { data: applicationStatus, isLoading: isApplicationStatusLoading } =
    useGetApplicationStatus(id);
  const { data: screenerQuestions, isLoading: isScreenerQuestionsLoading } =
    useGetScreenerQuestions(id);

  const postDetailData = postDetail?.data;
  const applicationStatusData = applicationStatus?.data;
  const screenerQuestionsData = screenerQuestions?.data.screenerQuestions;

  const [isOpenNotMatchModal, setIsOpenNotMatchModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // postDetail이 로드되면 질문 배열을 생성
  const questions = useMemo(
    () => createQuestions(postDetailData, screenerQuestionsData),
    [postDetailData, screenerQuestionsData],
  );

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // 페이지 이동 로직 - 질문없을때
  useEffect(() => {
    // 로딩이 완료되었을 때만 판단
    const isDataLoaded =
      !isPostDetailLoading && !isApplicationStatusLoading && !isScreenerQuestionsLoading;

    if (isScreenerOpen && isDataLoaded && questions.length === 0) {
      router.push(`/project/${id}/application`);
    }
  }, [
    isScreenerOpen,
    isPostDetailLoading,
    isApplicationStatusLoading,
    isScreenerQuestionsLoading,
    questions.length,
    id,
    router,
  ]);

  // isScreenerOpen 상태가 아니거나, 참가 신청이 돼있으면, 질문이 없으면 안 띄움
  if (
    !isScreenerOpen ||
    (!isApplicationStatusLoading && applicationStatusData) ||
    questions.length === 0
  )
    return null;

  // --- 사용자 액션 핸들러 ---
  const handleAffirmative = () => {
    // 마지막 질문인 경우
    if (isLastQuestion) {
      // 모두 동의시 신청 페이지로 이동
      setIsScreenerOpen(false);
      router.push(`/project/${id}/application`);
    } else {
      // 다음 질문으로 이동
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleNegative = () => {
    setIsOpenNotMatchModal(true);
  };

  return (
    <>
      {isPostDetailLoading || isApplicationStatusLoading || isScreenerQuestionsLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        isScreenerOpen && (
          <Dialog open={isScreenerOpen} onOpenChange={setIsScreenerOpen}>
            {isOpenNotMatchModal ? (
              <Modal
                title="이번 테스트의 조건과는 맞지 않아요."
                description={`아쉽지만 현재 테스트 참여 조건과 일치하지 않아 참여가 어려워요.
  다음 테스트에서 함께할 수 있길 기대할게요 :)`}
                isOpen={isOpenNotMatchModal}
                onClose={() => {
                  setIsScreenerOpen(false);
                  setIsOpenNotMatchModal(false);
                }}
                btnLabel1="다른 테스트 둘러보기"
                btnOnClick1={() => {
                  setIsScreenerOpen(false);
                  setIsOpenNotMatchModal(false);
                  router.push('/');
                }}
              />
            ) : (
              <DialogContent
                showCloseButton={false}
                className="!rounded-none !fixed !top-auto !bottom-0 !left-0 !translate-x-0 !translate-y-0 bg-white !max-w-none py-10 flex flex-col items-center"
              >
                <div className="flex flex-col gap-y-10 items-center">
                  <div className="flex flex-col gap-y-1">
                    <DialogHeader className="flex !flex-row justify-between">
                      <DialogTitle className="text-Black text-subtitle-02 font-semibold">
                        아래 질문에 답변해주세요
                      </DialogTitle>
                      <Image
                        src="/icons/x.svg"
                        alt="close icon"
                        width={24}
                        height={24}
                        onClick={() => setIsScreenerOpen(false)}
                        className="cursor-pointer"
                      />
                    </DialogHeader>
                    <p className="text-body-01  text-Dark-Gray font-medium">
                      조건을 만족하는 참여자를 모집하고 있습니다. 신뢰도 높은 테스트를 위해 함께해
                      주세요!
                    </p>
                  </div>
                  <div className="w-full flex p-3 flex-col gap-10 bg-Primary-100 rounded-xs">
                    <p className="text-body-01 text-Black font-semibold">
                      {currentQuestion.question}
                    </p>
                    <div className="flex gap-x-1 self-end">
                      <Button onClick={handleAffirmative} label="네" Size="lg" State="Primary" />
                      <Button label="아니요" Size="lg" onClick={handleNegative} State="Solid" />
                    </div>
                  </div>
                  <CarouselBar activeIndex={currentQuestionIndex} total={questions.length} />
                </div>
              </DialogContent>
            )}
          </Dialog>
        )
      )}
    </>
  );
};

export default Screener;
