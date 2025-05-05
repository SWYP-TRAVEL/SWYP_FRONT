'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function useAuthGuard() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return; // 아직 상태 복원 전이면 아무것도 하지 않음
    if (!isLoggedIn) {
      router.push('/main');
    }
  }, [hasHydrated, isLoggedIn, router]);
}
