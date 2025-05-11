'use client';
import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface MapProps {
    latitude: number;
    longitude: number;
}

const KakaoMap: React.FC<MapProps> = ({ latitude, longitude }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // ✅ 환경 변수에서 API 키 로딩
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    useEffect(() => {
        if (!KAKAO_API_KEY) {
            console.error('❌ Kakao Map API Key가 설정되지 않았습니다.');
            return;
        }

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            console.log('✅ Kakao Maps SDK Loaded');
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    console.log('✅ Kakao Maps 객체 로딩 완료');
                    setIsLoaded(true);
                });
            }
        };
    }, [KAKAO_API_KEY]);

    useEffect(() => {
        console.log('isLoaded 상태:', isLoaded);
        if (isLoaded) {
            const kakao = (window as any).kakao;

            const container = document.getElementById('map');
            if (!container) {
                console.error('❌ #map 컨테이너를 찾을 수 없습니다.');
                return;
            }
            const options = {
                center: new kakao.maps.LatLng(latitude, longitude),
                level: 3,
            };

            try {
                const map = new kakao.maps.Map(container, options);
                const markerPosition = new kakao.maps.LatLng(latitude, longitude);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                });

                marker.setMap(map);
                console.log('✅ Kakao Map 렌더링 성공');
            } catch (error) {
                console.error('❌ 마커 생성 중 에러:', error);
            }
        }
    }, [isLoaded, latitude, longitude]);

    return (
        <div
            id='map'
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default KakaoMap;
