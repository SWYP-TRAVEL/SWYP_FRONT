import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 정보 포함
});

// ✅ 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 필요시 토큰 설정
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // 인증 만료 시 처리 (예: 로그아웃)
      console.error("인증이 만료되었습니다.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
