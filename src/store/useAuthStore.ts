import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  userName: string;
  accessToken: string;
  expiresIn?: number;
  profileImage?: string;
  hasSubmittedExperience?: boolean;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      login: (user) =>
        set({
          isLoggedIn: true,
          user,
        }),
      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
        })
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
