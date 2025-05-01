'use client';

import Card from "@/components/Card"
import Text from "@/components/Text"
import { useEffect, useRef } from "react";


const cards = Array(15).fill({
  size: "small",
  region: "경상북도 경주시 2박 코스",
  distanceInfo: "500km 거리",
});

export default function Main() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = mainRef.current;
    if (!slider || !container) return;

    const frame = () => {
      const containerCenter = container.clientWidth / 2;
      const children = Array.from(slider.children) as HTMLElement[];

      const distances = children.map((child) => {
        const rect = child.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        return {
          el: child,
          distance: Math.abs(containerCenter - cardCenter),
        };
      });

      const sorted = distances.sort((a, b) => a.distance - b.distance);

      children.forEach((child) => {
        child.classList.remove("opacity-100");
        child.classList.add("opacity-50");
      });

      sorted.slice(0, 3).forEach(({ el }) => {
        el.classList.remove("opacity-50");
        el.classList.add("opacity-100");
      });

      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, []);

  return (
    <div ref={mainRef} className="w-full">
      <main className="mt-[188] text-center">
        <Text as="h1" textStyle="display1">
          어디로 떠날지 고민 중이라면, <br />
          모먼티어가 도와드릴게요
        </Text>
        <Text as="p" textStyle="heading2" className="mt-5 font-semibold">
          복잡한 일정 없이, 몇 가지 정보만 알려주시면 추천은 저희가 알아서 해드려요.
        </Text>
      </main>

      <section className="relative group mt-[80]">
        <div
          ref={sliderRef}
          className="flex w-max gap-4 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="transition-transform duration-300 hover:scale-105"
            >
              <Card {...card} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 flex justify-center">
        <button className="flex px-5 py-[13] bg-[#FFE812] rounded-full cursor-pointer">
          <img src="/icons/kakao.png"></img>
          <Text textStyle="headline1" className="ml-2 font-semibold">
            카카오로 시작하기
          </Text>
        </button>
      </section>
    </div>
  )
}