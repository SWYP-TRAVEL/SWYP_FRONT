import { create } from "zustand";

type LoadingType = 'none' | 'fullscreen' | 'inline';

interface LoadingStore {
  isLoading: boolean;
  loadingType: LoadingType;
  setLoading: (isLoading: boolean, type?: LoadingType) => void;
}


export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  loadingType: 'none',
  setLoading: (isLoading, type = 'fullscreen') => set({ isLoading, loadingType: isLoading ? type : 'none' }),
}));
