"use client";

import React from "react";
import Text from "./Text";
import { Attraction } from "@/lib/api/itinerary";
import { useRecommendTravelDetailStore } from "@/store/useRecommendTravelStore";
import { changeAttraction } from "@/lib/api/itinerary";

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

    return (
        <div className="flex flex-col border-2 border-gray-300 rounded-2xl shadow-lg bg-[#F8F8F8] w-[880px] h-[208px] hover:border-[#9A77FF] transition-colors duration-200">
            <div className="flex p-6 gap-4">
                <div className="w-6 h-full flex flex-col items-center gap-2" />
                <div className="flex flex-col gap-2 w-[456px] h-[160px]">
                    <Text textStyle="heading1" className="font-bold truncate overflow-hidden whitespace-nowrap">
                        {title}
                    </Text>
                    <Text textStyle="headline2" className="text-[#9A77FF] truncate overflow-hidden whitespace-nowrap">
                        {subtitle}
                    </Text>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Location.svg" alt="address icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700 truncate">{address}</Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Clock.svg" alt="hours icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700 truncate">{hours}</Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Star.svg" alt="rating icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700 truncate">{rating}</Text>
                    </div>
                </div>

                <div className="w-[280px] h-[160px] overflow-hidden rounded-2xl">
                    <img
                        src={imageUrl && imageUrl.trim() !== "" ? imageUrl : "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4"}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
