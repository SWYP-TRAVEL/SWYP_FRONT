import type { Meta, StoryObj } from "@storybook/react";
import DayScheduleCard from "@/components/ScheduleCard";
import { Attraction } from "@/lib/api/itinerary";

const meta: Meta<typeof DayScheduleCard> = {
    title: "Example/DayScheduleCard",
    component: DayScheduleCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DayScheduleCard>;

/**
 * ✅ Attraction 타입에 맞춘 데이터 생성
 */
const attractionsData: Attraction[] = [
    {
        id: 1,
        type: "meal",
        name: "강릉짬뽕순두부 동화가든 본점",
        address: "강원 강릉시 강동면 순두부길 77번길 15 동화가든",
        description: "두부요리 / 예약필수",
        coverImage: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4",
        businessTime: "매일 07:00 ~ 19:30",
        rating: 4.68,
        latitude: 37.751853,
        longitude: 128.896651,
        travelWalkTime: "10분",
        travelCarTime: "5분",
        travelDistance: "1.2km",
    },
    {
        id: 2,
        type: "place",
        name: "오죽헌",
        address: "강원 강릉시 율곡로3139번길 24 오죽헌",
        description: "입장료 있음 / 운영시간 1시간 전 입장 마감",
        coverImage: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=2df9d7f5-bd90-41e5-a59b-334a13f85d7e",
        businessTime: "09:00 ~ 18:00",
        rating: 4.68,
        latitude: 37.763283,
        longitude: 128.896995,
        travelWalkTime: "15분",
        travelCarTime: "5분",
        travelDistance: "1.2km",
    },
    {
        id: 3,
        type: "place",
        name: "경포해변",
        address: "강원 강릉시 강문동 산1",
        description: "강릉시에 있는 동해안 최대의 해변",
        coverImage: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=8ef7b330-fbb0-44c7-94a4-85b2729ff251",
        businessTime: "00:00 ~ 24:00 상시이용 가능",
        rating: 4.41,
        latitude: 37.803517,
        longitude: 128.924605,
        travelWalkTime: "20분",
        travelCarTime: "10분",
        travelDistance: "3.5km",
    },
];

export const Primary: Story = {
    args: {
        dailySchedule: {
            dayDate: 3,
            attractions: attractionsData,
        },
    },
};

export const EmptyPlaces: Story = {
    args: {
        dailySchedule: {
            dayDate: 2,
            attractions: [],
        },
    },
};

export const SinglePlace: Story = {
    args: {
        dailySchedule: {
            dayDate: 1,
            attractions: [attractionsData[0]],
        },
    },
};
