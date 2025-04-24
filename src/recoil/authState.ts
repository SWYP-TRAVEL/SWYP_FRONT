import { atom,selector } from 'recoil'

export const authState = atom({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: {
      username: ''
    },
  },
})

export const getUser = selector({
  key: 'getUser',
  get: ({get}) => {
    const auth = get(authState);

    return auth.user;
  }
})