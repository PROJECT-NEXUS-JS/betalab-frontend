import { ApplyCardProps } from '@/components/common/molecules/ApplyCard';
import ProjectDetailCardClient from './ProjectDetailCardClient';

const mockData: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'> = {
  title: '제목입니다 최대 두줄까지 노출되게합니다',
  profile: {
    name: '홍길동',
    affiliation: '가나다대학교',
    imageUrl: undefined,
  },
  description: '프로젝트 설명입니다. 프로젝트 설명입니다. 프로젝트 설명입니다.',
  endDate: new Date(),
  scrapedNumber: 200,
  conditions: [
    { style: 'user condition', texts: ['여성만 가능해요'] },
    { style: 'date', texts: ['하루미만 걸려요'] },
    { style: 'reward', texts: ['현금 지급'] },
    { style: 'route', texts: ['구글폼 제출'] },
    { style: 'qna', texts: ['Q&A는 카카오톡 오픈채팅으로 진행합니다'] },
  ],
  attendees: 0,
  scraped: false,
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <h1>Project Detail Page</h1>
      <p>id: {id}</p>
      <ProjectDetailCardClient {...mockData} />
    </div>
  );
}
