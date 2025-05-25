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
   * feelingDescription : 유저입력 여행스타일 - 기분
   * isButtonDisabled : [다음] 버튼의 비활성화 여부
   */
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [companion, setCompanion] = useState('');
  const [duration, setDuration] = useState('');
  // 여행지 추천 텍스트
  const [feelingDescription, setFeelingDescription] = useState('');
  const [atmosphereDescription, setAtmosphereDescription] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const isButtonDisabled = useMemo(() => {
    if (companion === '') return true;
    if (duration === '') return true;
    return false;
  }, [companion, duration]);
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
        description: feelingDescription,
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
      const params = {
        feeling: feelingDescription,
        atmosphere: atmosphereDescription,
        activities: activityDescription,
      }
      setFeelingDescription('');
      setAtmosphereDescription('');
      setActivityDescription('');
      const result = await getRecommendText(params);
      setFeelingDescription(result.feeling);
      setAtmosphereDescription(result.atmosphere);
      setActivityDescription(result.activities);
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
          inputText={feelingDescription}
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
            여행을 떠나고 싶은 이유가 있나요?
          </Text>
          {/* <Text textStyle='body1' className='block mb-4 text-semantic-label-alternative'>마음 상태나 원하는 여행 분위기, 스타일 등을 자유롭게 적어주세요!</Text> */}
          <div className="relative">
            <TextField
              disabled={isTextLoading}
              value={feelingDescription}
              onChange={setFeelingDescription}
              placeholder={!isTextLoading ? "요즘 너무 지쳐있어요, 새로운 기분 전환이 필요해요 등" : ""}
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
        </div>
        <div className="mt-[28px]">
          <Text textStyle="title3" className="block mb-2 font-bold">
            어떤 분위기의 여행지를 원하시나요?
          </Text>
          <div className="relative">
            <TextField
              disabled={isTextLoading}
              value={atmosphereDescription}
              onChange={setAtmosphereDescription}
              placeholder={!isTextLoading ? "자연 속 조용한 곳, 북적이는 도시 분위기 등" : ""}
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
        </div>
        <div className="mt-[28px]">
          <Text textStyle="title3" className="block mb-2 font-bold">
            이번 여행에서 꼭 해보고 싶은 게 있다면요?
          </Text>
          <div className="relative">
            <TextField
              disabled={isTextLoading}
              value={activityDescription}
              onChange={setActivityDescription}
              placeholder={!isTextLoading ? "푹 쉬기, 신나는 액티비티, 다양한 맛집 투어 등" : ""}
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

        {/* 버튼 */}
        <div className="my-[60px]">
          <button
            disabled={isButtonDisabled}
            className={`
            relative overflow-hidden bg-[linear-gradient(125.9deg,_#9A77FF_23.39%,_#214BFF_104.52%)]
            hover:text-white transition-colors
            before:absolute before:inset-0 before:z-0
            before:opacity-0 hover:before:opacity-100
            before:bg-[linear-gradient(125.9deg,_#9A77FF_23.39%,_#4D6FFF_104.52%)]
            before:transition-opacity
            after:absolute after:inset-0 after:z-0
            after:bg-black after:opacity-0 hover:after:opacity-20
            after:transition-opacity
              w-[186px] text-[18px] px-5 py-3 rounded-[25px] font-semibold text-semantic-static-white 
              ${isButtonDisabled ? 'bg-[#D9D9D9] cursor-not-allowed' : 'bg-semantic-primary-normal hover:bg-[#7C49FF]'}`}
            onClick={onClickNext}
          >
            <Text textStyle='body1' className='relative z-10 flex justify-between'>
              다음
              <img src="./icons/Arrow Right White.svg" alt="오른쪽을 가리키는 화살표" />
            </Text>
          </button>
        </div>
      </section>
    </>
  );
}
