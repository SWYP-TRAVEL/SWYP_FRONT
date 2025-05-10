import type { Meta, StoryObj } from "@storybook/react";
import DetailCard from "@/components/DetailCard";

const meta: Meta<typeof DetailCard> = {
  title: "Example/DetailCard",
  component: DetailCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DetailCard>;

const imageUrl =
  "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4";

export const Primary: Story = {
  args: {
    title: "서울특별시 강남구",
    subtitle: "예약 필수 / 한식",
    address: "서울특별시 강남구 테헤란로 427",
    hours: "09:00 - 22:00",
    rating: 4.5,
    imageUrl,
  },
};

export const WithConnector: Story = {
  args: {
    title: "서울특별시 강남구",
    subtitle: "예약 필수 / 한식",
    address: "서울특별시 강남구 테헤란로 427",
    hours: "09:00 - 22:00",
    rating: 4.5,
    imageUrl,
    travelWalkTime: "10분",
    travelCarTime: "10분",
    travelDistance: "900m",
  },
};
