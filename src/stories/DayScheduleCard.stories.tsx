import type { Meta, StoryObj } from "@storybook/react";
import DayScheduleCard from "@/components/DayScheduleCard";

const meta: Meta<typeof DayScheduleCard> = {
    title: "Example/DayScheduleCard",
    component: DayScheduleCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DayScheduleCard>;

const placesData = [
    {
        title: "강릉짬뽕순두부 동화가든 본점",
        subtitle: "두부요리 / 예약필수",
        address: "강원 강릉시 강동면 순두부길 77번길 15 동화가든",
        hours: "매일 07:00 ~ 19:30",
        rating: 4.68,
        imageUrl: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4",
        travelWalkTime: "10분",
        travelCarTime: "5분",
        travelDistance: "1.2km",
    },
    {
        title: "오죽헌",
        subtitle: "입장료 있음 / 운영시간 1시간 전 입장 마감",
        address: "강원 강릉시 율곡로3139번길 24 오죽헌",
        hours: "09:00 ~ 18:00",
        rating: 4.68,
        imageUrl: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=2df9d7f5-bd90-41e5-a59b-334a13f85d7e",
        travelWalkTime: "15분",
        travelCarTime: "5분",
        travelDistance: "1.2km",
    },
    {
        title: "경포해변",
        subtitle: "강릉시에 있는 동해안 최대의 해변",
        address: "강원 강릉시 강문동 산1",
        hours: "00:00 ~ 24:00 상시이용 가능",
        rating: 4.41,
        imageUrl: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=8ef7b330-fbb0-44c7-94a4-85b2729ff251",
    },
];

export const Primary: Story = {
    args: {
        dayNumber: 1,
        places: placesData,
    },
};

export const EmptyPlaces: Story = {
    args: {
        dayNumber: 2,
        places: [],
    },
};

export const SinglePlace: Story = {
    args: {
        dayNumber: 1,
        places: [
            {
                title: "강릉짬뽕순두부 동화가든 본점",
                subtitle: "두부요리 / 예약필수",
                address: "강원 강릉시 강동면 순두부길 77번길 15 동화가든",
                hours: "매일 07:00 ~ 19:30",
                rating: 4.68,
                imageUrl: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4",
            },
        ],
    },
};
