import UserInput from "@/components/pages/UserInputPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/UserInput",
  component: UserInput,
  parameters: {
    layout: "fullscreen", // 전체화면으로 페이지처럼 보여줌
  },
} satisfies Meta<typeof UserInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 사용자정보입력페이지: Story = {};
