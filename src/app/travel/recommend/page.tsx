"use client";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";

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
    <main className="flex flex-col items-center w-full max-w-[1060px] mx-auto pt-[60px] gap-[84px]">
      {/* 타이틀 영역 */}
      <section className="flex flex-col items-start gap-3 self-stretch">
      <Text as="h2" textStyle="display2">
          떠나고 싶은 여행지를 선택해주세요!
        </Text>
        <Text as="p" textStyle="heading2" className="text-gray-500">
          유정님의 선호도에 맞춘 여행지입니다. 원하는 여행지를 선택하시고 새로운 일정을 짜드릴게요!
        </Text>
      </section>

      {/* 카드 리스트 */}
      <section className="flex flex-row gap-6">
        {travelData.map((data) => (
          <Card
            key={data.region}
            region={data.region}
            distanceInfo={data.distanceInfo}
            size="large"
          />
        ))}
      </section>

      {/* 버튼 */}
      <Button variant="default" textStyle="label2">
      다른 여행지를 추천받고 싶어요
      </Button>

      {/* 하단 설명 */}
      <Text textStyle="caption1" className="text-gray-400">
        여행지를 선택하면 기존 일정이 초기화돼요
      </Text>
    </main>
  );
}