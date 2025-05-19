import axiosInstance from "./axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export interface KakaoLoginResponse {
    accessToken: string;
    userName: string;
    expiresIn: number;
    hasSubmittedExperience: boolean;
}

/**
 * 🍪 **쿠키에서 특정 쿠키 값을 가져오는 함수**
 */
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
};

/**
 * ✅ **카카오 로그인 API 요청**
 * @param code 인가 코드
 * @returns KakaoLoginResponse
 */
export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
    try {
        const response = await axiosInstance.post<KakaoLoginResponse>(
            "/auth/kakao",
            {
                code,
            },
            { loadingType: 'login' }
        );
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
 * ✅ **카카오 계정 탈퇴 요청**
 * @returns UnlinkResponse
 */
export const unlinkKakaoAccount = async (): Promise<UnlinkResponse> => {
    try {
        const response = await axiosInstance.post<UnlinkResponse>("/auth/unlink");
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
 * ✅ **공개된 여행 코스 일부를 반환**
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
 * ✅ **관리자 토큰 정보 반환**
 * @returns AdminTokenResponse
 */
export const getAdminToken = async (): Promise<KakaoLoginResponse> => {
    try {
        const response = await axiosInstance.get<KakaoLoginResponse>("/auth/admin", {
            loadingType: 'login'
        });
        console.log(response)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "관리자 토큰 정보를 불러오지 못했습니다.");
    }
};

/**
 * ✅ **Refresh Token으로 Access Token 재발급**
 * @returns KakaoLoginResponse
 */
export const reissueToken = async (): Promise<KakaoLoginResponse | null> => {
    try {
        const response = await axiosInstance.post<KakaoLoginResponse>("/auth/token/reissue",);

        if (response.status === 200) {
            const { accessToken, userName, expiresIn, hasSubmittedExperience } = response.data;

            useAuthStore.getState().refresh({
                accessToken,
                expiresIn,
            });

            console.log("🔄 토큰 재발급 성공");
            return response.data;
        } else {
            console.error("❌ 토큰 재발급 실패");
            useAuthStore.getState().logout();
            return null;
        }
    } catch (error: any) {
        console.error("토큰 재발급 중 오류 발생:", error);
        useAuthStore.getState().logout();
        return null;
    }
};
