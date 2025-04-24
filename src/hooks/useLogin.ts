import { useMutation } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import { authState } from '@/recoil/authState'
import { useRouter } from 'next/navigation'
import { login } from '@/api/auth/login'

export function useLogin() {
  const setAuth = useSetRecoilState(authState)
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      // 로그인 성공 후 /api/me에서 사용자 정보 가져오기
      const res = await fetch('/api/me')
      const data = await res.json()

      if (data.user) {
        setAuth({
          isLoggedIn: true,
          user: data.user,
        })
        router.push('/') // 예: 홈으로 이동
      } else {
        alert('토큰 디코딩 실패')
      }
    },
    onError: () => {
      alert('로그인 실패')
    }
  })
}
