"use client";

import React, { useState } from "react";
import Text from "./Text";
import { Attraction } from "@/lib/api/itinerary";
import { useRecommendTravelDetailStore } from "@/store/useRecommendTravelStore";
import { changeAttraction } from "@/lib/api/itinerary";
import Tooltip from "./ToolTip";

type DetailCardProps = {
    title: string;
    subtitle: string;
    address: string;
    hours: string;
    rating: number;
    imageUrl: string;
    attractionData: Attraction;
};

const DetailCard: React.FC<DetailCardProps> = ({
    title,
    subtitle,
    address,
    hours,
    rating,
    imageUrl,
    attractionData,
}) => {
    const updateAttraction = useRecommendTravelDetailStore((state) => state.updateAttraction);
    const [isLoading, setIsLoading] = useState(false);
    const handleUpdateClick = async () => {
        try {
            const updatedAttraction = {
                ...attractionData,
                name: title,
                address,
                description: subtitle,
                businessTime: hours,
                rating,
                coverImage: imageUrl,
            };

            setIsLoading(true);
            const response = await changeAttraction(updatedAttraction);
            updateAttraction(attractionData, response);
            setIsLoading(false);
        } catch (error) {
            console.error("업데이트 실패:", error);
        }
    };

    const handleRollbackClick = () => {
        if (attractionData.previousData) {
            updateAttraction(attractionData, attractionData.previousData);
        }
    };
    if (isLoading) {
        return (
            <div className='rounded-[16px] animate-pulse bg-[#F9F9F9] mb-2 flex'>
                <div className="flex p-6 gap-4">
                    <div className="w-6 h-full flex flex-col items-center gap-2">
                        <img
                            src="/icons/Handle Desktop.svg"
                            alt="icon"
                            className="w-6 h-6 object-contain"
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-2 w-[456px] h-[160px]">
                        <div className="bg-[#EEEEEE] rounded-[4px] w-[45%] h-[30px]"></div>
                        <div className="w-[55%] bg-[#EEEEEE] h-[26px] rounded-[4px]"></div>
                        <div className="flex items-center">
                            <div className='bg-[#EEEEEE] h-[20px] w-[20px] rounded-[4px] mr-1.5'></div>
                            <div className="bg-[#EEEEEE] h-[20px] w-[70%] rounded-[4px]"></div>
                        </div>
                        <div className="flex items-center">
                            <div className='bg-[#EEEEEE] h-[20px] w-[20px] rounded-[4px] mr-1.5'></div>
                            <div className="bg-[#EEEEEE] h-[20px] w-[70%] rounded-[4px]"></div>
                        </div>
                        <div className="flex items-center">
                            <div className='bg-[#EEEEEE] h-[20px] w-[20px] rounded-[4px] mr-1.5'></div>
                            <div className="bg-[#EEEEEE] h-[20px] w-[70%] rounded-[4px]"></div>
                        </div>
                    </div>

                    <div className="w-[280px] h-[160px] overflow-hidden rounded-2xl">
                        <div className='w-full h-full bg-[#EEEEEE]'></div>
                    </div>

                    <div className="w-6 h-full flex flex-col items-center gap-2">
                        <img
                            src="/icons/Re_Request.svg"
                            alt="icon"
                            className="w-6 h-6 object-contain cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col border-2 border-transparent rounded-2xl shadow-lg bg-[#F8F8F8] w-[880px] h-[208px] hover:border-[#9A77FF] transition-colors duration-200">
            <div className="flex p-6 gap-4">
                <div className="w-6 h-full flex flex-col items-center gap-2">
                    <Tooltip text="드래그해서 일정 순서를 바꿀 수 있어요!" direction="top">
                        <img
                            src="/icons/Handle Desktop.svg"
                            alt="handle"
                            className="w-6 h-6 object-contain cursor-grab"
                        />
                    </Tooltip>
                </div>

                <div className="flex flex-col gap-2 w-[456px] h-[160px]">
                    <Text textStyle="heading1" className="font-bold truncate overflow-hidden whitespace-nowrap">
                        {title}
                    </Text>
                    <Text textStyle="headline2" className="text-[#9A77FF] truncate overflow-hidden whitespace-nowrap">
                        {subtitle}
                    </Text>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Location.svg" alt="address icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700">{address}</Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Clock.svg" alt="hours icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700 truncate">{hours}</Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Star.svg" alt="rating icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700">{rating}</Text>
                    </div>
                </div>

                <div className="w-[280px] h-[160px] overflow-hidden rounded-2xl">
                    <img
                        src={imageUrl && imageUrl.trim() !== "" ? imageUrl : "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4"}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="w-6 h-full flex flex-col items-center gap-2">
                    <Tooltip text="비슷한 다른 장소를 추천 받을 수 있어요!" direction="top">
                        <img
                            src="/icons/Re_Request.svg"
                            alt="ReRequest icon"
                            className="w-6 h-6 object-contain cursor-pointer"
                            onClick={handleUpdateClick}
                        />
                    </Tooltip>

                    {attractionData.previousData && (
                        <Tooltip text="처음 추천받았던 장소로 되돌릴 수 있어요!">
                            <img
                                src="/icons/Reset.svg"
                                alt="Reset icon"
                                className="w-6 h-6 object-contain cursor-pointer"
                                onClick={handleRollbackClick}
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
