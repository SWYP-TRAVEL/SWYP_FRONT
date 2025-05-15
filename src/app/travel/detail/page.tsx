'use client';

import React, { useEffect, useState } from 'react';
import DayScheduleCard from '@/components/ScheduleCard';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { useRecommendTravelDetailStore } from '@/store/useRecommendTravelStore';
import { getRouteTime } from '@/lib/api/route';
import { Attraction, DailyScheduleDtos } from '@/lib/api/itinerary';
import debounce from 'lodash.debounce';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { useModal } from '@/hooks/useModal';
import ConfirmSaveItinerary from '@/components/ConfirmSaveItinerary';

const fetchTravelTime = async (
    current: Attraction,
    next: Attraction
): Promise<Attraction> => {
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

const calculateScheduleTimes = async (places: Attraction[]): Promise<Attraction[]> => {
    if (!places) return [];

    const updatedPlaces: Attraction[] = await Promise.all(
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

    return updatedPlaces;
};

const TravelSchedulePage: React.FC = () => {
    const itinerary = useRecommendTravelDetailStore((state) => state.itinerary);
    const updateItinerary = useRecommendTravelDetailStore((state) => state.setItinerary);
    const [isLoading, setIsLoading] = useState(false);

    const [checked, setCheckd] = useState(false)

    const confirmSaveModal = useModal(() => (
        <ConfirmModal
            title='이대로 세부 일정을 저장할까요?'
            description='한번 저장한 이후에는 수정이 어려워요.'
            cancelText='다시 편집하기'
            onCancel={confirmSaveModal.close}
            confirmText='저장하기'
            onConfirm={() => { }}
        >
            <>
                <ConfirmSaveItinerary
                    title='강릉 1박 2일 여행코스'
                    onChange={setCheckd}
                />
            </>
        </ConfirmModal>
    ))

    useEffect(() => {
        const fetchData = async () => {
            if (!itinerary?.dailyScheduleDtos || isLoading) {
                return;
            }

            const updatedData: DailyScheduleDtos[] = await Promise.all(
                itinerary.dailyScheduleDtos.map(async (schedule) => {
                    if (!schedule.attractions) {
                        return {
                            dayDate: schedule.dayDate,
                            attractions: []
                        };
                    }

                    const updatedPlaces = await calculateScheduleTimes(schedule.attractions);
                    return {
                        dayDate: schedule.dayDate,
                        attractions: updatedPlaces
                    };
                })
            );

            if (JSON.stringify(itinerary.dailyScheduleDtos) !== JSON.stringify(updatedData)) {
                updateItinerary({
                    ...itinerary,
                    dailyScheduleDtos: updatedData
                });
            }

            setIsLoading(false);
        };

        fetchData();
    }, [itinerary]);


    const handleReorder = debounce(async (dayDate: number, newOrder: Attraction[]) => {
        const updatedPlaces = await calculateScheduleTimes(newOrder);

        const updatedDailySchedules = JSON.parse(JSON.stringify(
            (itinerary?.dailyScheduleDtos ?? []).map((schedule) =>
                schedule.dayDate === dayDate
                    ? { ...schedule, attractions: updatedPlaces }
                    : schedule
            )
        ));

        updateItinerary({
            id: itinerary?.id ?? 0,
            title: itinerary?.title ?? '',
            createdBy: itinerary?.createdBy ?? 0,
            createdAt: itinerary?.createdAt ?? 0,
            isPublic: itinerary?.isPublic ?? false,
            isSaved: itinerary?.isSaved ?? false,
            dailyScheduleDtos: updatedDailySchedules
        });
    }, 500); // 500ms 디바운스 설정


    const handleSave = () => {
        console.log('✅ 저장된 일정:', itinerary?.dailyScheduleDtos);
        confirmSaveModal.open();
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-full">⏳ 로딩 중...</div>;
    }

    return (
        <div className='flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden'>
            <div className='flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border'>
                <section className='flex flex-col w-full mb-5'>
                    <Text textStyle='headline1' className='mb-[8px] text-gray-600'>
                        {itinerary?.title || '여행 일정'}
                    </Text>
                    <Text textStyle='title2' className='font-bold mb-[40px]'>
                        {`휴식이 필요한 유정님을 위한 ${itinerary?.title || '여행코스'}`}
                    </Text>
                    <Text textStyle='title3' className='font-bold'>일정</Text>
                </section>

                <section className='w-full flex flex-col gap-5'>
                    {itinerary?.dailyScheduleDtos.map((schedule, index) => (
                        <DayScheduleCard
                            key={`${schedule.dayDate ?? 'no-date'}-${index}-${JSON.stringify(schedule.attractions)}`}
                            dailySchedule={schedule}
                            onReorder={(newOrder) => handleReorder(schedule.dayDate, newOrder)}
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
        </div >
    );
};

export default TravelSchedulePage;
