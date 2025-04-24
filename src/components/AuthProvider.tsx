'use client'

import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from '@/recoil/authState'
import { getDecodedToken } from '@/utils/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useSetRecoilState(authState)

  useEffect(() => {
    const user = getDecodedToken<{ username: string }>()
    setAuth({
      isLoggedIn: !!user,
      user,
    })
  }, [])

  return <>{children}</>
}
