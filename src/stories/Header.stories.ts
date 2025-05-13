import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Header from "@/components/Header";
import { User } from "@/store/useAuthStore";
const mockUser: User = {
  userName: 'Jane Doe',
  accessToken: 'dummy-access-token',
  profileImage: '/icons/Avatar.svg', // or 다른 이미지 URL
};
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
    user: mockUser,
  },
};

export const CASE_비로그인: Story = {
  args: {
    user: null,
  },
};
