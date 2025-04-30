import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "confirm", "gradation", "hover", "press"],
      description: "버튼 스타일 타입",
    },
    textStyle: {
      control: { type: "select" },
      options: [
        "display1", "display2", "title1", "title2", "title3",
        "heading1", "heading2", "headline1", "headline2",
        "body1", "body1Reading", "body2", "body2Reading",
        "label1", "label1Reading", "label2", "caption1", "caption2"
      ],
      description: "텍스트 스타일",
    },
    children: {
      control: "text",
      description: "버튼 내부 텍스트",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태 여부",
    }
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "default",
    textStyle: "label2",
    children: "기본 버튼",
  },
};

export const Confirm: Story = {
  args: {
    variant: "confirm",
    textStyle: "label2",
    children: "확인",
  },
};

export const Gradation: Story = {
  args: {
    variant: "gradation",
    textStyle: "label2",
    children: "시작하기",
  },
};

export const Hover: Story = {
  args: {
    variant: "hover",
    textStyle: "label2",
    children: "호버 버튼",
  },
};

export const Press: Story = {
  args: {
    variant: "press",
    textStyle: "label2",
    children: "프레스 버튼",
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    textStyle: "label2",
    children: "비활성 버튼",
    disabled: true,
  },
};
