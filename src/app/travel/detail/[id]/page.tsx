"use client";

import React, { useEffect, useState } from "react";
import Text from "@/components/Text";
import { getItineraryDetail } from "@/lib/api/itinerary";
import { getUserItinerariesById } from "@/lib/api/user";
import { useParams, usePathname } from "next/navigation";
import { usePublicTravelDetailStore } from "@/store/useRecommendTravelStore";
import { useAuthStore } from "@/store/useAuthStore";
import DayScheduleCard_confirmVer from "@/components/ScheduleCard_confirmVer";
import AlertBox from "@/components/modals/tooltip";
import { useModal } from "@/hooks/useModal";
import DefaultModal from "@/components/modals/DefaultModal";
import SavePdfButton from "@/components/SavePdfButton";
import Image from "next/image";
import { toast } from '@/store/useToastStore';
import Script from 'next/script';
import Tooltip from "@/components/ToolTip";

const TravelSchedulePage: React.FC = () => {
    const pathname = usePathname();

    const { id: itineraryId } = useParams();
    const { itinerary, setItinerary, clearItinerary } = usePublicTravelDetailStore();
    const { user } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    // 📌 여행 코스 제목 생성
    const travelTitle = `휴식이 필요한 ${user ? user.userName : ''}님을 위한 ${itinerary?.title || "여행코스"}`;

    useEffect(() => {
        const fetchData = async () => {
            if (!itineraryId) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const data = await getItineraryDetail(Number(itineraryId));
                if (data) {
                    setItinerary(data);

                    // 사용자 정보 조회 (createBy로 조회)
                    const userData = await getUserItinerariesById(data.createdBy);

                    // 로그인된 사용자 정보와 비교
                    if (user && userData.username) {
                        if (userData.username === user.userName) {
                            setIsOwner(true);
                        }
                    }
                }
            } catch {
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => clearItinerary();
    }, [itineraryId, setItinerary, clearItinerary, user]);

    const onLoadKakao = () => {
        const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
        const Kakao = (window as any).Kakao;
        Kakao.init(KAKAO_API_KEY)
    }

    const handleCopyUrl = () => {
        const fullUrl = `${window.location.origin}${pathname}`;
        shareModal.close();
        try {
            navigator.clipboard.writeText(fullUrl);
            toast.success('링크를 클립보드에 복사했어요.');
        } catch (err) {
            toast.error('곧 URL 링크복사 기능을 추가할게요.');
        }
    };

    const handleShareKakao = () => {
        const fullUrl = `${window.location.origin}${pathname}`;
        const Kakao = (window as any).Kakao;
        Kakao.Share.sendDefault({
            objectType: 'text',
            text: '어디로 떠날지 고민 중이라면, 모먼티어가 도와드릴게요',
            link: {
                mobileWebUrl: fullUrl,
                webUrl: fullUrl,
            },
        });
        shareModal.close();

    }

    const shareModal = useModal(() => (
        <DefaultModal
            title="이제 일정을 공유해볼까요?"
            description={`완성된 일정을 원하는 방식으로 공유해보세요.\n 필요 없다면 건너뛰어도 괜찮아요!`}
            onClose={shareModal.close}
        >
            <div className="flex mt-[36px] justify-between px-[34px] py-[55px]">
                <button
                    className='flex flex-col justify-center items-center text-[#C1C1C1]'
                    onClick={handleShareKakao}>
                    <Image
                        src="/icons/kakao_round.png"
                        alt='kakaoTalk'
                        width={60}
                        height={60}
                        className='mb-2.5'
                    />
                    카카오톡 공유
                </button>
                <button
                    className='flex flex-col justify-center items-center text-[#C1C1C1]'
                    onClick={handleCopyUrl}>
                    <Image
                        src="/icons/URL.svg"
                        alt='URL'
                        width={60}
                        height={60}
                        className='mb-2.5'
                    />
                    URL 공유
                </button>
                <SavePdfButton onClickButton={shareModal.close} fileName={travelTitle} />
            </div>
        </DefaultModal>
    ))

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                ⏳ 로딩 중...
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="flex items-center justify-center h-full">
                🚫 여행 일정 정보를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <>
            <Script
                src="https://developers.kakao.com/sdk/js/kakao.js"
                strategy="afterInteractive"
                onLoad={onLoadKakao}

            />
            <div className="flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden">
                <div className="overflow-y-auto box-border">
                    <div id="pdf-target" className="flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5  ">
                        <section className="flex flex-col w-full mb-5 gap-[40px]">
                            {!isOwner && (
                                <AlertBox
                                    message="보기 전용 페이지 입니다."
                                    description="이 페이지는 일정 확인만 가능하며, 맞춤형 여행일정 생성 및 편집은 카카오 로그인 후에 이용 가능합니다."
                                />
                            )}
                            <div className="relative flex flex-col">
                                <div className="flex flex-col">
                                    <Text textStyle="headline1" className="mb-[8px] text-[#858588] font-semibold">
                                        {travelTitle}
                                    </Text>
                                    <Text textStyle="title2" className="font-bold">
                                        {travelTitle}
                                    </Text>
                                </div>
                                <Tooltip text="여행 일정을 공유할 수 있어요!" direction="top">
                                    <button onClick={shareModal.open}>
                                        <img
                                            src="/icons/Share.svg"
                                            alt="공유 아이콘"
                                            className="absolute top-0 right-0 w-[28px] h-[28px] object-cover"
                                        />
                                    </button>
                                </Tooltip>
                            </div>
                            <Text textStyle="title3" className="font-bold">일정</Text>
                        </section>
                        <section className="w-full flex flex-col gap-5">
                            {itinerary?.dailyScheduleDtos.map((schedule, index) => (
                                <DayScheduleCard_confirmVer
                                    key={`${index}-${JSON.stringify(schedule.attractions)}`}
                                    dailySchedule={schedule}
                                />
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TravelSchedulePage;
