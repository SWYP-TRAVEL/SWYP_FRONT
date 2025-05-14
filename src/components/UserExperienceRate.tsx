import { useState } from 'react';
import Image from 'next/image';
import TextField from './TextField';

interface UserExperienceRateProps {
  initRate?: number;
  initFeedback?: string;
  onChangeRate: (value: number) => void;
  onChangeFeedback: (value: string) => void;
}

export default function UserExperienceRate({
  initRate = 0,
  initFeedback = '',
  onChangeRate,
  onChangeFeedback
}: UserExperienceRateProps) {
  const [rating, setRating] = useState(initRate);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState(initFeedback);

  const handleClick = (index: number) => {
    setRating(index);
    onChangeRate(index);
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const onChangeTextField = (v: string) => {
    setFeedback(v);
    onChangeFeedback(v);
  };

  return (
    <>
      <div className="mt-[36px] flex gap-2 justify-center">
        {Array.from({ length: 5 }, (_, i) => {
          const index = i + 1;
          const isFilled = hoverRating ? index <= hoverRating : index <= rating;

          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="w-[60px] h-[60px]"
              type="button"
            >
              <Image
                src={isFilled ? '/icons/Star_Filled.svg' : '/icons/Star_Normal.svg'}
                alt={`${index}점`}
                width={60}
                height={60}
              />
            </button>
          );
        })}
      </div>

      <div className="my-[36px]">
        <TextField
          placeholder="편했던 점, 아쉬웠던 점을 자유롭게 적어주세요."
          value={feedback}
          onChange={onChangeTextField}
        />
      </div>
    </>
  );
}