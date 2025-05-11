import type { Metadata } from 'next';
import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider';
import "./globals.css";
import LayoutSelector from '@/components/layout/LayoutSelector';
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
            <LayoutSelector>
              {children}
            </LayoutSelector>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
