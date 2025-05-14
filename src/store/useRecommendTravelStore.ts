import type { ItineraryDetail, RecommendResponse } from "@/lib/api/itinerary";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecommendTravelListStore {
  items: RecommendResponse[];
  setItems: (items: RecommendResponse[]) => void;
  clearItems: () => void;
}

interface UserInput {
  travelWith: string;
  description: string;
  duration: number;
  startDate: string;
  requestCount: number;
}

interface UserInputStore {
  inputs: UserInput | null;
  setInputs: (inputs: UserInput) => void;
  clearInputs: () => void;
}

interface RecommendTravelDetailStore {
  itinerary: ItineraryDetail | null;
  setItinerary: (value: ItineraryDetail) => void;
  clearItinerary: () => void;
}

export const useUserInputStore = create<UserInputStore>()(
  persist(
    (set) => ({
      inputs: null,
      setInputs: (inputs) => set({ inputs }),
      clearInputs: () => set({ inputs: null }),
    }),
    {
      name: "user-input",
    }
  )
)

export const useRecommendTravelListStore = create<RecommendTravelListStore>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => set({ items }),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: "recommend-list",
    }
  )
);

export const useRecommendTravelDetailStore = create<RecommendTravelDetailStore>()(
  persist(
    (set) => ({
      itinerary: null,
      setItinerary: (itinerary) => set({ itinerary }),
      clearItinerary: () => set({ itinerary: null })
    })
    , {
      name: "recommend-detail"
    }
  )
)