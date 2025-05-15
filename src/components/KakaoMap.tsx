'use client';
import React, { useEffect, useState } from 'react';
import { useRecommendTravelDetailStore } from '@/store/useRecommendTravelStore';

declare global {
    interface Window {
        kakao: any;
    }
}

const KakaoMap: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    const itinerary = useRecommendTravelDetailStore((state) => state.itinerary);

    const colorCycle = [
        '#FF0000', // 빨강
        '#FF7F00', // 주황
        '#FFFF00', // 노랑
        '#00FF00', // 초록
        '#0000FF', // 파랑
        '#4B0082', // 남색
        '#8B00FF'  // 보라
    ];

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
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    setIsLoaded(true);
                });
            }
        };
    }, [KAKAO_API_KEY]);

    useEffect(() => {
        if (isLoaded) {
            const kakao = (window as any).kakao;

            const container = document.getElementById('map');
            if (!container) {
                return;
            }

            let initialLat = 37.5665;
            let initialLng = 126.9780;

            if (itinerary?.dailyScheduleDtos?.length) {
                for (const day of itinerary.dailyScheduleDtos) {
                    if (day.attractions.length > 0) {
                        const firstAttraction = day.attractions[0];
                        if (firstAttraction.latitude && firstAttraction.longitude) {
                            initialLat = firstAttraction.latitude;
                            initialLng = firstAttraction.longitude;
                        }
                        break;
                    }
                }
            }

            const options = {
                center: new kakao.maps.LatLng(initialLat, initialLng),
                level: 3,
            };

            const map = new kakao.maps.Map(container, options);

            const linePath: any[] = [];
            let markerIndex = 1;

            if (itinerary?.dailyScheduleDtos) {
                itinerary.dailyScheduleDtos.forEach((day, dayIndex) => {
                    day.attractions.forEach((attraction) => {
                        if (attraction.latitude && attraction.longitude) {
                            const markerPosition = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);

                            linePath.push(markerPosition);

                            const color = colorCycle[dayIndex % colorCycle.length];

                            const overlayContent = `
                                <div style="
                                    width: 30px;
                                    height: 30px;
                                    background-color: ${color};
                                    border-radius: 50%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    color: white;
                                    font-weight: bold;
                                    border: 2px solid white;
                                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
                                ">
                                    ${markerIndex}
                                </div>`;

                            const overlay = new kakao.maps.CustomOverlay({
                                content: overlayContent,
                                position: markerPosition,
                                yAnchor: 1.1,
                            });

                            overlay.setMap(map);
                            markerIndex++;

                            kakao.maps.event.addListener(overlay, 'click', () => {
                                alert(`${attraction.name} - ${attraction.address}`);
                            });
                        }
                    });
                });

                const polyline = new kakao.maps.Polyline({
                    path: linePath,
                    strokeWeight: 3,
                    strokeColor: '#db4040',
                    strokeOpacity: 0.8,
                    strokeStyle: 'solid',
                });

                polyline.setMap(map);
            }
        }
    }, [isLoaded, itinerary]);

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
