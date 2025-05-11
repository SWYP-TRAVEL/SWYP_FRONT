"use client";

import React, { useState, useRef } from "react";
import DetailCard from "./DetailCard";
import Text from "./Text";
import { Reorder } from "framer-motion";

export type PlaceInfo = {
    title: string;
    subtitle: string;
    address: string;
    hours: string;
    rating: number;
    imageUrl: string;
    travelWalkTime?: string;
    travelCarTime?: string;
    travelDistance?: string;
    latitude?: number;
    longitude?: number;
};

type DayScheduleCardProps = {
    dayNumber: number;
    places: PlaceInfo[];
    onReorder: (newOrder: PlaceInfo[]) => void;
};

const DayScheduleCard: React.FC<DayScheduleCardProps> = ({ dayNumber, places, onReorder }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [items, setItems] = useState<PlaceInfo[]>(places);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleReorder = (newOrder: PlaceInfo[]) => {
        setItems(newOrder);
        onReorder(newOrder);
    };

    return (
        <div className="flex flex-col gap-2 w-[880px]">
            <div className="w-[880px] h-[50px] flex items-center justify-between p-[12px_24px] bg-[#F3EEFF] text-black rounded-xl">
                <Text textStyle="headline1" className="font-bold">
                    {dayNumber}일 차
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
                <Reorder.Group
                    axis="y"
                    values={items}
                    onReorder={handleReorder}
                    className="flex flex-col gap-2"
                >
                    {items.map((place, index) => (
                        <Reorder.Item key={place.title} value={place}>
                            <div className="relative flex flex-col gap-2">
                                <DetailCard {...place} />

                                {index < items.length - 1 && (
                                    <div className="flex items-center w-full pl-[60px] pr-[60px] py-[4px] gap-2">
                                        <div className="w-[2px] h-[40px] bg-[url('/icons/DotLine.svg')] bg-repeat-y bg-center" />

                                        <div className="flex items-center gap-2">
                                            {place.travelWalkTime && (
                                                <>
                                                    <img src="/icons/Walk.svg" alt="walk icon" className="w-5 h-5" />
                                                    <span className="text-gray-700">{place.travelWalkTime}</span>
                                                </>
                                            )}
                                        </div>

                                        {place.travelWalkTime && place.travelCarTime && (
                                            <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat " />
                                        )}

                                        <div className="flex items-center gap-2">
                                            {place.travelCarTime && (
                                                <>
                                                    <img src="/icons/Car.svg" alt="car icon" className="w-5 h-5" />
                                                    <span className="text-gray-700">{place.travelCarTime}</span>
                                                </>
                                            )}
                                        </div>

                                        {place.travelCarTime && place.travelDistance && (
                                            <div className="w-5 h-5 bg-[url('/icons/Dot.svg')] bg-contain bg-no-repeat " />
                                        )}

                                        <div className="flex items-center gap-2">
                                            {place.travelDistance && (
                                                <span className="text-gray-700">{place.travelDistance}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
};

export default DayScheduleCard;
