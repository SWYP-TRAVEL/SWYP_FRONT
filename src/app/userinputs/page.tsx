'use client';

import Text from '@/components/Text';
import ChipGroupSingle from '@/components/ChipGroupSingle';
import TextField from '@/components/TextField';
import { useState } from 'react';

const companions = [
  { label: '혼자', imageSrc: './icons/alone.png' },
  { label: '가족', imageSrc: './icons/family.png' },
  { label: '친구/지인', imageSrc: './icons/friend.png' },
  { label: '연인', imageSrc: './icons/couple.png' },
];

const durations = [
  { label: '당일치기' },
  { label: '1박 2일' },
  { label: '2박 3일' },
  { label: '3박 4일' },
  { label: '4박 5일' },
];

export default function UserInputs() {
  const [companion, setCompanion] = useState('');
  const [duration, setDuration] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <section className="max-w-[1100px] mx-auto px-[20px] mt-[60px]">
      <Text as="h1" textStyle="display2" className="mb-3 font-bold">
        여행 준비, 간단하고 쉽게 시작하세요!
      </Text>
      <Text as="p" textStyle="body1" className="t mb-10 text-semantic-label-alternative">
        모먼티어에게 몇 가지 정보를 알려주시면, 감정과 스타일에 딱 맞는 여행지를 추천해드릴게요.
      </Text>

      {/* 동행자 선택 */}
      <div className="mt-[60px]">
        <Text textStyle="title3" className="block mb-4 font-bold">
          누구와 함께 여행을 떠나시나요? <span className="text-[#9A77FF]">*</span>
        </Text>
        <ChipGroupSingle
          items={companions}
          value={companion}
          onChange={setCompanion}
        />
      </div>

      {/* 여행 기간 선택 */}
      <div className="mt-[60px]">
        <Text textStyle="title3" className="block mb-4 font-bold">
          며칠 동안 떠나고 싶으신가요? <span className="text-[#9A77FF]">*</span>
        </Text>
        <ChipGroupSingle
          items={durations}
          value={duration}
          onChange={setDuration}
        />
      </div>

      {/* 여행 스타일 입력 */}
      <div className="mt-[60px]">
        <Text textStyle="title3" className="block mb-4 font-bold">
          어떤 여행을 꿈꾸고 계신가요? <span className="text-[#9A77FF]">*</span>
        </Text>
        <TextField
          value={desc}
          onChange={setDesc}
          placeholder="요즘 지쳐서 조용하고 힐링되는 여행이었으면 좋겠어요, 자연 쪽으로 가고 싶어요 등"
          variant="outlined"
        />
        <div className="mt-2 text-sm text-gray-400 flex items-center">
          <img src='./icons/stars.svg' alt='추천을위한 별모양 아이콘' />
          <Text as='p' className='ml-2 text-semantic-label-alternative font-normal'>자세히 적어주시면 추천이 더 정확해져요!</Text>
        </div>
      </div>

      {/* 버튼 */}
      {/* TODO: 이미지 요소가 들어가는 버튼? */}
      <div className="mt-[60px]">
        <button className='flex justify-between w-[186px] text-[18px] text-semantic-static-white px-5 py-3 rounded-[25px] font-semibold bg-semantic-primary-normal'>
          다음
          <img src="./icons/Arrow Right White.svg" alt="오른쪽을 가리키는 화살표" />
        </button>
      </div>
    </section>
  );
}
