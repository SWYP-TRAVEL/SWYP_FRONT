import { jwtDecode } from 'jwt-decode'

export function getDecodedToken<T>(): T | null {
  if (typeof window === 'undefined') return null

  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1]

  if (!token) return null

  try {
    return jwtDecode<T>(decodeURIComponent(token))
  } catch {
    return null
  }
}
