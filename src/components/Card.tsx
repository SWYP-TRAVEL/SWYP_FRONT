import Text from "./Text";
import { ElementType } from "react";

const CARD_STYLES = {
  large:
    "w-[340px] h-[460px] p-6 rounded-[20px] border-4 border-transparent hover:border-[#9A77FF] text-white bg-cover bg-center flex flex-col justify-end transition-all",
  medium:
    "w-[280px] h-[360px] p-6 rounded-xl border-4 border-transparent hover:border-[#9A77FF] text-white bg-cover bg-center flex flex-col justify-end transition-all",
  small:
    "w-[300px] h-[120px] p-5 rounded-[12px] border-4 border-transparent hover:border-[#9A77FF] text-white bg-cover bg-center flex flex-col justify-end transition-all",
};


type CardSize = keyof typeof CARD_STYLES;

type CardProps = {
  imageUrl: string;
  region: string;
  distanceInfo: string;
  size?: CardSize;
  as?: ElementType;
};

export default function Card({
  imageUrl,
  region,
  distanceInfo,
  size = "large",
  as: Component = "div",
}: CardProps) {
  return (
    <Component className={`${CARD_STYLES[size]} relative overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col justify-end h-full gap-2">
        <Text textStyle="title2">{region}</Text>
        <Text textStyle="label2" className="flex items-center gap-1">
          {distanceInfo}
          <span aria-hidden>↗</span>
        </Text>
      </div>
    </Component>
  );
}
