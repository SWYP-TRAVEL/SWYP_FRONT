"use client";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Image from "next/image";

const travelData = [
  {
    region: "경상북도 경주시",
    distanceInfo: "내 위치로부터 3시간 소요",
  },
  {
    region: "강원도 강릉시",
    distanceInfo: "내 위치로부터 3시간 소요",
  },
  {
    region: "제주특별시",
    distanceInfo: "내 위치로부터 2시간 소요",
  },
];

export default function TravelRecommendPage() {
  return (
    <main className="flex flex-col items-center w-full max-w-[1100px] px-4 pt-[60px] pb-[60px] mx-auto gap-[84px]">
      <section className="flex flex-col items-start self-stretch gap-3">
        <Text as="h2" textStyle="display2" className="font-bold">
          떠나고 싶은 여행지를 선택해주세요!
        </Text>
        <Text as="p" textStyle="heading2" className="text-gray-500 font-bold">
          유정님의 선호도에 맞춘 여행지입니다. 원하는 여행지를 선택하시고 새로운 일정을 짜드릴게요!
        </Text>
      </section>

      <section className="flex flex-row gap-6">
        {travelData.map(({ region, distanceInfo }) => (
          <Card key={region} region={region} distanceInfo={distanceInfo} size="large" />
        ))}
      </section>

      <div className="flex flex-col items-center gap-3">
        <Button
          variant="gradation"
          className="flex items-center justify-center w-[287px] h-[50px] px-5 gap-2"
        >
          <Image src="/icons/Refresh.svg" alt="icon" width={24} height={24} />
          <Text
            as="span"
            className="text-white font-[600] text-[16px] leading-[26.1px] tracking-[-0.0002em] font-['Pretendard_JP']"
          >
            다른 여행지를 추천받고 싶어요
          </Text>

        </Button>

        <Text textStyle="caption1" className="text-gray-400">
          다른 추천은 1회만 가능해요!
        </Text>
      </div>
    </main>
  );
}
