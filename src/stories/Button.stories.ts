import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["normal", "gradation", "purple"],
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
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  args: {
    type: "normal",
    children: "기본 버튼",
  },
};

export const Gradation: Story = {
  args: {
    type: "gradation",
    children: "시작하기",
  },
};

export const Purple: Story = {
  args: {
    type: "purple",
    children: "확인",
  },
};
