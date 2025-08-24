'use client';

import { useRouter } from 'next/navigation';
import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';

interface Props {
  projectId: number;
  ApplyCardProps: Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'>;
}

export default function ProjectDetailCardClient({ projectId, ApplyCardProps }: Props) {
  const router = useRouter();
  const handleScrap = () => {
    console.log('scrap clicked');
  };

  const handleRegister = () => {
    router.push(`/project/${projectId}/application`);
  };

  return (
    <ApplyCard {...ApplyCardProps} scrapClicked={handleScrap} registerClicked={handleRegister} />
  );
}
