'use client'

import { useLogin } from '@/hooks/useLogin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const loginMutation = useLogin()

  const handleLogin = () => {
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => router.push('/protected'),
        onError: () => alert('로그인 실패'),
      }
    )
  }
  

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">로그인</h1>
      <input className="border p-2 mb-2 w-full" placeholder="아이디" onChange={(e) => setUsername(e.target.value)} />
      <input className="border p-2 mb-2 w-full" type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </button>
    </div>
  )
}
