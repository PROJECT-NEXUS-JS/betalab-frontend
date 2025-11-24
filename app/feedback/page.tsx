import { cookies } from 'next/headers';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { serverInstance } from '@/apis/server-instance';
import { FeedbackDetailResponseSchema } from '@/hooks/feedback/dto/feedback';
import Logger from '@/lib/logger';
import Image from 'next/image';
import UserProfile from '@/components/common/svg/UserProfile';
import { formatDate } from '@/utils/date';
import FeedbackForm from '@/components/feedback/feedback-form/FeedbackForm';

export default async function FeebackPage({
  params,
}: {
  params: Promise<{
    feedbackId: string;
  }>;
}) {
  // const { feedbackId } = await params;
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get('accessToken')?.value;
  // const refreshToken = cookieStore.get('refreshToken')?.value;

  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: queryKeys.feedback.detail(Number(feedbackId)),
  //   queryFn: () => fetchFeedbackData(Number(feedbackId), accessToken, refreshToken),
  // });

  // const dehydratedState = dehydrate(queryClient);

  // 임시 변수
  const admin_profile = {
    name: '관리자 이름',
    imageUrl: '',
  };
  const tester_profile = {
    name: '테스터 이름',
    imageUrl: '',
  };
  const test = {
    title: '제목입니다 최대 두줄까지 노출되게합니다 제목입니다 최대 두줄까지 노출되게합니다',
    description:
      '테스트개요를 적어주세요.해당글 내용에맞춰서 높이를 설정해주세요 테스트개요를 적어주세요.해당글 내용에맞춰서 높이를 설정해주세요',
    startDate: '2025-11-24T06:40:40.585Z',
    endDate: '2025-11-26T06:40:40.585Z',
  };

  return (
    // <HydrationBoundary state={dehydratedState}>
    <main className="flex gap-10 py-10 px-[63.5px]">
      {/* 테스트 정보 */}
      <section className="w-[258px] h-max p-3 flex flex-col flex-start gap-5 bg-White rounded-sm shadow-card">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="line-clamp-2 text-Black text-xl font-bold">{test.title}</h2>
            <div className="flex items-center gap-1 h-max">
              {admin_profile.imageUrl ? (
                <Image
                  src={admin_profile.imageUrl}
                  alt={admin_profile.name}
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
              <p className="text-xs font-bold text-Dark-Gray">{admin_profile.name}</p>
            </div>
            <div className="flex p-3 items-center bg-Gray-50 rounded-sm">
              <p className="text-Dark-Gray text-sm">{test.description}</p>
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
                {`${formatDate(test.startDate)} - ${formatDate(test.startDate)}`}
              </li>
            </ul>
          </div>
          {/* 테스터 프로필 */}
          <div className="flex items-center gap-1 h-max">
            {tester_profile.imageUrl ? (
              <Image
                src={tester_profile.imageUrl}
                alt={tester_profile.name}
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
            <p className="text-xs font-bold text-Dark-Gray">{tester_profile.name}</p>
          </div>
        </div>
      </section>
      {/* 피드백 폼 */}
      <FeedbackForm />
    </main>

    // </HydrationBoundary>
  );
}

async function fetchFeedbackData(feedbackId: number, accessToken?: string, refreshToken?: string) {
  try {
    const response = await serverInstance(accessToken, refreshToken).get(
      `/v1/feedbacks/${feedbackId}`,
    );
    const parsedData = FeedbackDetailResponseSchema.parse(response.data);

    return parsedData;
  } catch (err) {
    Logger.error('ProjectData 파싱 실패:', err);
    throw err;
  }
}
