'use client';

import Image from 'next/image';
import UserProfile from '@/components/common/svg/UserProfile';
import { formatDate } from '@/utils/date';
import { useGetRightSidebar } from '@/hooks/posts/queries/usePostRightSidebar';
import { useGetPostDetailQuery } from '@/hooks/posts/queries/usePostDetailQuery';
import { useUserInfoQuery } from '@/hooks/auth/queries/useUserInfoQuery';
const TestInfo = ({ projectId }: { projectId: number }) => {
  const { data: postData } = useGetPostDetailQuery(projectId);
  const { data: rightSidebarData } = useGetRightSidebar(projectId);
  const { data: userData } = useUserInfoQuery();
  const projectData = rightSidebarData?.data;
  const projectSchedule = postData?.data.schedule;

  return (
    <section className="w-[258px] h-max p-3 flex flex-col flex-start gap-5 bg-White rounded-sm shadow-card">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="line-clamp-2 text-Black text-xl font-bold">{projectData?.testName}</h2>
          <div className="flex items-center gap-1 h-max">
            {projectData?.profileUrl ? (
              <Image
                src={projectData?.profileUrl}
                alt={projectData?.recruiterName}
                width={24}
                height={24}
                onError={e => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none'; // 이미지 에러 시 숨김 처리
                }}
              />
            ) : (
              <UserProfile className="w-6 h-6" />
            )}
            <p className="text-xs font-bold text-Dark-Gray">{projectData?.recruiterName}</p>
          </div>
          <div className="flex p-3 items-center bg-Gray-50 rounded-sm">
            <p className="text-Dark-Gray text-sm">{projectData?.testSummary}</p>
          </div>
        </div>
        {/* 구분선 */}
        <div className="w-full h-[1.5px] bg-Gray-100"></div>
        <div className="flex flex-col gap-2">
          <div className="flex p-1 items-center justify-center gap-2 bg-Primary-100 rounded-sm w-max">
            <Image
              src={'/icons/condition-icon/timer.svg'}
              alt="Syren Logo"
              width={24}
              height={24}
            />
            <p className="text-sm text-Primary-500 font-bold">테스트 기간</p>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li className="pl-8 text-xs text-Dark-Gray">
              {`${formatDate(projectSchedule?.startDate)} - ${formatDate(projectSchedule?.endDate)}`}
            </li>
          </ul>
        </div>
        {/* 테스터 프로필 */}
        <div className="flex items-center gap-1 h-max">
          {userData?.profileUrl ? (
            <Image
              src={userData?.profileUrl}
              alt={userData?.nickname}
              width={24}
              height={24}
              onError={e => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none'; // 이미지 에러 시 숨김 처리
              }}
            />
          ) : (
            <UserProfile className="w-6 h-6" />
          )}
          <p className="text-xs font-bold text-Dark-Gray">{userData?.nickname}</p>
        </div>
      </div>
    </section>
  );
};

export default TestInfo;
