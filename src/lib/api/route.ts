import axiosInstance from "./axiosInstance";

export interface RouteTimeRequest {
    from: string;
    to: string;
}

export interface RouteTimeResponse {
    time: string;
}

/**
 * 두 지점 간 소요 시간 조회
 * @param data 출발지와 목적지 정보
 * @returns 소요 시간 정보
 */
export const getRouteTime = async (
    data: RouteTimeRequest
): Promise<RouteTimeResponse> => {
    try {
        const response = await axiosInstance.post<RouteTimeResponse>("/route/time", data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "소요 시간 정보를 불러오지 못했습니다.");
    }
};
