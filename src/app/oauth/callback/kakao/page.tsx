'use client';

import { useEffect } from "react";

export default function KakaoRedirectPage() {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        const backendUrl = process.env.NEXT_PUBLIC_KAKAO_BACKEND_URI!;
        const isProd = process.env.NODE_ENV === 'production';

        if (!isProd) {
            window.opener?.postMessage(
                {
                    type: "KAKAO_LOGIN_SUCCESS",
                    payload: {
                        accessToken: "dummy-access-token",
                        refreshToken: "dummy-refresh-token",
                    },
                },
                "*"
            );
            window.close();
            return;
        }

        if (code) {
            fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            })
                .then(res => {
                    if (!res.ok) throw new Error("카카오 로그인 실패");
                    return res.json();
                })
                .then(data => {
                    window.opener?.postMessage(
                        {
                            type: "KAKAO_LOGIN_SUCCESS",
                            payload: {
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken,
                            },
                        },
                        "*"
                    );
                    window.close();
                })
                .catch(err => {
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
