"use client";

import React, { useEffect, useState } from 'react';
import DayScheduleCard from '@/components/ScheduleCard';
import Text from '@/components/Text';
import Button from '@/components/Button';
import ConfirmSaveItinerary from '@/components/ConfirmSaveItinerary';
import ConfirmModal from '@/components/modals/ConfirmModal';

import { useRecommendTravelDetailStore } from '@/store/useRecommendTravelStore';
import { saveItinerary } from '@/lib/api/itinerary';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';

const TravelSchedulePage: React.FC = () => {
    const router = useRouter();
    const itinerary = useRecommendTravelDetailStore((state) => state.itinerary);
    const updateItinerary = useRecommendTravelDetailStore((state) => state.updateItinerary);
    const [isLoading, setIsLoading] = useState(false);

    const [checked, setCheckd] = useState(false)
    const checkedRef = React.useRef(checked);

    useEffect(() => {
        checkedRef.current = checked;
    }, [checked]);

    const confirmSaveModal = useModal(() => (
        <ConfirmModal
            title='이대로 세부 일정을 저장할까요?'
            description='한번 저장한 이후에는 수정이 어려워요.'
            cancelText='다시 편집하기'
            onCancel={confirmSaveModal.close}
            confirmText='저장하기'
            onConfirm={onConfirmCreateItinerary}
        >
            <ConfirmSaveItinerary
                title={itinerary?.title ?? ""}
                onChange={setCheckd}
            />
        </ConfirmModal>
    ));

    const onConfirmCreateItinerary = async () => {
        if (!itinerary) {
            console.error("일정 정보가 없습니다.");
            return;
        }

        itinerary.isPublic = checkedRef.current;

        try {
            const result = await saveItinerary(itinerary);

            if (result) {
                router.push("/mypage");
            }
        } catch (err) {
            console.error("일정 저장 중 오류 발생:", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!itinerary?.dailyScheduleDtos || isLoading) {
                return;
            }

            setIsLoading(false);
        };

        fetchData();
    }, [itinerary]);

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
                    <Text textStyle='title2' className='font-bold mb-[40px]'>{`휴식이 필요한 유정님을 위한 ${itinerary?.title || '여행코스'}`}</Text>
                    <Text textStyle='title3' className='font-bold'>일정</Text>
                </section>

                <section className='w-full flex flex-col gap-5'>
                    {itinerary?.dailyScheduleDtos.map((schedule, index) => (
                        <DayScheduleCard
                            key={`${index}-${JSON.stringify(schedule.attractions)}`}
                            dailySchedule={schedule}
                        />
                    ))}
                </section>

                <div className='w-full flex justify-end mt-5'>
                    <Button
                        variant='gradation'
                        className='text-white font-semibold text-[16px] leading-[24px] tracking-[0.091px] mx-auto'
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
