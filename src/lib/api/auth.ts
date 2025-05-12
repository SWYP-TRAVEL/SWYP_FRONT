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
