'use client';

import { ReactNode } from 'react';
import { ProgressProvider } from '@bprogress/next/app';

const ProgressProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider height="4px" color="#0e62ff" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
};

export default ProgressProviderWrapper;
