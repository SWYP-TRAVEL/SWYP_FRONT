import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  userName: string;
  accessToken: string;
  expiresIn?: number;
  profileImage?: string;
  hasSubmittedExperience?: boolean;
}

interface tokenState {
  accessToken: string;
  expiresIn: number;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  login: (user: User) => void;
  refresh: (token: tokenState) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      login: (user) => {
        set({
          isLoggedIn: true,
          user,
        });
      },
      refresh: (token) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            accessToken: token.accessToken,
            expiresIn: token.expiresIn,
          };
          set({
            isLoggedIn: true,
            user: updatedUser,
          });
        } else {
          console.warn("User not found. Cannot refresh token.");
        }
      },
      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
        });
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
