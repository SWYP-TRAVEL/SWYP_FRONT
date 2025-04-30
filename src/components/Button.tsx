import { ElementType, ReactNode } from "react";
import clsx from "clsx";
import Text from "@/components/Text";

type ButtonVariant = "default" | "confirm" | "gradation" | "hover" | "press";
type TextStyle = Parameters<typeof Text>[0]["textStyle"];

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: ButtonVariant;
  textStyle?: TextStyle;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<T>;

const BUTTON_VARIANT_STYLES: Record<ButtonVariant, string> = {
  default: "min-w-[268px] h-[56px] rounded-[28px] px-6 py-4 gap-[10px] bg-[#9A77FF] hover:bg-[#7C49FF] active:bg-[#5F23EB] text-white",
  confirm: "min-w-[268px] h-[56px] rounded-[28px] px-6 py-4 gap-[10px] bg-black text-white",
  gradation: "min-w-[268px] h-[50px] rounded-[25px] px-6 py-4 gap-2 bg-[linear-gradient(125.9deg,_#9A77FF_23.39%,_#214BFF_104.52%)] text-white",
  hover: "min-w-[268px] h-[56px] rounded-[28px] px-6 py-4 gap-[10px] bg-[#7C49FF] text-white",
  press: "min-w-[268px] h-[56px] rounded-[28px] px-6 py-4 gap-[10px] bg-[#5F23EB] text-white",
};

const BUTTON_DISABLED_STYLE = "min-w-[268px] h-[56px] rounded-[28px] px-6 py-4 gap-[10px] bg-[#D9D9D9] text-white cursor-not-allowed";

export default function Button<T extends ElementType = "button">({
  as,
  variant = "default",
  textStyle = "label2",
  children,
  className = "",
  disabled = false,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";

  const wrapper = clsx(
    "inline-flex items-center justify-center transition-all",
    disabled ? BUTTON_DISABLED_STYLE : BUTTON_VARIANT_STYLES[variant],
    className
  );

  return (
    <Component
      className={wrapper}
      disabled={disabled}
      {...props}
    >
      <Text as="span" textStyle={textStyle}>
        {children}
      </Text>
    </Component>
  );
}
