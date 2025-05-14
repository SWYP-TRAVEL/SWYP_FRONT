'use client';

import React, { useEffect, useState } from 'react';
import DayScheduleCard, { PlaceInfo } from '@/components/ScheduleCard';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { useRecommendTravelDetailStore } from '@/store/useRecommendTravelStore';

const mapToPlaceInfo = (dailyScheduleDtos: any[]): Record<number, PlaceInfo[]> => {
    const grouped: Record<number, PlaceInfo[]> = {};

    dailyScheduleDtos.forEach((dto) => {
        const place: PlaceInfo = {
            title: dto.attractions.name,
            subtitle: `${dto.attractions.type} / ${dto.attractions.description}`,
            address: dto.attractions.address || '주소 정보 없음',
            hours: dto.attractions.businessTime || '운영 시간 정보 없음',
            rating: dto.attractions.rating,
            imageUrl: dto.attractions.coverImage || 'https://via.placeholder.com/150',
            travelWalkTime: '정보 없음',
            travelCarTime: '정보 없음',
            travelDistance: '정보 없음',
            latitude: dto.attractions.latitude,
            longitude: dto.attractions.longitude
        };

        if (!grouped[dto.dayDate]) {
            grouped[dto.dayDate] = [];
        }
        grouped[dto.dayDate].push(place);
    });

    return grouped;
};

const TravelSchedulePage: React.FC = () => {
    const itinerary = useRecommendTravelDetailStore((state) => state.itinerary);

    const [groupedPlaces, setGroupedPlaces] = useState<Record<number, PlaceInfo[]>>({});

    useEffect(() => {
        if (itinerary?.dailyScheduleDtos) {
            const mappedPlaces = mapToPlaceInfo(itinerary.dailyScheduleDtos);
            setGroupedPlaces(mappedPlaces);
        }
    }, [itinerary]);

    const handleReorder = (day: number, newOrder: PlaceInfo[]) => {
        console.log(`🔄 ${day}일차 순서 변경됨:`, newOrder);
        setGroupedPlaces((prev) => ({
            ...prev,
            [day]: newOrder
        }));
    };

    const handleSave = () => {
        console.log('🔄 저장된 일정 정보: ', groupedPlaces);
        const updatedDtos = Object.entries(groupedPlaces).flatMap(([day, places]) =>
            places.map((place) => ({
                dayDate: Number(day),
                attractions: {
                    id: null,
                    type: place.subtitle.split(' / ')[0],
                    name: place.title,
                    address: place.address,
                    description: place.subtitle.split(' / ')[1],
                    coverImage: place.imageUrl,
                    businessTime: place.hours,
                    rating: place.rating,
                    latitude: place.latitude,
                    longitude: place.longitude
                }
            }))
        );
        console.log('🔄 변환된 일정 정보:', updatedDtos);
    };


    return (
        <div className='flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden'>
            <div
                className='flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border'
            >
                <section className='flex flex-col w-full mb-5'>
                    <Text textStyle='headline1' className='mb-[8px] text-gray-600'>
                        {itinerary?.title || '여행 일정'}
                    </Text>
                    <Text textStyle='title2' className='font-bold mb-[40px]'>
                        {`휴식이 필요한 유정님을 위한 ${itinerary?.title || '여행코스'}`}
                    </Text>
                    <Text textStyle='title3' className='font-bold'>
                        일정
                    </Text>
                </section>

                <section className='w-full flex flex-col gap-5'>
                    {Object.entries(groupedPlaces).map(([dayNumber, places]) => (
                        <DayScheduleCard
                            key={dayNumber}
                            dayNumber={Number(dayNumber)}
                            places={places}
                            onReorder={(newOrder) => handleReorder(Number(dayNumber), newOrder)}
                        />
                    ))}
                </section>

                <div className='w-full flex justify-end mt-5'>
                    <Button
                        variant='gradation'
                        className='text-white font-semibold text-[16px] !important leading-[24px] tracking-[0.091px] mx-auto'
                        onClick={handleSave}
                    >
                        일정 저장하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TravelSchedulePage;
