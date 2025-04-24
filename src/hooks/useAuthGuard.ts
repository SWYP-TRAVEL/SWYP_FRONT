'use client'; // 👈 이거 반드시 필요!

import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/authState';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthGuard() {
  const { isLoggedIn } = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
}
