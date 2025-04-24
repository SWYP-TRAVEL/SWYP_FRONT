'use client' 

import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/auth/login'
import { useSetRecoilState } from 'recoil'
import { authState } from '@/recoil/authState'
import { getDecodedToken } from '@/utils/auth'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const setAuth = useSetRecoilState(authState)
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // ✅ 로그인 성공 후 쿠키에 있는 토큰 디코딩
      const decoded = getDecodedToken<{ username: string }>()

      if (decoded) {
        setAuth({
          isLoggedIn: true,
          user: { username: decoded.username },
        })
      } else {
        alert('토큰 디코딩 실패')
      }
    },
    onError: () => {
      alert('로그인 실패')
    }
  })
}
