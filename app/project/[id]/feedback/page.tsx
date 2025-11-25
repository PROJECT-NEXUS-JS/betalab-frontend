import FeedbackForm from '@/components/feedback/feedback-form/FeedbackForm';
import TestInfo from '@/components/feedback/TestInfo';
export default async function FeebackPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const projectId = Number(id);

  return (
    <main className="flex gap-10 py-10 px-[63.5px]">
      {/* 테스트 정보 */}
      <TestInfo projectId={projectId} />
      {/* 피드백 폼 */}
      <FeedbackForm projectId={projectId} />
    </main>
  );
}
