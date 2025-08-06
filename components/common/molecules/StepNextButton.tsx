'use client';

import Button from '@/components/common/Button';

export default function StepNextButton() {
  return (
    <Button
      State="Primary"
      Size="xl"
      label="다음으로"
      onClick={() => {
        console.log('다음 단계로 이동');
      }}
    />
  );
}
