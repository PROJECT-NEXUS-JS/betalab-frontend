import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import ReactQueryProvider from './ReactQueryProvider';

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
    <html lang="ko">
      <body className="antialiased bg-White">
        <div className="max-w-[1280px] mx-auto">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
