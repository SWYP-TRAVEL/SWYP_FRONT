import React, { useState, useRef } from "react";
import DetailCard from "./DetailCard";
import Text from "./Text";

type PlaceInfo = {
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

type DayScheduleCardProps = {
    dayNumber: number;
    places: PlaceInfo[];
};

const DayScheduleCard: React.FC<DayScheduleCardProps> = ({ dayNumber, places }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);

    // 🔹 확대/축소 버튼 클릭 시 실행
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`flex flex-col gap-2 w-[880px]`}>
            {/* Day Header */}
            <div className="w-[880px] h-[50px] flex items-center justify-between p-[12px_24px] bg-[#F3EEFF] text-black rounded-xl">
                <Text textStyle="headline1" className="font-bold">
                    {dayNumber}일 차
                </Text>

                {/* 🔹 확대/축소 버튼 */}
                <button
                    onClick={handleExpandClick}
                    className="w-[28px] h-[28px] transition"
                >
                    {isExpanded ? (
                        <img src="/icons/Chevron Down.svg" alt="expand" className="w-full h-full" />
                    ) : (
                        <img src="/icons/Chevron Right.svg" alt="collapse" className="w-full h-full" />
                    )}
                </button>
            </div>

            {/* 🔹 장소 리스트 (확대 시만 보이도록) */}
            <div
                ref={contentRef}
                style={{
                    height: isExpanded ? `${contentRef.current?.scrollHeight}px` : "0px",
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                }}
            >
                <div className="flex flex-col gap-2">
                    {places.map((place, index) => (
                        <div key={index} className="relative flex flex-col gap-2">
                            <DetailCard {...place} />

                            {/* 🔹 두 장소 사이 연결 */}
                            {index < places.length - 1 && (
                                <div className="flex items-center w-full pl-[60px] pr-[60px] py-[4px] gap-2">
                                    <div className="w-[2px] h-[40px] bg-[url('/icons/DotLine.svg')] bg-repeat-y bg-center" />

                                    {place.travelWalkTime && (
                                        <div className="flex items-center gap-2">
                                            <img src="/icons/Walk.svg" alt="walk icon" className="w-5 h-5" />
                                            <span className="text-gray-700">{place.travelWalkTime}</span>
                                        </div>
                                    )}

                                    {place.travelWalkTime && place.travelCarTime && (
                                        <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat " />
                                    )}

                                    {place.travelCarTime && (
                                        <div className="flex items-center gap-2">
                                            <img src="/icons/Car.svg" alt="car icon" className="w-5 h-5" />
                                            <span className="text-gray-700">{place.travelCarTime}</span>
                                        </div>
                                    )}

                                    {place.travelCarTime && place.travelDistance && (
                                        <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat " />
                                    )}

                                    {place.travelDistance && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-700">{place.travelDistance}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayScheduleCard;
