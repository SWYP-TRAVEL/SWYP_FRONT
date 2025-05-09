import type { Metadata } from 'next';
import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider';
import "./globals.css";
import AppLayout from '@/components/AppLayout';
import { ModalProvider } from '@/providers/ModalProvider';

export const metadata: Metadata = {
  title: 'Momentier',
  description: '순간(Moment) + Engineer 감정 기반 여행 큐레이팅',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <ModalProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
