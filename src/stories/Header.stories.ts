import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Header from "@/components/Header";

const meta = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onClickLogo: fn(),
    onClickProfile: fn(),
  },
  argTypes: {
    user: {
      description: "로그인한 유저 정보",
      table: {
        type: { summary: "Kakao 로그인 정보" },
      },
    },
    onClickLogo: {
      description: "로고 클릭 CTA",
    },
    onClickProfile: {
      description: "프로필 클릭 CTA",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CASE_로그인: Story = {
  args: {
    user: {
      username: "모멘티어",
      // imgPath: "/icons/Avatar.svg", // TODO: kakao 로그인 시 유저프로필 이미지 주는지 검토
    },
  },
};

export const CASE_비로그인: Story = {
  args: {
    user: null,
  },
};
