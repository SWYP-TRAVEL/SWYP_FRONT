import { Attraction, DailyScheduleDtos, ItineraryDetail, type RecommendResponse } from "@/lib/api/itinerary";
import { getRouteTime } from "@/lib/api/route";

import { create } from "zustand";
import { persist } from "zustand/middleware";



interface UserInput {
  // 사용자 정보 입력 화면에서 넘기는 값
  travelWith: string;
  duration: number;
  startDate: string;
  requestCount: number;
  // 추천 리스트 화면에서 넘기는 값
  theme: string;
  latitude: number;
  longitude: number;
  wantedDto: {
    feeling: string;
    atmosphere: string;
    activities: string;
  }
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
          const { walkingDuration, drivingDuration, distance } = await getRouteTime({
            startLatitude: currentPlace.latitude,
            startLongitude: currentPlace.longitude,
            endLatitude: nextPlace.latitude,
            endLongitude: nextPlace.longitude,
          });

          if (walkingDuration) updatedPlace.travelWalkTime = `${walkingDuration}분`;
          if (drivingDuration) updatedPlace.travelCarTime = `${drivingDuration}분`;
          updatedPlace.travelDistance = `${distance ? distance + "m" : '거리 정보 추후 업데이트'}`;
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
          const schedulesWithUUID = assignUUIDToSchedules(itinerary.dailyScheduleDtos);
          const updatedSchedules = await updateDailySchedules(schedulesWithUUID);
          set({ itinerary: { ...itinerary, dailyScheduleDtos: updatedSchedules } });
        } else {
          set({ itinerary });
        }
      },

      /**
       * DailyScheduleDtos 업데이트 (순서만 바꿔줌, 굳이 이렇게 하지말고 idx를 넣어서.. 정렬했어야될듯)
       */
      updateItinerary: async (updatedItinerary) => {
        const itinerary = get().itinerary;

        if (itinerary) {
          //const schedulesWithUUID = assignUUIDToSchedules(updatedItinerary); 그래서 굳이 uuid를 업데이트 할 필요는 없을듯.  
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
                (attraction) => attraction.id === oldAttraction.id
              );

              if (!isTargetSchedule) return schedule;

              const updatedAttractions = await calculateScheduleTimes(
                schedule.attractions.map((attraction) =>
                  attraction.id === oldAttraction.id
                    ? {
                      ...newAttraction,
                      id: oldAttraction.id,
                      previousData: JSON.parse(JSON.stringify(attraction)),
                    }
                    : attraction
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


interface PublicTravelDetailStore {
  itinerary: ItineraryDetail | null;
  setItinerary: (value: ItineraryDetail) => void;
  clearItinerary: () => void;
}


export const usePublicTravelDetailStore = create<PublicTravelDetailStore>()(
  persist(
    (set) => ({
      itinerary: null,
      setItinerary: async (value) => {
        if (value?.dailyScheduleDtos) {
          const schedulesWithUUID = assignUUIDToSchedules(value.dailyScheduleDtos);
          const updatedSchedules = await updateDailySchedules(schedulesWithUUID);
          set({ itinerary: { ...value, dailyScheduleDtos: updatedSchedules } });
        } else {
          set({ itinerary: value });
        }
      },
      clearItinerary: () => set({ itinerary: null }),
    }),
    {
      name: "public-travel-detail",
    }
  )
);

const assignUUIDToAttraction = (attraction: Attraction): Attraction => {
  const generateNumericId = (): number => Date.now() + Math.floor(Math.random() * 10000);

  return {
    ...attraction,
    id: attraction.id && typeof attraction.id === 'number' ? attraction.id : generateNumericId(), // 괄호 추가!
    previousData: attraction.previousData ? assignUUIDToAttraction(attraction.previousData) : undefined
  };
};


const assignUUIDToAttractions = (attractions: Attraction[]): Attraction[] => {
  return attractions.map(assignUUIDToAttraction);
};

const assignUUIDToSchedules = (schedules: DailyScheduleDtos[]): DailyScheduleDtos[] => {
  return schedules.map(schedule => ({
    ...schedule,
    attractions: assignUUIDToAttractions(schedule.attractions)
  }));
};