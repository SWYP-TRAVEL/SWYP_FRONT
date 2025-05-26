"use client";

import React, { useState, useRef } from "react";
import Text from "./Text";
import { DailyScheduleDtos } from "@/lib/api/itinerary";
import DetailCard_confirmVer from "./DetailCard_confirmVer";

type DayScheduleCardProps = {
    dailySchedule: DailyScheduleDtos;
};

const DayScheduleCard: React.FC<DayScheduleCardProps> = ({ dailySchedule }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col gap-2 w-[880px]">
            <div className="w-[880px] h-[50px] flex items-center justify-between p-[12px_24px] bg-[#F3EEFF] text-black rounded-xl">
                <Text textStyle="headline1" className="font-bold">
                    {dailySchedule.dayDate}일 차
                </Text>
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

            <div
                ref={contentRef}
                style={{
                    height: isExpanded ? `${contentRef.current?.scrollHeight}px` : "0px",
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                }}
            >
                <div className="flex flex-col gap-2">
                    {dailySchedule.attractions.map((place, index) => (
                        <div key={place.name} className="relative flex flex-col gap-2">
                            <DetailCard_confirmVer
                                title={place.name}
                                subtitle={place.description}
                                address={place.address}
                                hours={place.businessTime}
                                rating={place.rating}
                                imageUrl={place.coverImage}
                                attractionData={place}
                            />

                            {index < dailySchedule.attractions.length - 1 && (
                                <div className="flex items-center w-full pl-[60px] pr-[60px] py-[4px] gap-2">
                                    <div className="w-[2px] h-[40px] bg-[url('/icons/DotLine.svg')] bg-repeat-y bg-center" />
                                    {place.travelWalkTime && (
                                        <div className="flex items-center gap-2">
                                            <img src="/icons/Walk.svg" alt="walk icon" className="w-5 h-5" />
                                            <span className="text-[#a2a3e4]">{place.travelWalkTime}</span>
                                        </div>
                                    )}

                                    {place.travelWalkTime && place.travelCarTime && (
                                        <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat" />
                                    )}

                                    {place.travelCarTime && (
                                        <div className="flex items-center gap-2">
                                            <img src="/icons/Car.svg" alt="car icon" className="w-5 h-5" />
                                            <span className="text-[#a2a3e4]">{place.travelCarTime}</span>
                                        </div>
                                    )}

                                    {place.travelCarTime && place.travelDistance && (
                                        <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat" />
                                    )}

                                    {place.travelDistance && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#a2a3e4]">{place.travelDistance}</span>
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
