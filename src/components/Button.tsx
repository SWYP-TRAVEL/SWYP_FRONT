import { ElementType, ReactNode } from "react";
import Text from "@/components/Text";

type ButtonType = "normal" | "gradation" | "purple";
type TextStyle = Parameters<typeof Text>[0]["textStyle"];

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  type?: ButtonType;
  textStyle?: TextStyle;
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const BUTTON_TYPE_STYLES: Record<ButtonType, string> = {
  normal:
    "min-w-[268px] h-[56px] rounded-[28px] px-6 py-4 gap-[10px] bg-[#000000] text-white",
  gradation:
    "min-w-[268px] h-[50px] rounded-[25px] px-6 py-4 gap-2 bg-[linear-gradient(125.9deg,_#9A77FF_23.39%,_#214BFF_104.52%)] text-white",
  purple:
    "min-w-[268px] h-[56px] rounded-[28px] px-6 py-4 gap-[10px] bg-[#9A77FF] text-white",
};

export default function Button<T extends ElementType = "button">({
  as,
  type = "normal",
  textStyle = "heading1",
  children,
  className = "",
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  const wrapper = BUTTON_TYPE_STYLES[type];

  return (
    <Component
      className={`inline-flex items-center justify-center transition-all ${wrapper} ${className}`}
      {...props}
    >
      <Text as="span" textStyle={textStyle}>
        {children}
      </Text>
    </Component>
  );
}
