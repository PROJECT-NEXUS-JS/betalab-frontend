'use client';

import { useState, useMemo } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
import useGetApplicationStatus from '@/hooks/application/queries/useGetApplicationStatus';
import { ProjectDataModel } from '@/hooks/posts/dto/postDetail';
import { CategoryType } from '@/types/models/testCard';

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
function createQuestions(postDetail: ProjectDataModel | undefined) {
  const questions: Question[] = [];

  // 정보 안들어오면 빈 배열 리턴
  if (!postDetail) return questions;

  // 1. 플랫폼 질문
  // 특정 플랫폼을 요구하면
  if (
    postDetail.platformCategories.findIndex(
      (category: CategoryType) =>
        category.code === 'WEB_ALL' ||
        category.code === 'APP_ALL' ||
        category.code === 'GAME_ALL' ||
        category.code === 'ETC_ALL',
    ) !== -1
  ) {
    const platformNames = postDetail.platformCategories.map((p: CategoryType) => p.name);
    const platformString = platformNames.join(' 또는 ');
    questions.push({
      id: 'platform',
      question: `현재 ${platformString} 기기를 사용하고 계신가요?`,
    });
  }
  // 2. 성별 질문
  // 무관이 아닌 경우
  if (postDetail.requirement.genderRequirement !== '무관') {
    questions.push({
      id: 'gender',
      question: `${postDetail.requirement.genderRequirement}이신가요 ?`,
    });
  }
  // 3. 나이 질문
  if (postDetail.requirement.ageMin && postDetail.requirement.ageMax) {
    questions.push({
      id: 'age',
      question: `나이가 ${postDetail.requirement.ageMin}세 이상 ${postDetail.requirement.ageMax}세 이하이신가요?`,
    });
  } else if (postDetail.requirement.ageMin) {
    questions.push({
      id: 'age',
      question: `나이가 ${postDetail.requirement.ageMin}세 이상이신가요?`,
    });
  } else if (postDetail.requirement.ageMax) {
    questions.push({
      id: 'age',
      question: `나이가 ${postDetail.requirement.ageMax}세 이하이신가요?`,
    });
  }
  // // 4. 추가 조건
  // if (postDetail.requirement.additionalRequirements) {
  //   questions.push({
  //     id: 'additionalRequirments',
  //     question: `추가 조건 "${postDetail.requirement.additionalRequirements}"을 만족하시나요?`,
  //   });
  // }

  // 5. 개인정보 이용 동의
  if (
    postDetail.feedback.privacyItems &&
    postDetail.feedback.privacyItems.length > 0 &&
    !postDetail.feedback.privacyItems.includes('OTHER')
  ) {
    // 한국어로 바꿈
    const koreanPrivacyItems = postDetail.feedback.privacyItems.map(
      (key: string) => PRIVACY_ITEM_LABELS[key],
    );
    // 쉼표로 연결
    const privacyItemsString = koreanPrivacyItems.join(', ');
    questions.push({
      id: 'privacyAgree',
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

  const postDetailData = postDetail?.data;
  const applicationStatusData = applicationStatus?.data;

  const [isOpenNotMatchModal, setIsOpenNotMatchModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // postDetail이 로드되면 질문 배열을 생성
  const questions = useMemo(() => createQuestions(postDetailData), [postDetail]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // isScreenerOpen 상태가 아니면 안 띄움
  if (!isScreenerOpen) return null;

  // 참가 신청 돼있으면 안 띄움
  if (!isApplicationStatusLoading && applicationStatusData) {
    return null;
  }

  // postDetail 로딩 중 또는 데이터가 없을 경우
  if (!postDetail || isPostDetailLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  // 질문이 없으면 안 띄움
  if (questions.length === 0) {
    return null;
  }

  // --- 사용자 액션 핸들러 ---
  const handleAffirmative = () => {
    // 마지막 질문인 경우
    if (isLastQuestion) {
      // 모두 동의시 신청 페이지로 이동
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
                조건을 만족하는 참여자를 모집하고 있습니다. 신뢰도 높은 테스트를 위해 함께해 주세요!
              </p>
            </div>
            <div className="w-full flex p-3 flex-col gap-10 bg-Primary-100 rounded-xs">
              <p className="text-body-01 text-Black font-semibold">{currentQuestion.question}</p>
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
  );
};

export default Screener;
