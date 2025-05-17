"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import FullScreenLoader from '@/components/FullScreenLoader';
import AlertModal from "@/components/modals/AlertModal";
import Text from "@/components/Text";
import { useModal } from '@/hooks/useModal';
import { createItinerary, getRecommendedDestinations, type RecommendResponse } from "@/lib/api/itinerary";
import { useAuthStore } from "@/store/useAuthStore";
import { useRecommendTravelDetailStore, useRecommendTravelListStore, useUserInputStore } from "@/store/useRecommendTravelStore";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TravelRecommendPage() {
  // 라우터 정의 영역
  const router = useRouter();

  // 스토어 정의 영역
  const travelData = useRecommendTravelListStore((state) => state.items);
  const userInputs = useUserInputStore((state) => state.inputs);
  const user = useAuthStore((state) => state.user);

  // 화면 내 상태 정의 영역
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState<RecommendResponse | null>(null);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (selectedTravel) {
      onConfirmCreateItinerary();
    }
  }, [selectedTravel]);

  // 카드 클릭 이벤트
  const onClickTravelCard = (data: RecommendResponse) => {
    setSelectedTravel(data);
  };

  // 카드 클릭 시 컨펌 모달 => 일정 생성하기 클릭 이벤트
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

  // 다른 추천 클릭 이벤트
  const onClickOtherItinerary = async () => {
    try {
      if (!userInputs) return;
      setIsLoading(true);
      const { requestCount, ...params } = userInputs;
      const result = await getRecommendedDestinations(params);
      useRecommendTravelListStore.getState().setItems(result);
      useUserInputStore.getState().setInputs({ ...params, requestCount: userInputs.requestCount + 1 });
    } catch (err: any) {
      setErrMessage(err.message);
      errModal.open();
    } finally {
      setIsLoading(false);
    }
  };

  // 서버응답 에러 모달
  const errModal = useModal(() => (
    <AlertModal
      title='정보를 불러오는데 실패했습니다!'
      description={errMessage}
      buttonText='확인'
      onClose={errModal.close}
    />
  ))

  // JSX 리턴
  return (
    <>
      <main className="flex flex-col items-center w-full max-w-[1100px] px-4 pt-[60px] pb-[60px] mx-auto gap-[84px]">
        {/* 페이지 헤더 */}
        <section className="flex flex-col items-start self-stretch gap-3">
          <Text as="h2" textStyle="display2" className="font-bold">
            떠나고 싶은 여행지를 선택해주세요!
          </Text>
          <Text as="p" textStyle="heading2" className="text-gray-500 font-bold">
            {user ? user.userName : ''}님의 선호도에 맞춘 여행지입니다. 원하는 여행지를 선택하시고 새로운 일정을 짜드릴게요!
          </Text>
        </section>

        {/* 3개의 추천 여행지 */}
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

        {/* 하단 버튼 영역 */}
        <div className="flex flex-col items-center gap-3">
          <Button
            disabled={userInputs ? userInputs.requestCount > 0 : true}
            variant="gradation"
            className="flex items-center justify-center w-[287px] h-[50px] px-5 gap-2"
            onClick={onClickOtherItinerary}
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
      {isLoading ? <FullScreenLoader /> : null}
    </>
  );
}
