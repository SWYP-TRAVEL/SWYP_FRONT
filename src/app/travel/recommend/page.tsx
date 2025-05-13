"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Text from "@/components/Text";
import { createItinerary, type RecommendResponse } from "@/lib/api/itinerary";
import { useRecommendTravelListStore, useUserInputStore } from "@/store/useRecommendTravelStore";
import Image from "next/image";

export default function TravelRecommendPage() {
  const travelData = useRecommendTravelListStore((state) => state.items);
  const userInputs = useUserInputStore((state) => state.inputs);

  const onClickTravelCard = async (data: RecommendResponse) => {
    try {
      const params = {
        travelWith: userInputs?.travelWith || '',
        startDate: userInputs?.startDate || '',
        duration: userInputs?.duration || -1,
        description: userInputs?.description || '',
        theme: data.theme,
        latitude: data.latitude,
        longitude: data.longitude,
      };
      const result = await createItinerary(params);
      console.log('사용자 입력 바탕으로 여행 일정 생성 ::: ', result);
    } catch (err) {
      //
    }
  };

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
        {travelData.map((data) => (
          <Card
            key={data.address}
            region={data.name}
            distanceInfo={data.theme}
            imageUrl={data.imageUrl}
            size="large"
            onClick={() => onClickTravelCard(data)}
          />
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
