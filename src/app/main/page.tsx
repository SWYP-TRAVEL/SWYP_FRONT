'use client';

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Text from "@/components/Text";

const cards = Array.from({ length: 15 }, (_, idx) => ({
  size: "small" as const,
  region: `경상북도 경주시 ${idx + 1}박 코스`,
  distanceInfo: "500km 거리",
}));

const openKakaoLoginPopup = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;

  const width = 500;
  const height = 600;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  window.open(
    url,
    "kakaoLogin",
    `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes`
  );
};

export default function Main() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const slider = sliderRef.current;
    const container = mainRef.current;
    if (!slider || !container) return;

    const updateOpacityByCenter = () => {
      const centerX = container.clientWidth / 2;
      const cards = Array.from(slider.children) as HTMLElement[];

      const cardDistances = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        return {
          el: card,
          distance: Math.abs(centerX - cardCenter),
        };
      });

      const topThree = cardDistances.sort((a, b) => a.distance - b.distance).slice(0, 3);

      cards.forEach(card => card.classList.replace("opacity-100", "opacity-50"));
      topThree.forEach(({ el }) => el.classList.replace("opacity-50", "opacity-100"));
    };

    const handleMessage = (event: MessageEvent) => {
      const { type, payload, error } = event.data || {};
      if (type === "KAKAO_LOGIN_SUCCESS") {
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
        router.push("/userinputs");
      } else if (type === "KAKAO_LOGIN_FAILURE") {
        alert("로그인 실패: " + error);
      }
    };

    window.addEventListener("message", handleMessage);
    const rafId = requestAnimationFrame(updateOpacityByCenter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return (
    <div ref={mainRef} className="w-full">
      <main className="mt-[188px] text-center">
        <Text as="h1" textStyle="display1" className="font-bold">
          어디로 떠날지 고민 중이라면, <br />
          모먼티어가 도와드릴게요
        </Text>
        <Text as="p" textStyle="heading2" className="mt-5 font-semibold">
          복잡한 일정 없이, 몇 가지 정보만 알려주시면 추천은 저희가 알아서 해드려요.
        </Text>
      </main>

      <section className="relative group mt-[80px]">
        <div
          ref={sliderRef}
          className="flex w-max gap-4 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="transition-transform duration-300 hover:scale-105 opacity-50"
            >
              <Card {...card} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 flex justify-center">
        <button
          className="flex px-5 py-[13px] bg-[#FFE812] rounded-full cursor-pointer"
          onClick={openKakaoLoginPopup}
        >
          <img src="/icons/kakao.png" alt="kakao" />
          <Text textStyle="headline1" className="ml-2 font-semibold">
            카카오로 시작하기
          </Text>
        </button>
      </section>
    </div>
  );
}
