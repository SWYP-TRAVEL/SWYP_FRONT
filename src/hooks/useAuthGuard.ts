'use client' 

import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { authState } from '@/recoil/authState'

export function useAuthGuard() {
  const { isLoggedIn } = useRecoilValue(authState)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn])
}
