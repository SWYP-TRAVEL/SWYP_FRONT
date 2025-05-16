import Text from "./Text";
import { ElementType } from "react";

const CARD_STYLES = {
  large:
    "w-[340px] h-[460px] p-6 rounded-[20px] border-4 border-transparent hover:border-[#9A77FF] text-white bg-cover bg-center transition-all",
  medium:
    "w-[280px] h-[360px] p-6 rounded-xl border-4 border-transparent hover:border-[#9A77FF] text-white bg-cover bg-center transition-all",
  small:
    "w-[300px] h-[120px] p-5 rounded-[12px] border-4 border-transparent text-white bg-cover bg-center transition-all",
};

const CARD_TEXT_STYLES: Record<keyof typeof CARD_STYLES, { region: TextStyle; info: TextStyle }> = {
  large: { region: "title2", info: "label2" },
  medium: { region: "title2", info: "label2" },
  small: { region: "heading2", info: "label2" },
};

type CardSize = keyof typeof CARD_STYLES;
type TextStyle = Parameters<typeof Text>[0]["textStyle"];

type CardProps = {
  imageUrl?: string;
  region: string;
  distanceInfo: string;
  regionTextStyle?: TextStyle;
  infoTextStyle?: TextStyle;
  size?: CardSize;
  as?: ElementType;
  onClick?: () => void;
};

export default function Card({
  imageUrl = "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4",
  region,
  distanceInfo,
  regionTextStyle,
  infoTextStyle,
  size = "large",
  onClick,
  as: Component = "div",
}: CardProps) {
  const resolvedRegionTextStyle = regionTextStyle ?? CARD_TEXT_STYLES[size].region;
  const resolvedInfoTextStyle = infoTextStyle ?? CARD_TEXT_STYLES[size].info;

  const textAlignClass = size === "small" ? "justify-start" : "justify-end";

  return (
    <Component
      className={`${CARD_STYLES[size]} relative overflow-hidden cursor-pointer flex flex-col`}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className={`relative z-10 flex flex-col ${textAlignClass} h-full gap-2`}>
        <div className="flex items-start gap-2 min-h-[76px]">
          <Text textStyle={resolvedRegionTextStyle} className="font-bold overflow-hidden text-ellipsis line-clamp-2 ">{region}</Text>
          <img
            src="/icons/link.svg"
            alt="icon"
            className="w-6 h-6 mt-[2px]"
          />
        </div>

        {size !== "small" && (
          <Text
            textStyle={resolvedInfoTextStyle}
            className="font-bold text-white font-pretendard text-[20px] font-semibold leading-[140%] tracking-[-0.24px] overflow-hidden text-ellipsis line-clamp-2"
          >
            {distanceInfo}
          </Text>
        )}
      </div>
    </Component >
  );
}
