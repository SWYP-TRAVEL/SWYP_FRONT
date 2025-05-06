"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Text from "@/components/Text";
import Image from "next/image";

type Course = {
    region: string;
    distanceInfo: string;
    imageUrl?: string;
};

const courseList: Course[] = [
    {
        region: "경상북도 경주시 2박 코스",
        distanceInfo: "500km 거리",
    },
    {
        region: "강원도 강릉시 1박 코스",
        distanceInfo: "300km 거리",
    },
    {
        region: "제주특별시 3박 코스",
        distanceInfo: "비행기 1시간",
    },
    {
        region: "대전광역시 3박 코스",
        distanceInfo: "비행기 1시간",
    },
];

export default function MyPage() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    return (
        <div className="w-full max-w-[1100px] mx-auto px-4 pt-[60px] pb-[60px] space-y-[84px]">
            <div className="flex items-center gap-2 mb-8">
                <Image
                    src="./icons/Chevron Left Bold.svg"
                    alt="chip icon"
                    width={20}
                    height={20}
                />
                <Text as="h1" textStyle="heading1" className="font-bold">
                    마이페이지
                </Text>
            </div>

            <section className="space-y-4 mb-5">
                <div className="flex items-center gap-2 mb-5">
                    <Text textStyle="heading2" className="font-bold">
                        저장한 추천 여행코스
                    </Text>
                </div>

                <div
                    ref={scrollRef}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className="overflow-x-auto scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
                >
                    <div className="flex gap-4 w-max pr-4">
                        {courseList.map((course, i) => (
                            <Card
                                key={i}
                                size="small"
                                region={course.region}
                                distanceInfo={course.distanceInfo}
                                imageUrl={course.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="space-y-4 mb-5">
                <div className="flex flex-col gap-2 mb-5">
                    <Text textStyle="heading2" className="font-bold">
                        모먼티어 사용경험은 어땠나요?
                    </Text>
                </div>
                <div className="flex flex-col gap-5">
                    <textarea
                        className="w-full h-[160px] border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#9A77FF]"
                        placeholder="편했던 점, 아쉬웠던 점을 자유롭게 적어주세요."
                    />
                    <div className="flex justify-end">
                        <Button variant="default" textStyle="label1" className="font-bold">
                            제출하기
                        </Button>
                    </div>
                </div>
            </section>

            <div className="w-full flex justify-start pt-10">
                <div className="flex items-center gap-2 cursor-pointer mb-5">
                    <button className="text-sm text-gray-500 underline hover:text-gray-700">
                        서비스 탈퇴하기
                    </button>
                </div>
            </div>
        </div>
    );
}
