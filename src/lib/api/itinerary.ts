import axiosInstance from "./axiosInstance";

interface Attraction {
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
}

interface DailyScheduleDtos {
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

/**
 * 여행 일정 상세 조회
 * @param id 여행 일정 ID
 * @returns ItineraryDetail[]
 */
export const getItineraryDetails = async (id: number): Promise<ItineraryDetail[]> => {
    try {
        const response = await axiosInstance.get<ItineraryDetail[]>(`/itinerary/lists/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정 상세 정보를 불러오지 못했습니다.");
    }
};


export interface RecommendRequest {
    travelWith: string;
    startDate: string;
    duration: number;
    description: string;
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
    description: string;
    theme: string;
    latitude: number;
    longitude: number;
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
        const response = await axiosInstance.get<ItineraryDetail>("/itinerary/create", {
            params: data
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정을 생성하지 못했습니다.");
    }
};


export interface PublicItinerary {
    id: number;
    title: string;
    image_url: string[];
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


export interface SaveItineraryRequest {
    itineraries_id: number;
}

export interface SaveItineraryResponse {
    success: boolean;
    message: string;
}

/**
 * 생성된 여행 코스를 저장
 * @param data 여행 코스 ID
 * @returns 저장 결과
 */
export const saveItinerary = async (
    data: SaveItineraryRequest
): Promise<SaveItineraryResponse> => {
    try {
        const response = await axiosInstance.post<SaveItineraryResponse>("/itinerary/save", data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 코스 저장에 실패했습니다.");
    }
};

export const getRecommendText = async (params: string) => {

}