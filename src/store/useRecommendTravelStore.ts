import { Attraction, DailyScheduleDtos, ItineraryDetail, type RecommendResponse } from "@/lib/api/itinerary";
import { getRouteTime } from "@/lib/api/route";

import { create } from "zustand";
import { persist } from "zustand/middleware";



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

interface RecommendTravelListStore {
  items: RecommendResponse[];
  setItems: (items: RecommendResponse[]) => void;
  clearItems: () => void;
}
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

interface RecommendTravelDetailStore {
  itinerary: ItineraryDetail | null;
  setItinerary: (value: ItineraryDetail) => void;
  updateItinerary: (updatedItinerary: DailyScheduleDtos[]) => void;
  updateAttraction: (oldAttraction: Attraction, newAttraction: Attraction) => void;
  clearItinerary: () => void;
}



//거리 및 시간 계산 로직
const calculateScheduleTimes = async (places: Attraction[]): Promise<Attraction[]> => {
  if (!places) return [];

  return await Promise.all(
    places.map(async (currentPlace, index) => {
      const nextPlace = places[index + 1];
      if (!nextPlace) return currentPlace;

      const updatedPlace: Attraction = {
        ...currentPlace,
        travelWalkTime: '정보 없음',
        travelCarTime: '정보 없음',
        travelDistance: '정보 없음',
      };

      if (
        currentPlace.latitude &&
        currentPlace.longitude &&
        nextPlace.latitude &&
        nextPlace.longitude
      ) {
        try {
          const { walkingDuration, drivingDuration } = await getRouteTime({
            startLatitude: currentPlace.latitude,
            startLongitude: currentPlace.longitude,
            endLatitude: nextPlace.latitude,
            endLongitude: nextPlace.longitude,
          });

          if (walkingDuration) updatedPlace.travelWalkTime = `${walkingDuration}분`;
          if (drivingDuration) updatedPlace.travelCarTime = `${drivingDuration}분`;
          updatedPlace.travelDistance = '거리 정보 추후 업데이트';
        } catch (error) {
          console.error("경로 계산 실패:", error);
        }
      }

      return updatedPlace;
    })
  );
};


//일정 정보 업데이트 로직 
const updateDailySchedules = async (schedules: DailyScheduleDtos[]) => {
  return await Promise.all(
    schedules.map(async (schedule) => {
      const updatedAttractions = await calculateScheduleTimes(schedule.attractions);
      return {
        ...schedule,
        attractions: updatedAttractions,
      };
    })
  );
};

export const useRecommendTravelDetailStore = create<RecommendTravelDetailStore>()(
  persist(
    (set, get) => ({
      itinerary: null,

      /**
       * 전체 Itinerary 설정
       */
      setItinerary: async (itinerary) => {
        if (itinerary?.dailyScheduleDtos) {
          const updatedSchedules = await updateDailySchedules(itinerary.dailyScheduleDtos);
          set({ itinerary: { ...itinerary, dailyScheduleDtos: updatedSchedules } });
        } else {
          set({ itinerary });
        }
      },

      /**
       * DailyScheduleDtos 업데이트
       */
      updateItinerary: async (updatedItinerary) => {
        const itinerary = get().itinerary;

        if (itinerary) {
          const updatedSchedules = await updateDailySchedules(updatedItinerary);
          set({
            itinerary: {
              ...itinerary,
              dailyScheduleDtos: updatedSchedules,
            },
          });
        }
      },

      /**
       * Attraction 업데이트
       */
      updateAttraction: async (oldAttraction, newAttraction) => {
        const itinerary = get().itinerary;

        if (itinerary) {
          const updatedSchedules = await Promise.all(
            itinerary.dailyScheduleDtos.map(async (schedule) => {
              const isTargetSchedule = schedule.attractions.some(
                (attraction) => attraction.name === oldAttraction.name
              );

              if (!isTargetSchedule) return schedule;

              const updatedAttractions = await calculateScheduleTimes(
                schedule.attractions.map((attraction) =>
                  attraction.name === oldAttraction.name ? newAttraction : attraction
                )
              );

              return {
                ...schedule,
                attractions: updatedAttractions,
              };
            })
          );

          set({
            itinerary: {
              ...itinerary,
              dailyScheduleDtos: updatedSchedules,
            },
          });
        }
      },

      /**
       * 초기화
       */
      clearItinerary: () => set({ itinerary: null }),
    }),
    {
      name: "recommend-detail",
    }
  )
);
