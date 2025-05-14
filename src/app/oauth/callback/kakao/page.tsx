'use client';

import { useEffect } from "react";
import { getAdminToken, kakaoLogin } from "@/lib/api/auth";

export default function KakaoRedirectPage() {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        const isProd = process.env.NODE_ENV === 'production';
        const isTest = process.env.IS_TEST === 'true';

        // 테스트 또는 개발 환경일 때, Admin Token 가져오기
        if (!isProd || isTest) {
            getAdminToken()
                .then(({ accessToken, userName }) => {
                    window.opener?.postMessage(
                        {
                            type: "KAKAO_LOGIN_SUCCESS",
                            payload: {
                                accessToken,
                                userName,
                            },
                        },
                        "*"
                    );
                    window.close();
                })
                .catch((err) => {
                    window.opener?.postMessage(
                        {
                            type: "KAKAO_LOGIN_FAILURE",
                            error: err.message,
                        },
                        "*"
                    );
                    window.close();
                });

            return;
        }

        // 프로덕션 환경일 때, Kakao 로그인 처리
        if (code) {
            kakaoLogin(code)
                .then(({ accessToken, userName }) => {
                    window.opener?.postMessage(
                        {
                            type: "KAKAO_LOGIN_SUCCESS",
                            payload: {
                                accessToken,
                                userName,
                            },
                        },
                        "*"
                    );
                    window.close();
                })
                .catch((err) => {
                    window.opener?.postMessage(
                        {
                            type: "KAKAO_LOGIN_FAILURE",
                            error: err.message,
                        },
                        "*"
                    );
                    window.close();
                });
        }
    }, []);

    return <div className="text-center mt-20">카카오 로그인 처리 중...</div>;
}
