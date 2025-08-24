'use client';
import { useState } from 'react';
import { applicationSchema, ApplicationFormData } from '@/hooks/application/dto/apply';

import Label from '@/components/common/molecules/Label';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import RemindCard from '@/components/common/atoms/RemindCard';
import Button from '@/components/common/atoms/Button';

import { transformToApplyCardProps } from '@/lib/mapper/apply-card';
import { useGetRightSidebar } from '@/hooks/posts/query/usePostRightSidebar';

import { usePostApplyMutation } from '@/hooks/application/mutations/usePostApplyMutation';

export default function ApplicationClientWrapper({ id }: { id: number }) {
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

  const {
    data: rightSidebarData,
    isLoading: isRightSidebarLoading,
    isError: isRightSidebarError,
  } = useGetRightSidebar(Number(id));

  const applyCardData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> = {
    ...transformToApplyCardProps(
      rightSidebarData?.data ?? {
        testName: '',
        recruiterName: '',
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
    ),
    scrapedAndRegisterShow: false,
  };

  const handleSubmit = () => {
    const result = applicationSchema.safeParse(applicationData);

    if (!result.success) {
      // 유효성 검사 실패 시 에러 상태 업데이트
      const fieldErrors: { [key: string]: string } = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ApplicationFormData;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return; // 제출 중단
    }

    // 유효성 검사 성공 시
    setErrors({}); // 에러 메시지 초기화
    console.log('유효성 검사 통과! 제출할 데이터:', result.data);
    // TODO: 이 곳에 서버로 데이터를 전송하는 API 호출 로직을 구현하세요.
    // 예: const { data } = await api.post('/applications', result.data);
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
              tag={false}
              tag2={false}
              textCounter={true}
              maxLength={100}
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
          <Button State="Primary" Size="xxxl" label="신청하기" onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
}
