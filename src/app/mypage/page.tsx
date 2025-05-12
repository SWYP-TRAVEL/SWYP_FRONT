"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Text from "@/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { saveUserExperience, getUserItineraries, Itinerary } from "@/lib/api/user";
import { unlinkKakaoAccount } from "@/lib/api/auth";

export default function MyPage() {
    const [courseList, setCourseList] = useState<Itinerary[]>([]);
    const [experience, setExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

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

    const handleExperienceSubmit = async () => {
        if (experience.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await saveUserExperience(experience);
            alert("경험이 성공적으로 제출되었습니다!");
            setExperience("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUnlink = async () => {
        if (!confirm("정말로 카카오 계정을 탈퇴하시겠습니까?")) return;

        try {
            await unlinkKakaoAccount();
            alert("카카오 계정이 성공적으로 탈퇴되었습니다.");
            logout();
            router.push("/");
        } catch (err: any) {
            alert("계정 탈퇴에 실패하였습니다.");
        }
    };

    return (
        <div className="w-full max-w-[1100px] mx-auto px-4 pt-[60px] pb-[60px] space-y-[84px]">
            <div className="flex items-center gap-2 mb-8">
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
                        {courseList.map((course) => (
                            <Card
                                key={course.id}
                                size="small"
                                region={course.title}
                                distanceInfo="알 수 없음"
                                imageUrl={course.image_url[0]}
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
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full h-[160px] border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#9A77FF]"
                        placeholder="편했던 점, 아쉬웠던 점을 자유롭게 적어주세요."
                    />
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="flex justify-end">
                        <Button
                            variant="default"
                            textStyle="label1"
                            className="font-bold"
                            onClick={handleExperienceSubmit}
                            disabled={loading}
                        >
                            {loading ? "제출 중..." : "제출하기"}
                        </Button>
                    </div>
                </div>
            </section>

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
