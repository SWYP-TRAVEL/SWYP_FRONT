'use client';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/store/useAuthStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  return (
    <>
      {/* TODO: push || replace 검토 */}
      <Header
        user={user}
        onClickLogo={() => router.push('/')}
        onClickProfile={() => router.push('/mypage')}
      />
      <main>{children}</main>
    </>

  )
}