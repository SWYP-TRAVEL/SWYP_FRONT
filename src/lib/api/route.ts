import axiosInstance from "./axiosInstance";

export interface RouteTimeRequest {
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
}

export interface RouteTimeResponse {
    walkingDuration: number;
    drivingDuration: number;
}

/**
 * 두 지점 간 소요 시간 조회
 * @param data 출발지와 목적지의 위도, 경도 정보
 * @returns 도보 시간 및 운전 시간 정보
 */
export const getRouteTime = async (
    data: RouteTimeRequest
): Promise<RouteTimeResponse> => {
    try {
        const response = await axiosInstance.get<RouteTimeResponse>("/route/time", {
            params: {
                startLatitude: data.startLatitude,
                startLongitude: data.startLongitude,
                endLatitude: data.endLatitude,
                endLongitude: data.endLongitude
            },
            loadingType: 'none'
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.message || "소요 시간 정보를 불러오지 못했습니다.");
    }
};
