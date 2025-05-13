'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { reissueToken } from '@/lib/api/auth';

export function useAuthGuard(publicPaths: string[] = []) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const pathname = usePathname();
  const router = useRouter();

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  const isTokenExpired = () => {
    const { user } = useAuthStore.getState();
    if (!user?.expiresIn) return true;
    return Date.now() > user.expiresIn;
  };

  useEffect(() => {
    if (!hasHydrated) return;
    if (isPublic) return;

    const checkAndRefreshToken = async () => {
      if (!isLoggedIn) {
        router.replace('/main');
        return;
      }

      if (isTokenExpired()) {
        if (isRefreshing) return; // 이미 갱신 중이면 중단
        setIsRefreshing(true);

        console.warn('🔄 토큰이 만료되었습니다. 재발급 시도 중...');
        const result = await reissueToken();

        if (!result) {
          console.error('🔒 재발급 실패, 로그인 페이지로 이동합니다.');
          useAuthStore.getState().logout();
          router.replace('/main');
        }
        setIsRefreshing(false);
      }
    };

    checkAndRefreshToken();
  }, [hasHydrated, isLoggedIn, isPublic, router, isRefreshing]);
}
