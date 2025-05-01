import { ElementType, ReactNode } from "react";

const TEXT_STYLES = {
  display1: "text-[56px] leading-[72px] tracking-[-0.0316em]",
  display2: "text-[40px] leading-[52px] tracking-[-0.0282em]",
  title1: "text-[36px] leading-[48px] tracking-[-0.0272em]",
  title2: "text-[28px] leading-[38px] tracking-[-0.0236em]",
  title3: "text-[24px] leading-[32px] tracking-[-0.0232em]",
  heading1: "text-[22px] leading-[30px] tracking-[-0.0176em]",
  heading2: "text-[20px] leading-[28px] tracking-[-0.012em]",
  headline1: "text-[18px] leading-[26px] tracking-[-0.002em]",
  headline2: "text-[17px] leading-[24px] tracking-[0em]",
  body1: "text-[16px] leading-[24px] tracking-[0.0057em]",
  body1Reading: "text-[16px] leading-[28px] tracking-[0.0057em]",
  body2: "text-[15px] leading-[22px] tracking-[0.0069em]",
  body2Reading: "text-[15px] leading-[26px] tracking-[0.0069em]",
  label1: "text-[14px] leading-[20px] tracking-[0.0145em]",
  label1Reading: "text-[14px] leading-[22px] tracking-[0.0145em]",
  label2: "text-[12px] leading-[18px] tracking-[0.0156em]",
  caption1: "text-[12px] leading-[16px] tracking-[0.0137em]",
  caption2: "text-[10px] leading-[14px] tracking-[0.0137em]",
};

type TextStyle = keyof typeof TEXT_STYLES;

type TextProps<T extends ElementType = "span"> = {
  as?: T;
  textStyle?: TextStyle;
  className?: string;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export default function Text<T extends ElementType = "span">({
  as,
  textStyle = "body1",
  className = "",
  children,
  ...props
}: TextProps<T>) {
  const Component = as || "span";

  return (
    <Component
      className={`${TEXT_STYLES[textStyle] || ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
