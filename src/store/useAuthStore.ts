import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  login: (userName: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName: null,
      accessToken: null,
      refreshToken: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      login: (userName, accessToken, refreshToken) =>
        set({
          isLoggedIn: true,
          userName,
          accessToken,
          refreshToken,
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          userName: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage의 key 값
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
