'use client';

import Header from '@/components/Header';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthGuard } from '@/hooks/useAuthGuard';

const PUBLIC_PATHS = ['/main', '/oauth/callback/kakao'];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  useAuthGuard(PUBLIC_PATHS);
  if (!hasHydrated || (!isPublic && !isLoggedIn)) {
    return (
      <div />
    );
  }

  return (
    <>
      {/* TODO: push || replace 검토 */}
      <Header
        user={user}
        onClickLogo={() => router.push('/')}
        onClickProfile={() => router.push('/mypage')}
      />
      <main className='max-w-[100vw] overflow-hidden'>{children}</main>
    </>
  );
}
