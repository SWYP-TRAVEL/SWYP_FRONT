'use client';

import React, { useEffect, useState } from 'react';
import DayScheduleCard, { PlaceInfo } from '@/components/ScheduleCard';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { useRecommendTravelDetailStore } from '@/store/useRecommendTravelStore';
import { getRouteTime } from '@/lib/api/route';

const fetchTravelTime = async (
    current: PlaceInfo,
    next: PlaceInfo
): Promise<PlaceInfo> => {
    if (
        current.latitude === undefined ||
        current.longitude === undefined ||
        next.latitude === undefined ||
        next.longitude === undefined
    ) {
        return {
            ...current,
            travelWalkTime: '좌표 정보 없음',
            travelCarTime: '좌표 정보 없음',
            travelDistance: '좌표 정보 없음'
        };
    }

    try {
        const { walkingDuration, drivingDuration } = await getRouteTime({
            startLatitude: current.latitude,
            startLongitude: current.longitude,
            endLatitude: next.latitude,
            endLongitude: next.longitude
        });

        return {
            ...current,
            travelWalkTime: `${walkingDuration}분`,
            travelCarTime: `${drivingDuration}분`,
            travelDistance: '거리 정보 추후 업데이트'
        };
    } catch {
        return {
            ...current,
            travelWalkTime: '정보 없음',
            travelCarTime: '정보 없음',
            travelDistance: '정보 없음'
        };
    }
};

const updatePlaceInfos = async (places: PlaceInfo[]): Promise<PlaceInfo[]> => {
    const updatedPlaces: PlaceInfo[] = await Promise.all(
        places.map(async (currentPlace, index) => {
            const nextPlace = places[index + 1];

            if (nextPlace) {
                const updatedPlace = await fetchTravelTime(currentPlace, nextPlace);
                return updatedPlace;
            } else {
                return {
                    ...currentPlace,
                    travelWalkTime: '마지막 장소',
                    travelCarTime: '마지막 장소',
                    travelDistance: '마지막 장소',
                };
            }
        })
    );

    return [...updatedPlaces];
};

const mapToPlaceInfo = async (dailyScheduleDtos: any[]): Promise<Record<number, PlaceInfo[]>> => {
    const grouped: Record<number, PlaceInfo[]> = {};

    for (const dto of dailyScheduleDtos) {
        const place: PlaceInfo = {
            title: dto.attractions.name,
            subtitle: `${dto.attractions.type} / ${dto.attractions.description}`,
            address: dto.attractions.address || '주소 정보 없음',
            hours: dto.attractions.businessTime || '운영 시간 정보 없음',
            rating: dto.attractions.rating,
            imageUrl: dto.attractions.coverImage || 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4',
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
    }

    for (const key in grouped) {
        grouped[key] = await updatePlaceInfos(grouped[key]);
    }

    return grouped;
};

const TravelSchedulePage: React.FC = () => {
    const itinerary = useRecommendTravelDetailStore((state) => state.itinerary);
    const [groupedPlaces, setGroupedPlaces] = useState<Record<number, PlaceInfo[]>>({});

    useEffect(() => {
        const fetchData = async () => {
            if (itinerary?.dailyScheduleDtos) {
                const mappedPlaces = await mapToPlaceInfo(itinerary.dailyScheduleDtos);
                setGroupedPlaces(mappedPlaces);
            }
        };
        fetchData();
    }, [itinerary]);

    const handleReorder = async (day: number, newOrder: PlaceInfo[]) => {
        const updatedPlaces = await updatePlaceInfos([...newOrder]);
        setGroupedPlaces((prev) => {
            const newGroupedPlaces = JSON.parse(JSON.stringify(prev));
            newGroupedPlaces[day] = updatedPlaces;
            return newGroupedPlaces;
        });
    };

    const handleSave = () => {
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
    };

    return (
        <div className='flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden'>
            <div className='flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border'>
                <section className='flex flex-col w-full mb-5'>
                    <Text textStyle='headline1' className='mb-[8px] text-gray-600'>
                        {itinerary?.title || '여행 일정'}
                    </Text>
                    <Text textStyle='title2' className='font-bold mb-[40px]'>{`휴식이 필요한 유정님을 위한 ${itinerary?.title || '여행코스'}`}</Text>
                    <Text textStyle='title3' className='font-bold'>일정</Text>
                </section>

                <section className='w-full flex flex-col gap-5'>
                    {Object.entries(groupedPlaces).map(([dayNumber, places]) => (
                        <DayScheduleCard
                            key={`${dayNumber}-${JSON.stringify(places)}`}
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
