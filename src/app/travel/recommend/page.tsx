"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Text from "@/components/Text";
import { createItinerary, type RecommendResponse } from "@/lib/api/itinerary";
import { useRecommendTravelDetailStore, useRecommendTravelListStore, useUserInputStore } from "@/store/useRecommendTravelStore";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { useState, useEffect } from 'react';
import FullScreenLoader from '@/components/FullScreenLoader';
import ConfirmModal from "@/components/modals/ConfirmModal";
import UserInputSummary from "@/components/UserInputSummary";

export default function TravelRecommendPage() {
  const travelData = useRecommendTravelListStore((state) => state.items);
  const userInputs = useUserInputStore((state) => state.inputs);
  const router = useRouter();
  const [selectedTravel, setSelectedTravel] = useState<RecommendResponse | null>(null);

  const travelConfirmModal = useModal(() => {
    return (
      <ConfirmModal
        title="이 여행지를 선택하시겠어요?"
        description="맞는지 한 번 더 확인해주세요!"
        cancelText="다시 선택하기"
        onCancel={travelConfirmModal.close}
        confirmText="일정 생성하기"
        onConfirm={onConfirmCreateItinerary}
      >
        {selectedTravel ? (
          <UserInputSummary
            companion={userInputs?.travelWith || ''}
            period={`${userInputs?.duration || 1}박 ${(userInputs?.duration || 1) + 1}일`}
            inputText={userInputs?.description || ''}
          />
        ) : (
          <p>여행지 정보를 불러오는 중입니다...</p>
        )}
      </ConfirmModal>
    );
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedTravel) {
      travelConfirmModal.open();
    }
  }, [selectedTravel]);

  const onClickTravelCard = (data: RecommendResponse) => {
    setSelectedTravel(data);
  };

  const onConfirmCreateItinerary = async () => {
    try {
      setIsLoading(true);

      const params = {
        travelWith: userInputs?.travelWith || "",
        startDate: userInputs?.startDate || "",
        duration: userInputs?.duration || -1,
        description: userInputs?.description || "",
        theme: selectedTravel?.theme || '',
        latitude: selectedTravel?.latitude || 0,
        longitude: selectedTravel?.longitude || 0,
      };
      const result = await createItinerary(params);

      if (result) {
        useRecommendTravelDetailStore.getState().setItinerary(result);
        router.push("/travel/detail");
      }
    } catch (err) {
      console.error("일정 생성 중 오류 발생:", err);
    }
    setIsLoading(false);
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

      {isLoading ? <FullScreenLoader /> : null}
    </main>
  );
}
