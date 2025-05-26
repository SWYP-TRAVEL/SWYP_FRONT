"use client";

import Button from '@/components/Button';
import ConfirmSaveItinerary from '@/components/ConfirmSaveItinerary';
import AlertModal from '@/components/modals/AlertModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import DayScheduleCard from '@/components/ScheduleCard';
import DayScheduleCardSkeleton from '@/components/ScheduleCard_Skeleton';
import Text from '@/components/Text';
import UserExperienceRate from '@/components/UserExperienceRate';
import { useModal } from '@/hooks/useModal';
import { createItinerary, saveItinerary } from '@/lib/api/itinerary';
import { saveUserExperience } from '@/lib/api/user';
import { useAuthStore } from '@/store/useAuthStore';
import { useLoadingStore } from '@/store/useLoadingStore';
import { useRecommendTravelDetailStore, useUserInputStore } from '@/store/useRecommendTravelStore';
import { toast } from '@/store/useToastStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const TravelSchedulePage: React.FC = () => {
    const router = useRouter();

    const itinerary = useRecommendTravelDetailStore((state) => state.itinerary);
    const user = useAuthStore((state) => state.user);

    const isLoading = useLoadingStore((state) => state.isLoading);
    const loadingType = useLoadingStore((state) => state.loadingType);

    const [checked, setCheckd] = useState(false); // [상세일정 저장] 퍼블릭 공개여부

    const [rating, setRating] = useState(0); // [사용자 경험 평가] 별점
    const [feedback, setFeedback] = useState(''); // [사용자 경험 평가] 이용후기
    const [createdId, setCreatedId] = useState(''); // 상세일정 저장 시 생성되는 id

    const checkedRef = React.useRef(checked);
    const ratingRef = React.useRef(rating);
    const feedbackRef = React.useRef(feedback);

    const userInputs = useUserInputStore((state) => state.inputs);

    // 최초 렌더링 부수효과
    useEffect(() => {
        if (!userInputs) {
            router.push('/travel/recommend')
            return;
        }

        const getItinerary = async () => {
            try {
                const { requestCount, ...params } = userInputs;
                const result = await createItinerary(params);
                if (result) {
                    useRecommendTravelDetailStore.getState().setItinerary(result);
                } else {
                    handleErrorState();
                }
            } catch (err) {
                handleErrorState();
            }
        }

        getItinerary();
    }, [])

    // public 저장여부 부수효과
    useEffect(() => {
        checkedRef.current = checked;
        ratingRef.current = rating;
        feedbackRef.current = feedback;
    }, [checked, rating, feedback]);

    //  부수효과
    useEffect(() => {
        const fetchData = async () => {
            if (!itinerary?.dailyScheduleDtos || isLoading) {
                return;
            }
        };
        fetchData();
    }, [itinerary]);

    // 상세일정 저장 모달
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

    // 상세일정 저장 컨펌
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
                setCreatedId(result.itineraryId.toString());
                toast.success('여행 일정이 마이페이지에 저장되었어요.');
                if (user && !user.hasSubmittedExperience) {
                    // 저장까지 마친 사용자에 한해서 사용경험 모달 띄움 한 계정당 한번씩만 노출되게끔
                    userExperienceModal.open();
                    return;
                }
                goToTravelDetail();
            }
        } catch (err) {
            toast.error('여행 일정 저장에 실패했어요. 다시 한 번 시도해 주세요.');
            console.error("일정 저장 중 오류 발생:", err);
        }
    };

    // 사용자 경험 모달 [확인]
    const onConfirmUserExperience = async () => {
        try {
            userExperienceModal.close();
            const params = {
                rating: ratingRef.current,
                feedback: feedbackRef.current
            };
            const saveUserExperienceRes = await saveUserExperience(params);
            if (user) {
                // 저장까지 마친 사용자에 한해서 사용경험 모달 띄움 한 계정당 한번씩만 노출되게끔
                user.hasSubmittedExperience = true;
            }
            if (saveUserExperienceRes.success) {
                toast.success('소중한 의견이 제출되었어요. 감사합니다.');
            } else {
                toast.error('소중한 의견 제출에 실패했어요. 죄송합니다.');
            }
            goToTravelDetail();
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

    // 저장 시 최종저장화면으로 이동
    const goToTravelDetail = () => {
        router.push(`/travel/detail/${createdId}`);
    };

    // 엣지케이스 핸들링
    const handleErrorState = (err: string = '') => {
        errModal.open();
    };

    const onCloseErrModal = () => {
        errModal.close();
        router.replace('/travel/recommend')
    };

    // 엣지케이스 모달
    const errModal = useModal(() => (
        <AlertModal
            title='정보를 불러오는데 실패했습니다!'
            description='상세일정을 불러오는데 실패했습니다. 다시 실행해 주세요!'
            buttonText='확인'
            onClose={onCloseErrModal}
        />
    ))

    if (isLoading && loadingType === 'skeleton') return (
        <div className='flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden'>
            <div className='flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border'>
                {/* 해당페이지의 헤더 */}
                <section className='flex flex-col w-full mb-5'>
                    <div className='w-[98px] h-[26px] animate-pulse bg-[#E8E8EA] mb-[8px]'></div>
                    <div className='w-[541px] h-[38px] animate-pulse bg-[#E8E8EA] mb-[40px]'></div>
                    <div className='w-[41px] h-[32px] animate-pulse bg-[#E8E8EA]'></div>
                </section>

                {/* 세부일정의 카드 UI 영역 */}
                <section className='w-full flex flex-col gap-5'>
                    <DayScheduleCardSkeleton count={3} />
                    <DayScheduleCardSkeleton count={1} />
                </section>
                {/* 저장 버튼 영역 */}
                <div className='w-full flex justify-end mt-5'>
                    <div className='mx-auto rounded-[25px] h-[48px] w-[180px] animate-pulse bg-[#C7C8C9]'></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden'>
            <div className='flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border'>
                <div id="pdf-target" >
                    {/* 해당페이지의 헤더 */}
                    <section className='flex flex-col w-full mb-5'>
                        <Text textStyle='headline1' className='mb-[8px] text-gray-600'>
                            {itinerary?.title || '여행 일정'}
                        </Text>
                        <Text textStyle='title2' className='font-bold mb-[40px]'>{`${user ? user.userName : ''}님을 위한 ${itinerary?.title || '여행코스'}`}</Text>
                        <Text textStyle='title3' className='font-bold'>일정</Text>
                    </section>

                    {/* 세부일정의 카드 UI 영역 */}
                    <section className='w-full flex flex-col gap-5'>
                        {itinerary ?
                            itinerary.dailyScheduleDtos.map((schedule, index) => (
                                <DayScheduleCard
                                    key={`${index}-${JSON.stringify(schedule.attractions)}`}
                                    dailySchedule={schedule}
                                />
                            ))
                            : null}
                    </section>

                </div>
                {/* 저장 버튼 영역 */}
                <div className='w-full flex justify-end mt-5'>
                    <Button
                        variant='gradation'
                        className='text-white font-semibold text-[16px] leading-[24px] tracking-[0.091px] mx-auto'
                        onClick={confirmSaveModal.open}
                    >
                        일정 저장하기
                    </Button>
                </div>
            </div >
        </div >
    );
};

export default TravelSchedulePage;
