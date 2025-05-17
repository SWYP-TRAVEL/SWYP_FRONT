import axiosInstance from "./axiosInstance";

export interface ExperienceRequest {
    rating: number;
    feedback: string;
}

export interface ExperienceResponse {
    success: boolean;
    feedback: string;
    rating: number;
    createdAt: string;
}

/**
 * 사용자 경험 등록
 * @param content 사용자 작성한 경험 내용
 * @returns ExperienceResponse
 */
export const saveUserExperience = async (content: ExperienceRequest): Promise<ExperienceResponse> => {
    try {
        const response = await axiosInstance.post<ExperienceResponse>("/user/experience", {
            content,
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "경험 등록에 실패했습니다.");
    }
};


export interface Itinerary {
    id: number;
    title: string;
    image_url: string[];
}

/**
 * 마이페이지 - 사용자 여행 일정 조회
 * @returns Itinerary[]
 */
export const getUserItineraries = async (): Promise<Itinerary[]> => {
    try {
        const response = await axiosInstance.get<Itinerary[]>("/user/mypage/itineraries");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정 목록을 불러오지 못했습니다.");
    }
};


/**
 * 마이페이지 - 사용자 여행 일정 조회
 * @param userId 사용자 ID
 * @returns Itinerary[]
 */

export interface UserDetail {
    id: number,
    username: string
}

export const getUserItinerariesById = async (userId: number): Promise<UserDetail> => {
    try {
        const response = await axiosInstance.get<UserDetail>(`/user/${userId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 일정 목록을 불러오지 못했습니다.");
    }
};
