import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { login } from '@/api/auth/login'
import { useAuthStore } from '@/store/useAuthStore'

export function useLogin() {
  const loginState = useAuthStore((state) => state.login)
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      // 로그인 성공 후 /api/me에서 사용자 정보 가져오기
      const res = await fetch('/api/me')
      const data = await res.json()

      if (data.user) {
        loginState(data.user) // Zustand의 login() 호출
        router.push('/')
      } else {
        alert('토큰 디코딩 실패')
      }
    },
    onError: () => {
      alert('로그인 실패')
    }
  })
}
