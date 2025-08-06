'use client';

import Button from '@/components/common/atoms/Button';

interface Props {
  onClick?: () => void;
}

export default function StepNextButton({ onClick }: Props) {
  return (
    <Button
      State="Primary"
      Size="xl"
      label="다음으로"
      onClick={onClick ?? (() => {})} 
    />
  );
}
