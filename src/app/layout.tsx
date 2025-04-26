import type { Metadata } from 'next';
import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider';

export const metadata: Metadata = {
  title: 'Momentier',
  description: '순간(Moment) + Engineer 감정 기반 여행 큐레이팅',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
