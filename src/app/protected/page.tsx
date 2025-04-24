'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useRecoilValue } from 'recoil'
import { authState } from '@/recoil/authState'

export default function ProtectedPage() {
  useAuthGuard()
  const { user } = useRecoilValue(authState)

  if (!user) return <p className="p-4">인증 확인 중...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎉 대시보드</h1>
      <p>안녕하세요 <strong>{user.username}</strong>님, 환영합니다!</p>
    </div>
  )
}
