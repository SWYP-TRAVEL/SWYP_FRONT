import { atom } from 'recoil'

export const authState = atom<{
  isLoggedIn: boolean
  user: { username: string } | null
}>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
  },
})
