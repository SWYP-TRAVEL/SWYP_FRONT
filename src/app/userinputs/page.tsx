'use client';

import Text from '@/components/Text';
import ChipGroupSingle from '@/components/ChipGroupSingle';
import TextField from '@/components/TextField';
import { useMemo, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import UserInputSummary from "@/components/UserInputSummary";
import FullScreenLoader from '@/components/FullScreenLoader';

const COMPANIONS = [
  { label: "혼자", imageSrc: "/icons/alone.png" },
  { label: "가족", imageSrc: "/icons/family.png" },
  { label: "친구/지인", imageSrc: "/icons/friend.png" },
  { label: "연인", imageSrc: "/icons/couple.png" },
];

const DURATIONS = [
  { label: "당일치기" },
  { label: "1박 2일" },
  { label: "2박 3일" },
  { label: "3박 4일" },
  { label: "4박 5일" },
];

export default function UserInputs() {
  /**
   * 상태 선언
   * companion : 유저입력 동행자타입
   * duration : 유저입력 여행기간
   * travelDescription : 유저입력 여행스타일
   * isButtonDisabled : [다음] 버튼의 비활성화 여부
   */
  const [isLoading, setIsLoading] = useState(false);
  const [companion, setCompanion] = useState('');
  const [duration, setDuration] = useState('');
  const [travelDescription, setTravelDesc] = useState('');
  const isButtonDisabled = useMemo(() => {
    if (companion === '') return true;
    if (duration === '') return true;
    if (travelDescription === '') return true;
    return false;
  }, [companion, duration, travelDescription]);

  /**
   * 함수 선언
   */


  /**
   * 이벤트 선언
   * onClickNext : [다음] 클릭 이벤트
   * onClickContinueRecommend : 컨펌 모달 [계속 추천받기] 클릭 이벤트
   * onClickAutoFillInput : [잘 모르겠어요] 클릭 이벤트 
   */
  const onClickNext = () => {
    confirmRecommendModal.open();
  };

  const onClickContinueRecommend = () => {
    confirmRecommendModal.close();
    // TODO: api call
    const params = {};
    console.log('api call with', params);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('테스트용입니다. 실제 프로덕트 레벨에서는 화면이동 합니다.');
    }, 2000);
  };

  const onClickAutoFillInput = async () => {
    // TODO: api call
  };

  // 여행지추천 컨펌 모달
  const confirmRecommendModal = useModal(() => (
    <ConfirmModal
      title="이 정보로 여행지를 추천해드릴게요"
      description="맞는지 한 번 더 확인해주세요!"
      cancelText="다시 입력하기"
      onCancel={confirmRecommendModal.close}
      confirmText="계속 추천받기"
      onConfirm={onClickContinueRecommend}
    >
      <UserInputSummary
        companion={companion}
        period={duration}
        inputText={travelDescription}
      />
    </ConfirmModal>
  ));

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
          <Text textStyle="title3" className="block mb-4 font-bold">
            어떤 여행을 꿈꾸고 계신가요? <span className="text-semantic-primary-normal">*</span>
          </Text>
          <TextField
            value={travelDescription}
            onChange={setTravelDesc}
            placeholder="요즘 지쳐서 조용하고 힐링되는 여행이었으면 좋겠어요, 자연 쪽으로 가고 싶어요 등"
            variant="outlined"
          />
          <div className="mt-2">
            <button
              className='flex items-center px-4 py-2 text-semantic-label-alternative border border-semantic-line-normalneutral rounded-[20px] bg-component-fill-alternative hover:bg-[#9A77FF1A] hover:border-[#9A77FF1A] active:text-semantic-primary-normal active:ring-2 active:ring-semantic-primary-normal ring-offset-0'
              onClick={onClickAutoFillInput}
            >
              <img src='./icons/stars.svg' alt='추천을위한 별모양 아이콘' />
              <Text as='p' className='ml-2 font-normal'>잘 모르겠어요. 추천해주세요!</Text>
            </button>

          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-[60px]">
          {/* TODO: 이미지 요소가 들어가는 버튼 => Button component에 녹일 수 있는지? */}
          <button
            disabled={isButtonDisabled}
            className={`flex justify-between w-[186px] text-[18px] px-5 py-3 rounded-[25px] font-semibold text-semantic-static-white 
              ${isButtonDisabled ? 'bg-[#D9D9D9] cursor-not-allowed' : 'bg-semantic-primary-normal'}`}
            onClick={onClickNext}
          >
            다음
            <img src="./icons/Arrow Right White.svg" alt="오른쪽을 가리키는 화살표" />
          </button>
        </div>
      </section>
      {isLoading ? <FullScreenLoader /> : null}
    </>
  );
}
