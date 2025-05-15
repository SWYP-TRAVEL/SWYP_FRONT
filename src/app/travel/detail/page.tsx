"use client";

import Button from '@/components/Button';
import ConfirmSaveItinerary from '@/components/ConfirmSaveItinerary';
import ConfirmModal from '@/components/modals/ConfirmModal';
import DayScheduleCard from '@/components/ScheduleCard';
import Text from '@/components/Text';
import UserExperienceRate from '@/components/UserExperienceRate';
import { useModal } from '@/hooks/useModal';
import { saveItinerary } from '@/lib/api/itinerary';
import { saveUserExperience } from '@/lib/api/user';
import { useAuthStore } from '@/store/useAuthStore';
import { useRecommendTravelDetailStore } from '@/store/useRecommendTravelStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TravelSchedulePage: React.FC = () => {
    const router = useRouter();

    const itinerary = useRecommendTravelDetailStore((state) => state.itinerary);
    const updateItinerary = useRecommendTravelDetailStore((state) => state.updateItinerary);
    const user = useAuthStore((state) => state.user);

    const [isLoading, setIsLoading] = useState(false);

    const [checked, setCheckd] = useState(false); // [상세일정 저장] 퍼블릭 공개여부

    const [rating, setRating] = useState(0); // [사용자 경험 평가] 별점
    const [feedback, setFeedback] = useState(''); // [사용자 경험 평가] 이용후기

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
        confirmSaveModal.close();

        if (!itinerary) {
            console.error("일정 정보가 없습니다.");
            return;
        }

        itinerary.isPublic = checkedRef.current;

        try {
            const result = await saveItinerary(itinerary);

            if (result) {
                // TODO: 저장까지 마친 사용자에 한해서 사용경험 모달 띄움 한 계정당 한번씩만 노출되게끔
                // router.push("/mypage");
                userExperienceModal.open();
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

    // 사용자 경험 모달 [확인]
    const onConfirmUserExperience = async () => {
        try {
            userExperienceModal.close();
            const params = { rating, feedback };
            const saveUserExperienceRes = await saveUserExperience(params);
            if (saveUserExperienceRes.success) {
                // TODO: 저장까지 마친 사용자에 한해서 사용경험 모달 띄움 한 계정당 한번씩만 노출되게끔
            }
        } catch (err) {
            console.error(err);
        }
    }

    // 사용자 경험 모달
    const userExperienceModal = useModal(() => (
        <ConfirmModal
            title='아쉬웠던 점이나 좋았던 점이 있으셨나요?'
            description={`모먼티어가 더 좋아질 수 있도록,\n 여러분의 이야기를 들려주세요!`}
            cancelText='건너뛰기'
            onCancel={userExperienceModal.close}
            confirmText='제출하기'
            onConfirm={onConfirmUserExperience}
        >
            <UserExperienceRate
                onChangeRate={(v) => setRating(v)}
                onChangeFeedback={(v) => setFeedback(v)}
            />
        </ConfirmModal>
    ))

    return (
        <div className='flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden'>
            <div className='flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border'>
                {/* 해당페이지의 헤더 */}
                <section className='flex flex-col w-full mb-5'>
                    <Text textStyle='headline1' className='mb-[8px] text-gray-600'>
                        {itinerary?.title || '여행 일정'}
                    </Text>
                    <Text textStyle='title2' className='font-bold mb-[40px]'>{`휴식이 필요한 ${user ? user.userName : ''}님을 위한 ${itinerary?.title || '여행코스'}`}</Text>
                    <Text textStyle='title3' className='font-bold'>일정</Text>
                </section>

                {/* 세부일정의 카드 UI 영역 */}
                <section className='w-full flex flex-col gap-5'>
                    {itinerary?.dailyScheduleDtos.map((schedule, index) => (
                        <DayScheduleCard
                            key={`${index}-${JSON.stringify(schedule.attractions)}`}
                            dailySchedule={schedule}
                        />
                    ))}
                </section>

                {/* 저장 버튼 영역 */}
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
