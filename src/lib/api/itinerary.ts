import axiosInstance from "./axiosInstance";

export interface ItineraryDetail {
    id: number;
    type: string;
    name: string;
    address: string;
    description: string;
    coverImage: string;
    businessTime: string;
    rating: number;
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
    travel_with: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface RecommendResponse {
    title: string;
    description: string;
    image_url: string;
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
        const response = await axiosInstance.post<RecommendResponse[]>("/itinerary/destination/recommend", data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "추천 장소를 불러오지 못했습니다.");
    }
};


export interface CreateItineraryRequest {
    travel_with: string;
    start_date: string;
    end_date: string;
    description: string;
    selected_destination: string;
}

export interface CreateItineraryResponse {
    id: number;
    travel_with: string;
    start_date: string;
    end_date: string;
    description: string;
    selected_destination: string;
    createdAt: string;
}

/**
 * 사용자 입력 바탕으로 여행 일정 생성
 * @param data 사용자 입력 정보
 * @returns 생성된 여행 일정 정보
 */
export const createItinerary = async (
    data: CreateItineraryRequest
): Promise<CreateItineraryResponse> => {
    try {
        const response = await axiosInstance.post<CreateItineraryResponse>("/itinerary/create", data);
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
