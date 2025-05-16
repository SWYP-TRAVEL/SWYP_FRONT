"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Text from "@/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { getUserItineraries, Itinerary } from "@/lib/api/user";
import { unlinkKakaoAccount } from "@/lib/api/auth";
import { useModal } from "@/hooks/useModal";
import ConfirmModal from "@/components/modals/ConfirmModal";

export default function MyPage() {
    const [courseList, setCourseList] = useState<Itinerary[]>([]);
    const [experience, setExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const displayedCourses = isExpanded ? courseList : courseList.slice(0, 3);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const data = await getUserItineraries();
                setCourseList(data);
            } catch (err: any) {
                console.error("여행 일정을 불러오는 중 오류 발생:", err.message);
            }
        };
        fetchItineraries();
    }, []);

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

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


    const handleUnlink = async () => {
        confirmUnlinkModal.open();
    };

    const confirmUnlinkModal = useModal(() => (
        <ConfirmModal
            title="서비스를 탈퇴할까요?"
            description="저장한 여행 일정은 모두 삭제되며, 복구할 수 없어요."
            cancelText="탈퇴하기"
            onCancel={onClickUnlink}
            confirmText="유지하기"
            onConfirm={confirmUnlinkModal.close}
        />
    ))

    const onClickUnlink = async () => {
        try {
            await unlinkKakaoAccount();
            // alert("카카오 계정이 성공적으로 탈퇴되었습니다."); // FIXME: figma에 안보여서 주석처리
            logout();
            router.push("/");
        } catch (err: any) {
            alert("계정 탈퇴에 실패하였습니다."); // TODO: window alert?
        }
    };

    const onClickCard = (id: number) => {

    };

    const onClickBack = () => { };

    return (
        <div className="w-full flex flex-col gap-[40px] max-w-[1100px] min-h[1180px] mx-auto px-5 py-[60px]">
            <div className="flex items-center gap-2 ">
                <Image
                    src="/icons/Chevron Left Bold.svg"
                    alt="chip icon"
                    width={20}
                    height={20}
                />
                <Text as="h1" textStyle="heading1" className="font-bold">
                    마이페이지
                </Text>
            </div>
            <div className="flex items-center bg-white py-[20px] px-[28px] rounded-lg shadow-md gap-4">
                <Image
                    src="/icons/kakao_round.png"
                    alt="profile"
                    width={52}
                    height={52}
                    className="rounded-full"
                />
                <div className="flex flex-col justify-center">
                    <Text as="p" textStyle="headline1" className="font-semibold text-left text-[18px] text-[#404040] font-pretendard leading-[144.5%] tracking-[-0.004px]">
                        안유정
                    </Text>
                    <Text as="p" textStyle="label1" className="text-gray-500">
                        카카오 계정 연결 2025.05.10
                    </Text>
                </div>
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
                    {courseList.length > 0 ? <>
                        <div className="grid grid-cols-3 gap-4 w-full">
                            {displayedCourses.map((course) => (
                                <Card
                                    width="340px"
                                    key={course.id}
                                    size="small"
                                    region={course.title}
                                    distanceInfo="알 수 없음"
                                    imageUrl={course.image_url[0]}
                                    onClick={() => router.push("/travel/detail/" + course.id)}
                                />
                            ))}
                        </div>

                        {courseList.length > 3 && (
                            <div className="flex justify-center items-center mt-[16px] bg-[#F8F8F8] px-[20px] py-[12px] rounded-[12px]">
                                <button
                                    onClick={handleToggle}
                                    className="flex items-center gap-2 text-gray-600 text-sm font-medium"
                                >
                                    <span>{isExpanded ? "접기" : "더보기"}</span>
                                    <Image
                                        src="/icons/Chevron Down.svg"
                                        alt="chevron"
                                        className={`${isExpanded ? "rotate-180" : ""}`}
                                        width={12}
                                        height={12}
                                    />
                                </button>
                            </div>
                        )}
                    </> : <>
                        <div className="w-[1060px] h-[160px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-[12px] mt-[16px] p-[20px]">
                            <Text textStyle='body1' className="text-gray-500 mb-[8px] font-bold">
                                아직 저장된 여행 코스가 없어요.
                            </Text>
                            <Text textStyle='label1' className="text-gray-400 mb-[16px] font-bold">
                                나에게 꼭 맞는 여행지를 추천받고, 나만의 일정을 만들어보세요!
                            </Text>
                            <Button
                                variant='gradation'
                                className='text-white font-semibold text-[16px] leading-[24px] tracking-[0.091px] mx-auto'
                                onClick={() => router.push("/userinputs")}
                            >
                                지금 코스 만들러 가기 →
                            </Button>
                        </div>
                    </>
                    }


                </div>
            </section>
            <div className="min-h-[80px]"></div>
            <div className="w-full flex justify-start pt-10">
                <div className="flex items-center gap-2 cursor-pointer mb-5">
                    <button
                        className="text-sm text-gray-500 underline hover:text-gray-700"
                        onClick={handleUnlink}
                    >
                        서비스 탈퇴하기
                    </button>
                </div>
            </div>
        </div>
    );
}
