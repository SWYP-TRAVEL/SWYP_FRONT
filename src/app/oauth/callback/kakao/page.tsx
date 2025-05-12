'use client';

import { useEffect } from "react";
import { kakaoLogin } from "@/lib/api/auth";

export default function KakaoRedirectPage() {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        const isProd = process.env.NODE_ENV === 'production';

        if (!isProd) {
            window.opener?.postMessage(
                {
                    type: "KAKAO_LOGIN_SUCCESS",
                    payload: {
                        accessToken: "dummy-access-token",
                        refreshToken: "dummy-refresh-token",
                        userName: "dummy-user-name",
                    },
                },
                "*"
            );
            window.close();
            return;
        }

        if (code) {
            kakaoLogin(code)
                .then((data) => {
                    window.opener?.postMessage(
                        {
                            type: "KAKAO_LOGIN_SUCCESS",
                            payload: {
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken,
                                userName: data.userName,
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
