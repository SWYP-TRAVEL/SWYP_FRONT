import React from "react";
import Text from "./Text";

type DetailCardProps = {
    title: string;
    subtitle: string;
    address: string;
    hours: string;
    rating: number;
    imageUrl: string;
    travelWalkTime?: string;
    travelCarTime?: string;
    travelDistance?: string;
};

const DetailCard: React.FC<DetailCardProps> = ({
    title,
    subtitle,
    address,
    hours,
    rating,
    imageUrl,
    travelWalkTime,
    travelCarTime,
    travelDistance,
}) => {
    return (
        <>
            <div className="flex flex-col border-2 border-gray-300 rounded-2xl shadow-lg bg-[#F8F8F8] w-[880px] h-[208px] hover:border-[#9A77FF] transition-colors duration-200">
                <div className="flex p-6 gap-4">
                    <div className="flex flex-col gap-2 w-[536px] h-[160px]">
                        <Text textStyle="heading1" className="font-bold">
                            {title}
                        </Text>
                        <Text textStyle="headline2" className="text-[#9A77FF]">
                            {subtitle}
                        </Text>

                        <div className="flex items-center gap-2">
                            <img src="/icons/Location.svg" alt="address icon" className="w-5 h-5" />
                            <Text textStyle="body1" className="text-gray-700">{address}</Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <img src="/icons/Clock.svg" alt="hours icon" className="w-5 h-5" />
                            <Text textStyle="body1" className="text-gray-700">{hours}</Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <img src="/icons/Star.svg" alt="rating icon" className="w-5 h-5" />
                            <Text textStyle="body1" className="text-gray-700">{rating}</Text>
                        </div>
                    </div>

                    <div className="w-[280px] h-[160px] overflow-hidden rounded-2xl">
                        <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>
            {/* 
            {travelWalkTime && (
                <div className="flex items-center gap-2 w-full mt-2 pl-[60px] pr-[60px] py-[4px]">
                    <div className="w-[2px] h-[40px] bg-[url('/icons/DotLine.svg')] bg-repeat-y bg-center" />

                    <div className="flex items-center ml-[16px]">
                        <img src="/icons/Walk.svg" alt="time icon" className="w-5 h-5" />
                        <span className="text-gray-700">{travelWalkTime}</span>
                    </div>

                    {travelWalkTime && (
                        <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat " />
                    )}

                    <div className="flex items-center">
                        <img src="/icons/Car.svg" alt="distance icon" className="w-5 h-5" />
                        <span className="text-gray-700">{travelCarTime}</span>
                    </div>

                    {travelCarTime && (
                        <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat " />
                    )}

                    <div className="flex items-center">
                        <span className="text-gray-700">{travelDistance}</span>
                    </div>

                </div>
            )} */}
        </>
    );
};

export default DetailCard;
