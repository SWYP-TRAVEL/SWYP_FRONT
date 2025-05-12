import axiosInstance from "./axiosInstance";

export interface KakaoLoginResponse {
    accessToken: string;
    refreshToken: string;
    userName: string;
}

/**
 * 카카오 로그인 API 요청
 * @param code 인가 코드
 * @returns KakaoLoginResponse
 */

export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
    try {
        const response = await axiosInstance.post<KakaoLoginResponse>("/auth/kakao", {
            code,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "카카오 로그인 실패");
    }
};



export interface UnlinkResponse {
    success: boolean;
    message: string;
}

/**
 * 카카오 계정 탈퇴 요청
 * @returns 탈퇴 결과
 */
export const unlinkKakaoAccount = async (): Promise<UnlinkResponse> => {
    try {
        const response = await axiosInstance.delete<UnlinkResponse>("/auth/unlink");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "카카오 계정 탈퇴에 실패했습니다.");
    }
};

export interface Itinerary {
    id: number;
    title: string;
    image_url: string[];
}

/**
 * 공개된 여행 코스 일부를 반환
 * @param limit 가져올 항목 수
 * @returns Itinerary 리스트
 */
export const fetchItineraries = async (limit: number): Promise<Itinerary[]> => {
    try {
        const response = await axiosInstance.get<Itinerary[]>(`/api/itineraries/list?limit=${limit}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "여행 코스 불러오기에 실패했습니다.");
    }
};

/**
 * 관리자 토큰 정보 반환
 * @returns AdminTokenResponse
 */
export const getAdminToken = async (): Promise<KakaoLoginResponse> => {
    try {
        const response = await axiosInstance.get<KakaoLoginResponse>("/auth/admin");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "관리자 토큰 정보를 불러오지 못했습니다.");
    }
};
