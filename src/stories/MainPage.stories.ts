import MainPage from "@/components/pages/MainPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/MainPage",
  component: MainPage,
  parameters: {
    layout: "fullscreen", // 전체화면으로 페이지처럼 보여줌
  },
} satisfies Meta<typeof MainPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 메인페이지: Story = {};
