'use client';

import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function useLogin() {
  const loginState = useAuthStore((state) => state.login);
  const router = useRouter();
  const popupRef = useRef<Window | null>(null);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${window.location.origin}/SWYP_FRONT/api/me`);
      const data = await res.json();

      if (!data.user) throw new Error('유저 정보 없음');
      return data.user;
    },
    onSuccess: (user) => {
      loginState(user);
      router.push('/userinputs');
    },
    onError: () => {
      alert('로그인 실패');
    },
  });

  const openPopupAndHandleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code`;

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    popupRef.current = window.open(
      url,
      'kakaoLogin',
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes`
    );

    const handleMessage = (event: MessageEvent) => {
      const { type, payload, error } = event.data || {};
      if (type === 'KAKAO_LOGIN_SUCCESS') {
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
        loginMutation.mutate(); // 사용자 정보 fetch & store
        window.removeEventListener('message', handleMessage);
        popupRef.current?.close();
      } else if (type === 'KAKAO_LOGIN_FAILURE') {
        alert('로그인 실패: ' + error);
        window.removeEventListener('message', handleMessage);
        popupRef.current?.close();
      }
    };

    window.addEventListener('message', handleMessage);
  };

  return { openPopupAndHandleLogin };
}
