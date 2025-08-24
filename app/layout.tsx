import { Suspense } from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import ReactQueryProvider from './ReactQueryProvider';
import HeaderClientWrapper from '@/components/common/organisms/HeaderClientWrapper';
import ProgressProviderWrapper from './ProgressProviderWrapper';

export const metadata: Metadata = {
  title: 'Betalab',
  description: '세상을 먼저 경험할 기회',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased bg-White">
        <ProgressProviderWrapper>
          <Suspense>
            <div className="w-full bg-gradient-to-b from-white">
              <div className="min-w-[1280px] mx-auto">
                <ReactQueryProvider>
                  <HeaderClientWrapper />
                  <main>{children}</main>
                </ReactQueryProvider>
              </div>
            </div>
          </Suspense>
        </ProgressProviderWrapper>
      </body>
    </html>
  );
}
