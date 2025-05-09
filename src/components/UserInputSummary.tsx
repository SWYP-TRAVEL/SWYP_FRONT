import Text from "./Text";

interface IUserInputSummary {
  companion: string;
  period: string;
  inputText: string;
}

export default function UserInputSummary({
  companion,
  period,
  inputText
}: IUserInputSummary) {
  return (
    <div className="p-5 bg-component-fill-alternative rounded-xl space-y-3">
      <div>
        <Text textStyle="label1" as="strong" className="mr-[12px] font-semibold">
          여행 인원
        </Text>
        <Text textStyle="label1" className="text-semantic-primary-strong font-medium">{companion}</Text>
      </div>
      <div>
        <Text textStyle="label1" as="strong" className="mr-[12px] font-semibold">
          여행 기간
        </Text>
        <Text textStyle="label1" className="text-semantic-primary-strong font-medium">{period}</Text>
      </div>
      <Text textStyle="label1" as="strong" className="mb-2 font-semibold inline-block">
        여행 스타일
      </Text>
      <Text textStyle="label1" as="p" className="bg-semantic-static-white rounded-[12px] px-4 py-3 text-[#404040] break-words">{inputText}</Text>
    </div>
  );
}
