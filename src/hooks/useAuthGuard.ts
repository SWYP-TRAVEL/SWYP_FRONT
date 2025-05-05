'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function useAuthGuard(publicPaths: string[] = []) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const pathname = usePathname();
  const router = useRouter();

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!hasHydrated) return;
    if (isPublic) return;
    if (!isLoggedIn) {
      router.replace('/main');
    }
  }, [hasHydrated, isLoggedIn, isPublic, router]);
}
