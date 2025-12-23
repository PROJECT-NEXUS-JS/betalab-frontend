import { Suspense } from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import ReactQueryProvider from './ReactQueryProvider';
import HeaderClientWrapper from '@/components/common/organisms/HeaderClientWrapper';
import ProgressProviderWrapper from './ProgressProviderWrapper';
import { ToastHost } from '@/components/common/toast/ToastHost';

export const metadata: Metadata = {
  title: 'Betalab',
  description: '세상을 먼저 경험할 기회',
  openGraph: {
    title: 'Betalab',
    description: '세상을 먼저 경험할 기회',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Betalab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Betalab',
    description: '세상을 먼저 경험할 기회',
    images: ['/thumbnail.png'],
  },
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
        <ToastHost position="bottom-center" />
      </body>
    </html>
  );
}
