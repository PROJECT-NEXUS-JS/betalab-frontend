'use client';

import ApplyCard, { ApplyCardProps } from '@/components/common/molecules/ApplyCard';

type Props = Omit<ApplyCardProps, 'scrapClicked' | 'registerClicked'>;

export default function ProjectDetailCardClient(props: Props) {
  const handleScrap = () => {
    console.log('scrap clicked');
  };

  const handleRegister = () => {
    console.log('register clicked');
  };

  return <ApplyCard {...props} scrapClicked={handleScrap} registerClicked={handleRegister} />;
}
