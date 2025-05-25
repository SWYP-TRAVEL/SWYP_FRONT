import axiosInstance from "./axiosInstance";

export interface Attraction {
    id: number;
    type: 'place' | 'meal' | 'ACTIVITY';
    name: string;
    address: string;
    description: string;
    coverImage: string;
    businessTime: string;
    rating: number;
    latitude: number;
    longitude: number;
    travelWalkTime?: string;
    travelCarTime?: string;
    travelDistance?: string;
    previousData?: Attraction;
}

export interface DailyScheduleDtos {
    dayDate: number;
    attractions: Attraction[];
}

export interface ItineraryDetail {
    id: number;
    title: string;
    createdBy: number;
    createdAt: number;
    isPublic: boolean;
    isSaved: boolean;
    dailyScheduleDtos: DailyScheduleDtos[];
}

interface GetRecommendTextParams {
    feeling: string;
    atmosphere: string;
    activities: string;
}

/**
 * 여행 일정 상세 조회
 * @param id 여행 일정 ID
 * @returns ItineraryDetail[]
 */
export const getItineraryDetails = async (id: number): Promise<ItineraryDetail[]> => {
    try {
        const response = await axiosInstance.get<ItineraryDetail[]>(`/itinerary/lists/${id}`);
        const mergedItineraries = response.data.map((itinerary: ItineraryDetail) =>
            mergeItineraryByDate(itinerary)
        );

        return mergedItineraries;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정 상세 정보를 불러오지 못했습니다.");
    }
};


export interface RecommendRequest {
    feeling: string;
    atmosphere: string;
    activities: string;
}

export interface RecommendResponse {
    address: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    name: string;
    theme: string;
}

/**
 * 사용자 입력 바탕으로 추천 장소 3개 조회
 * @param data 사용자 입력 정보
 * @returns RecommendResponse[]
 */
export const getRecommendedDestinations = async (
    data: RecommendRequest
): Promise<RecommendResponse[]> => {
    try {
        const response = await axiosInstance.get<RecommendResponse[]>("/itinerary/preview", {
            params: data
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "추천 장소를 불러오지 못했습니다.");
    }
};

export interface CreateItineraryRequest {
    travelWith: string;
    startDate: string;
    duration: number;
    theme: string;
    latitude: number;
    longitude: number;
    wantedDto: {
        feeling: string;
        atmosphere: string;
        activities: string;
    }
}

/**
 * 사용자 입력 바탕으로 여행 일정 생성
 * @param data 사용자 입력 정보
 * @returns 생성된 여행 일정 정보
 */
export const createItinerary = async (
    data: CreateItineraryRequest
): Promise<ItineraryDetail> => {
    try {
        const response = await axiosInstance.post<ItineraryDetail>(
            "/itinerary/create",
            data,
            { loadingType: 'skeleton' }
        );
        return mergeItineraryByDate(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정을 생성하지 못했습니다.");
    }
};

export interface PublicItinerary {
    id: number;
    title: string;
    image_url: string;
}

/**
 * 공개된 여행 코스 일부 조회
 * @param limit 최대 반환 개수
 * @returns PublicItinerary[]
 */
export const getPublicItineraries = async (
    limit: number
): Promise<PublicItinerary[]> => {
    try {
        const response = await axiosInstance.get<PublicItinerary[]>(`/itinerary/public?limit=${limit}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "공개된 여행 코스 목록을 불러오지 못했습니다.");
    }
};

export interface SaveItineraryResponse {
    itineraryId: number;
}

/**
 * 생성된 여행 코스를 저장
 * @param data 여행 코스 ID
 * @returns 저장 결과
 */
export const saveItinerary = async (
    data: ItineraryDetail
): Promise<SaveItineraryResponse> => {
    try {
        // attractions가 객체라면 배열로 감싸기
        const normalizedData = {
            ...data,
            dailyScheduleDtos: data.dailyScheduleDtos.map(dto => ({
                ...dto,
                attractions: Array.isArray(dto.attractions) ? dto.attractions : [dto.attractions]
            }))
        };

        const response = await axiosInstance.patch<SaveItineraryResponse>("/itinerary", normalizedData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 코스 저장에 실패했습니다.");
    }
};

export const getRecommendText = async (params: GetRecommendTextParams) => {
    try {
        const response = await axiosInstance.get<GetRecommendTextParams>('/itinerary/recommend/text', {
            params: {
                feeling: params.feeling,
                atmosphere: params.atmosphere,
                activities: params.activities,
            },
            loadingType: 'none'
        });
        return response.data;
    } catch (err: any) {
        throw new Error(err.response?.data.message || "여행테마 추천 검색어 불러오기에 실패했습니다.");
    }
}

export const changeAttraction = async (
    data: Attraction
): Promise<Attraction> => {
    try {
        const response = await axiosInstance.post<Attraction>(
            "/itinerary/change/attraction",
            data,
            { loadingType: 'none' }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "관광지 정보를 변경하지 못했습니다.");
    }
};

export const getItineraryDetail = async (id: number): Promise<ItineraryDetail> => {
    try {
        const response = await axiosInstance.get<ItineraryDetail>(`/itinerary/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정을 불러오지 못했습니다.");
    }
};


// DailyScheduleDtos가 같은 date임에도 각각 오는 이슈가 있음 (묶어주는 함수)
const mergeItineraryByDate = (itinerary: ItineraryDetail): ItineraryDetail => {
    // Map을 사용하여 dayDate 기준으로 그룹화
    const itineraryMap = new Map<number, Attraction[]>();

    itinerary.dailyScheduleDtos.forEach((item) => {
        const { dayDate, attractions } = item;

        if (!itineraryMap.has(dayDate)) {
            itineraryMap.set(dayDate, []);
        }

        if (Array.isArray(attractions)) {
            itineraryMap.get(dayDate)?.push(...attractions);
        } else {
            itineraryMap.get(dayDate)?.push(attractions);
        }
    });

    // Map을 DailyScheduleDtos 형태의 배열로 변환
    const mergedItinerary: DailyScheduleDtos[] = Array.from(itineraryMap.entries()).map(
        ([dayDate, attractions]) => ({
            dayDate,
            attractions,
        })
    );

    // 원본 ItineraryDetail을 수정하지 않고 새로운 객체 생성
    return {
        ...itinerary,
        dailyScheduleDtos: mergedItinerary
    };
};

export const deleteItinerary = async (id: number): Promise<boolean> => {
    try {
        const response = await axiosInstance.delete<boolean>(`/itinerary/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정 삭제에 실패했습니다.");
    }
}
