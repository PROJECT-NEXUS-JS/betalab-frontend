import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Betalab Admin',
  description: 'Admin layout for managing the application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-10 flex gap-10 w-full justify-center">
      <aside></aside>
      {children}
    </div>
  );
}
