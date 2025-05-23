'use client';

import ChipGroupSingle from '@/components/ChipGroupSingle';
import AlertModal from '@/components/modals/AlertModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import Text from '@/components/Text';
import TextField from '@/components/TextField';
import UserInputSummary from "@/components/UserInputSummary";
import { COMPANIONS, DURATIONS } from '@/constants/UserInputConstants';
import { useModal } from '@/hooks/useModal';
import { getRecommendedDestinations, getRecommendText } from '@/lib/api/itinerary';
import { useRecommendTravelListStore, useUserInputStore } from '@/store/useRecommendTravelStore';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function UserInputs() {
  const router = useRouter();
  /**
   * 상태 선언
   * isTextLoading : 텍스트 추천 로딩 상태 값
   * companion : 유저입력 동행자타입
   * duration : 유저입력 여행기간
   * travelDescription : 유저입력 여행스타일
   * isButtonDisabled : [다음] 버튼의 비활성화 여부
   */
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [companion, setCompanion] = useState('');
  const [duration, setDuration] = useState('');
  const [travelDescription, setTravelDescription] = useState('');
  const isButtonDisabled = useMemo(() => {
    if (companion === '') return true;
    if (duration === '') return true;
    if (travelDescription === '') return true;
    return false;
  }, [companion, duration, travelDescription]);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    return () => {
      confirmRecommendModal.close();
    }
  }, [])

  /**
   * 함수 선언
   * handleTravelRecommend : 여행지 리스트 추천 api call 및 데이터 후처리
   */
  const handleTravelRecommend = async () => {
    try {
      const today = new Date();

      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // 0-based
      const dd = String(today.getDate()).padStart(2, '0');

      const formattedToday = `${yyyy}-${mm}-${dd}`;

      const params = {
        travelWith: companion,
        description: travelDescription,
        duration: Number(duration),
        startDate: formattedToday,
        // 아래는 추가된 항목
        theme: '',
        latitude: 0,
        longitude: 0
      };
      const result = await getRecommendedDestinations(params);
      // store 저장
      useRecommendTravelListStore.getState().setItems(result);
      useUserInputStore.getState().setInputs({ ...params, requestCount: 0 });

      return true;
    } catch (err: any) {
      setErrMessage(err.message);
      errModal.open();
      return false;
    }
  };


  /**
   * 이벤트 선언
   * onClickNext : [다음] 클릭 이벤트
   * onClickContinueRecommend : 컨펌 모달 [계속 추천받기] 클릭 이벤트
   * onClickAutoFillInput : [잘 모르겠어요] 클릭 이벤트 
   */
  const onClickNext = () => {
    confirmRecommendModal.open();
  };

  const onClickContinueRecommend = async () => {
    confirmRecommendModal.close();
    const isValid = await handleTravelRecommend();

    if (!isValid) return;

    router.push('/travel/recommend');
  };

  const onClickAutoFillInput = async () => {
    try {
      setIsTextLoading(true);
      setTravelDescription('');
      const result = await getRecommendText(travelDescription);
      setTravelDescription(result);
    } catch (err: any) {
      setErrMessage(err.message);
      errModal.open();
    } finally {
      setIsTextLoading(false);
    }
  };

  /**
   * confirmRecommendModal : 여행지추천 컨펌 모달
   * errModal : 각종 서버 에러 모달
   */
  const confirmRecommendModal = useModal(() => {
    const companionText = COMPANIONS.find(item => item.value === companion)?.label || '';
    const durationText = DURATIONS.find(item => item.value === duration)?.label || '';
    return (
      <ConfirmModal
        title="이 정보로 여행지를 추천해드릴게요"
        description="맞는지 한 번 더 확인해주세요!"
        cancelText="다시 입력하기"
        onCancel={confirmRecommendModal.close}
        confirmText="계속 추천받기"
        onConfirm={onClickContinueRecommend}
      >
        <UserInputSummary
          companion={companionText}
          period={durationText}
          inputText={travelDescription}
        />
      </ConfirmModal>
    )
  });

  const errModal = useModal(() => (
    <AlertModal
      title='정보를 불러오는데 실패했습니다!'
      description={errMessage}
      buttonText='확인'
      onClose={errModal.close}
    />
  ))

  /**
   * JSX 리턴(섹션별 설명 기재 요망)
   */
  return (
    <>
      <section className="max-w-[1100px] mx-auto px-[20px] mt-[60px]">
        {/* 페이지 설명 */}
        <Text as="h1" textStyle="display2" className="mb-3 font-bold">
          여행 준비, 간단하고 쉽게 시작하세요!
        </Text>
        <Text as="p" textStyle="body1" className="t mb-10 text-semantic-label-alternative">
          모먼티어에게 몇 가지 정보를 알려주시면, 감정과 스타일에 딱 맞는 여행지를 추천해드릴게요.
        </Text>

        {/* 동행자 선택 */}
        <div className="mt-[60px]">
          <Text textStyle="title3" className="block mb-4 font-bold">
            누구와 함께 여행을 떠나시나요? <span className="text-semantic-primary-normal">*</span>
          </Text>
          <ChipGroupSingle
            items={COMPANIONS}
            value={companion}
            onChange={setCompanion}
          />
        </div>

        {/* 여행 기간 선택 */}
        <div className="mt-[60px]">
          <Text textStyle="title3" className="block mb-4 font-bold">
            며칠 동안 떠나고 싶으신가요? <span className="text-semantic-primary-normal">*</span>
          </Text>
          <ChipGroupSingle
            items={DURATIONS}
            value={duration}
            onChange={setDuration}
          />
        </div>

        {/* 여행 스타일 입력 */}
        <div className="mt-[60px]">
          <Text textStyle="title3" className="block mb-2 font-bold">
            어떤 여행을 꿈꾸고 계신가요? <span className="text-semantic-primary-normal">*</span>
          </Text>
          <Text textStyle='body1' className='block mb-4 text-semantic-label-alternative'>
            마음 상태나 원하는 여행 분위기, 스타일 등을 자유롭게 적어주세요!
          </Text>
          <div className="relative">
            <TextField
              disabled={isTextLoading}
              value={travelDescription}
              onChange={setTravelDescription}
              placeholder={!isTextLoading ? "요즘 지쳐서 조용하고 힐링되는 여행이었으면 좋겠어요, 자연 쪽으로 가고 싶어요 등" : ""}
              variant="outlined"
            />
            {isTextLoading && (
              <div className="absolute left-4 top-7 -translate-y-1/2 text-sm text-gray-500 flex">
                {"문구를 생성중이에요 ...".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block animate-bounce-char"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2">
            <button
              className='flex items-center px-4 py-2 text-semantic-label-alternative border border-semantic-line-normalneutral rounded-[20px] bg-component-fill-alternative hover:bg-[#9A77FF1A] hover:border-[#9A77FF1A] active:text-semantic-primary-normal active:ring-2 active:ring-semantic-primary-normal ring-offset-0'
              onClick={onClickAutoFillInput}
              disabled={isTextLoading}
            >
              <img src='./icons/AI.svg' alt='추천을위한 별모양 아이콘' />
              <Text as='p' className='ml-2 font-normal'>잘 모르겠어요. 추천해주세요!</Text>
            </button>
          </div>
        </div>

        {/* 버튼 */}
        <div className="my-[60px]">
          {/* TODO: 이미지 요소가 들어가는 버튼 => Button component에 녹일 수 있는지? */}
          <button
            disabled={isButtonDisabled}
            className={`flex justify-between w-[186px] text-[18px] px-5 py-3 rounded-[25px] font-semibold text-semantic-static-white 
              ${isButtonDisabled ? 'bg-[#D9D9D9] cursor-not-allowed' : 'bg-semantic-primary-normal hover:bg-[#7C49FF]'}`}
            onClick={onClickNext}
          >
            다음
            <img src="./icons/Arrow Right White.svg" alt="오른쪽을 가리키는 화살표" />
          </button>
        </div>
      </section>
    </>
  );
}
