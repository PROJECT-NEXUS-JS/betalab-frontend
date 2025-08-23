'use client';
import { useState } from 'react';

import Label from '@/components/common/molecules/Label';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import RemindCard from '@/components/common/atoms/RemindCard';
import Button from '@/components/common/atoms/Button';

import { transformToApplyCardProps } from '@/lib/mapper/apply-card';
import { useGetRightSidebar } from '@/hooks/posts/query/usePostRightSidebar';

export default function ApplicationClientWrapper({ id }: { id: number }) {
  const [applicationData, setApplicationData] = useState({
    applicantName: '',
    contactNumber: '',
    applicantEmail: '',
    applicationReason: '',
    privacyAgreement: false,
    termsAgreement: false,
  });

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
    // Handle form submission
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
                help={false}
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
              />
              <Label
                size="md"
                help={false}
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
              />
            </div>
            <Label
              size="xl"
              help={false}
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
            />
            <Label
              size="xl"
              help={false}
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
            />
          </section>
          <section className="w-full flex flex-col items-start justify-center gap-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="privacyAgreement"
                className="appearance-none border-[2px] border-Gray-100 rounded-sm bg-White w-5 h-5"
                checked={applicationData.privacyAgreement}
                onChange={e =>
                  setApplicationData({ ...applicationData, privacyAgreement: e.target.checked })
                }
              />
              <p className="text-sm font-bold text-Dark-Gray">개인정보 동의</p>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="termsAgreement"
                className="appearance-none border-[2px] border-Gray-100 rounded-sm bg-White w-5 h-5"
                checked={applicationData.termsAgreement}
                onChange={e =>
                  setApplicationData({ ...applicationData, termsAgreement: e.target.checked })
                }
              />
              <p className="text-sm font-bold text-Dark-Gray">참여조건 동의</p>
            </div>
          </section>
          <RemindCard />
          <Button State="Primary" Size="xxxl" label="신청하기" onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
}
