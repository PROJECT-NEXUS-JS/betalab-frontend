import FeedbackForm from '@/components/feedback/feedback-form/FeedbackForm';
import TestInfo from '@/components/feedback/TestInfo';
export default async function FeebackPage({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) {
  const { projectId } = await params;

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
    <main className="flex gap-10 py-10 px-[63.5px]">
      {/* 테스트 정보 */}
      <TestInfo projectId={Number(projectId)} />
      {/* 피드백 폼 */}
      <FeedbackForm projectId={Number(projectId)} />
    </main>
  );
}
