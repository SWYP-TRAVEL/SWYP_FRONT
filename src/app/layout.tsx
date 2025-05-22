import type { Metadata } from 'next';
import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider';
import "./globals.css";
import LayoutSelector from '@/components/layout/LayoutSelector';
import { ModalProvider } from '@/providers/ModalProvider';
import ToastContainer from '@/components/ToastContainer';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  title: 'Momentier',
  description: '순간(Moment) + Engineer 감정 기반 여행 큐레이팅',
  icons: {
    icon: "/icons/Logo.webp",
    apple: "/icons/Logo.webp",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
