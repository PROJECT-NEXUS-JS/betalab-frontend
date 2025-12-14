'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { applicationSchema, ApplicationFormData } from '@/hooks/application/dto/apply';

import Label from '@/components/common/molecules/Label';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import RemindCard from '@/components/common/atoms/RemindCard';
import Button from '@/components/common/atoms/Button';

import { transformToApplyCardProps } from '@/lib/mapper/apply-card';
import { useGetRightSidebar } from '@/hooks/posts/queries/usePostRightSidebar';

import { usePostApplyMutation } from '@/hooks/application/mutations/usePostApplyMutation';
import { Modal } from '@/components/category/molecules/Modal';
import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';

export default function ApplicationClientWrapper({ id }: { id: number }) {
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<ApplicationFormData>({
    applicantName: '',
    contactNumber: '',
    applicantEmail: '',
    applicationReason: '',
    // @ts-ignore
    // 형식 할당 오류 나오는데 true로 동의 안하면 zod 스키마 에러 나게 하려고...
    privacyAgreement: false,
    // @ts-ignore
    termsAgreement: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const {
    data: rightSidebarData,
    isLoading: isRightSidebarLoading,
    isError: isRightSidebarError,
  } = useGetRightSidebar(Number(id));
  const { data: postDetailData } = useGetPostDetailQuery(Number(id));

  const applyCardData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> = {
    ...transformToApplyCardProps(
      rightSidebarData?.data ?? {
        testName: '',
        recruiterName: '',
        recruiterAffiliation: '',
        profileUrl: '',
        testSummary: '',
        daysRemaining: 0,
        scrapCount: 0,
        currentParticipants: 0,
        participationTarget: '',
        requiredDuration: '',
        rewardInfo: '',
        participationMethod: '',
        qnaMethod: '',
      },
      postDetailData?.data?.status ?? 'PENDING', // 상태 추가
    ),
    scrapedAndRegisterShow: false,
  };

  const handleSubmitButtonClicked = () => {
    const result = applicationSchema.safeParse(applicationData);

    if (!result.success) {
      // 유효성 검사 실패 시 에러 상태 업데이트
      const fieldErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
      for (const issue of result.error.issues) {
        const pathKey = issue.path[0];
        if (typeof pathKey === 'string' || typeof pathKey === 'number') {
          const key = String(pathKey) as keyof ApplicationFormData;
          if (key in applicationData) {
        fieldErrors[key] = issue.message;
          }
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // 유효성 검사 성공 시
    setErrors({}); // 에러 메시지 초기화
    setConfirmModalOpen(true);
  };

  const { mutate: postApply } = usePostApplyMutation(id);

  const handleSubmit = () => {
    postApply(applicationData, {
      onSuccess: () => {
        setSuccessModalOpen(true);
      },
      onError: error => {
        alert(`신청 실패: ${error.message}`);
      },
    });
  };

  if (isRightSidebarLoading) return <div>로딩 중...</div>;
  if (isRightSidebarError) return <div>에러 발생</div>;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl mt-10 gap-10">
        <aside className="flex">
          <ApplyCard {...applyCardData} />
        </aside>
        <div className="flex flex-1 flex-col max-w-[854px] w-full gap-5">
          <section className="w-full flex flex-col items-start justify-center gap-4">
            <div className="flex items-start gap-10 w-max self-stretch">
              <Label
                size="md"
                label={true}
                labelText="이름"
                placeholder="이름을 입력해주세요."
                tag={true}
                tag2={false}
                textCounter={false}
                tagStyle="필수"
                className="!max-w-[292px] !w-full"
                value={applicationData.applicantName}
                onChange={e =>
                  setApplicationData({ ...applicationData, applicantName: e.target.value })
                }
                help={!!errors.applicantName}
                helpText={errors.applicantName}
              />
              <Label
                size="md"
                label={true}
                labelText="연락처"
                placeholder="숫자만 입력해주세요."
                tag={true}
                tag2={false}
                textCounter={false}
                tagStyle="필수"
                className="!max-w-[292px]"
                value={applicationData.contactNumber}
                onChange={e =>
                  setApplicationData({ ...applicationData, contactNumber: e.target.value })
                }
                help={!!errors.contactNumber}
                helpText={errors.contactNumber}
              />
            </div>
            <Label
              size="xl"
              label={true}
              labelText="이메일"
              placeholder="올바른 형식의 이메일을 입력해주세요."
              tag={false}
              tag2={false}
              textCounter={false}
              className="!max-w-full"
              value={applicationData.applicantEmail}
              onChange={e =>
                setApplicationData({ ...applicationData, applicantEmail: e.target.value })
              }
              help={!!errors.applicantEmail}
              helpText={errors.applicantEmail}
            />
            <Label
              size="xl"
              label={true}
              labelText="신청 이유"
              placeholder="테스트에 신청한 이유를 간단하게 적어주세요."
              tag={true}
              tag2={false}
              textCounter={true}
              maxLength={100}
              tagStyle="필수"
              className="!max-w-full"
              value={applicationData.applicationReason}
              onChange={e =>
                setApplicationData({ ...applicationData, applicationReason: e.target.value })
              }
              help={!!errors.applicationReason}
              helpText={errors.applicationReason}
            />
          </section>
          <section className="w-full flex flex-col items-start justify-center gap-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="privacyAgreement"
                className="!border-[2px] border-Gray-100 rounded-sm bg-White w-5 h-5"
                checked={applicationData.privacyAgreement}
                onChange={e => {
                  // @ts-ignore
                  setApplicationData({ ...applicationData, privacyAgreement: e.target.checked });
                }}
              />
              <p className="text-sm font-bold text-Dark-Gray">개인정보 동의</p>
            </div>
            {!!errors.privacyAgreement && (
              <p className="text-xs font-bold text-Error">{errors.privacyAgreement}</p>
            )}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="termsAgreement"
                className="!border-[2px] border-Gray-100 rounded-sm bg-White w-5 h-5"
                checked={applicationData.termsAgreement}
                onChange={e => {
                  // @ts-ignore
                  setApplicationData({ ...applicationData, termsAgreement: e.target.checked });
                }}
              />
              <p className="text-sm font-bold text-Dark-Gray">참여조건 동의</p>
            </div>
            {!!errors.termsAgreement && (
              <p className="text-xs font-bold text-Error">{errors.termsAgreement}</p>
            )}
          </section>
          <RemindCard />
          <Button
            State="Primary"
            Size="xxxl"
            label="신청하기"
            onClick={() => handleSubmitButtonClicked()}
          />
        </div>
      </div>
      <Modal
        title="신청하기"
        description={`이 테스트에 신청할까요 ?
신청 후에는 취소할 수 없으며, 입력한 정보가 그대로 전달됩니다.
승인 여부는 모집자가 결정하게 돼요`}
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        btnLabel1="취소하기"
        btnLabel2="확인하기"
        btnOnClick1={() => setConfirmModalOpen(false)}
        btnOnClick2={() => {
          setConfirmModalOpen(false);
          handleSubmit();
        }}
      />
      <Modal
        title="신청을 완료했어요!"
        description={`승인되면 카톡 알람을 통해 알려드릴게요
기다리시는동안 다른 테스트를 둘러보세요!`}
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        btnLabel1="다른 테스트 보기"
        btnLabel2="신청 내역 확인하기"
        btnOnClick1={() => {
          setSuccessModalOpen(false);
          router.push('/category');
        }}
        btnOnClick2={() => {
          setSuccessModalOpen(false);
          router.push('/mypage');
        }}
      />
    </div>
  );
}
