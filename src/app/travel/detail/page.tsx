'use client';

import React, { useState } from 'react';
import DayScheduleCard, { PlaceInfo } from '@/components/ScheduleCard';
import Text from '@/components/Text';
import Button from '@/components/Button';

const samplePlaces = [
    {
        title: '강릉짬뽕순두부 동화가든 본점',
        subtitle: '두부요리 / 예약필수',
        address: '강원 강릉시 초당순두부길 77번길 15 동화가든',
        hours: '매일 07:00 - 19:30',
        rating: 4.68,
        imageUrl: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4',
        travelWalkTime: '10분',
        travelCarTime: '1분',
        travelDistance: '900m',
        latitude: 37.787138,
        longitude: 128.899383
    },
    {
        title: '오죽헌',
        subtitle: '입장료 있음 / 운영시간 1시간 전 입장 마감',
        address: '강원 강릉시 율곡로3139번길 24 오죽헌',
        hours: '매일 09:00 - 18:00',
        rating: 4.68,
        imageUrl: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4',
        travelWalkTime: '10분',
        travelCarTime: '1분',
        travelDistance: '900m',
        latitude: 37.787553,
        longitude: 128.899167
    },
    {
        title: '경포해변',
        subtitle: '강릉시에 있는 동해안 최대의 해변',
        address: '강원 강릉시 강문동 산1',
        hours: '매일 00:00 - 24:00 상시 이용 가능',
        rating: 4.41,
        imageUrl: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4',
        latitude: 37.796763,
        longitude: 128.897134
    }
];

const TravelSchedulePage: React.FC = () => {
    const [places, setPlaces] = useState<PlaceInfo[]>(samplePlaces);

    const handleReorder = (newOrder: PlaceInfo[]) => {
        console.log("🔄 순서 변경됨:", newOrder);
        setPlaces(newOrder);
    };

    const handleSave = () => {
        console.log("🔄 저장된 일정 정보: ", places);
    };

    return (
        <div className='flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden'>
            <div
                className='flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border'
            >
                <section className='flex flex-col w-full mb-5'>
                    <Text textStyle='headline1' className='text-gray-600'>
                        강원도 강릉시
                    </Text>
                    <Text textStyle='title2' className='font-bold mb-5'>
                        휴식이 필요한 유정님을 위한 강릉 1박 2일 여행코스
                    </Text>
                    <Text textStyle='title3' className='font-bold'>
                        일정
                    </Text>
                </section>

                <section className='w-full flex flex-col gap-5'>
                    {[1, 2].map((dayNumber) => (
                        <DayScheduleCard
                            key={dayNumber}
                            dayNumber={dayNumber}
                            places={places}
                            onReorder={handleReorder}
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
