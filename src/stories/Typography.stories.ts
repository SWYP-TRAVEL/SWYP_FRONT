import type { Meta, StoryObj } from "@storybook/react";
import Text from "@/components/Text";

const meta = {
  title: "Foundations/Typography",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      description: "실제 렌더될 HTML tag",
      control: { type: "text" }, // 자유롭게 입력 가능한 태그
      table: {
        type: { summary: "HTML Element" },
        defaultValue: { summary: '"span"' },
      },
    },
    textStyle: {
      description: "Figma Design System에 기재된 명칭",
      control: {
        type: "select",
        options: [
          "display1",
          "display2",
          "title1",
          "title2",
          "title3",
          "heading1",
          "heading2",
          "headline1",
          "headline2",
          "body1",
          "body1Reading",
          "body2",
          "body2Reading",
          "label1",
          "label1Normal",
          "label2",
          "caption1",
          "caption2",
        ],
      },
      table: {
        type: { summary: "지정된문자열" },
        defaultValue: { summary: '"body1"' },
      },
    },
    className: {
      description: "Tailwind CSS classes를 추가하여 오버라이딩 한다",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      description: "렌더 될 텍스트 콘텐츠",
      control: { type: "text" },
      table: {
        type: { summary: "ReactNode | 문자열 (문자열 권고)" },
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Display1: Story = {
  args: {
    textStyle: "display1",
    children: "역시 마찬가지로,",
    className: "bg-semantic-primary-heavy text-semantic-static-white",
  },
};
export const Display2: Story = {
  args: {
    textStyle: "display2",
    children: "단순히 고통이라는 이유",
    className: "text-semantic-primary-normal",
  },
};
export const Title1: Story = {
  args: {
    textStyle: "title1",
    children: "때문에 고통 그 자체를 사랑하거나",
    className: "bg-semantic-primary-heavy text-semantic-static-white",
  },
};
export const Title2: Story = {
  args: {
    textStyle: "title2",
    children: "추구하거나 소유하려는 자는 없다. 다만",
    className: "text-semantic-primary-strong",
  },
};
export const Title3: Story = {
  args: {
    textStyle: "title3",
    children: "노역과 고통이 아주 큰 즐거움을 선사하는 상황이",
    className: "text-semantic-label-alternative",
  },
};
export const Heading1: Story = {
  args: {
    textStyle: "heading1",
    children: "때로는 발생하기 때문이다 고통을 사랑이 있는 것이다.",
  },
};
export const Heading2: Story = {
  args: {
    textStyle: "heading2",
    children: "간단한 예를 들자면, 모종의 이익을 얻을 수도 없는데 힘든 ",
  },
};
export const Headline1: Story = {
  args: {
    textStyle: "headline1",
    children:
      "육체적 노력을 기꺼이 할 사람이 우리들 중에 과연 있겠는가? 하지만 ",
  },
};
export const Headline2: Story = {
  args: {
    textStyle: "headline2",
    children:
      "귀찮은 일이 뒤따르지 않는 즐거움을 누리는 것을 선택한 사람, 혹은 ",
  },
};
export const Body1: Story = {
  args: {
    textStyle: "body1",
    children:
      "아무런 즐거움도 생기지 않는 고통을 회피하는 사람을 누가 탓할 수 ",
  },
};
export const Body1Reading: Story = {
  args: {
    textStyle: "body1Reading",
    children:
      "있겠는가? 역시 마찬가지로, 단순히 고통이라는 이유 때문에 고통 그 자체를 ",
  },
};
export const Body2: Story = {
  args: {
    textStyle: "body2",
    children:
      "사랑하거나 추구하거나 소유하려는 자는 없다. 다만 노역과 고통이 아주 큰 ",
  },
};
export const Body2Reading: Story = {
  args: {
    textStyle: "body2Reading",
    children:
      "즐거움을 선사하는 상황이 때로는 발생하기 때문에 고통을 찾는 사람이 있는 ",
  },
};
export const Label1: Story = {
  args: {
    textStyle: "label1",
    children:
      "것이다. 간단한 예를 들자면, 모종의 이익을 얻을 수도 없는데 힘든 육체적 노력을 ",
  },
};
export const Label1Reading: Story = {
  args: {
    textStyle: "label1Reading",
    children:
      "기꺼이 할 사람이 우리들 중에 과연 있겠는가? 하지만 귀찮은 일이 뒤따르지 않는 ",
  },
};
export const Label2: Story = {
  args: {
    textStyle: "label2",
    children:
      "즐거움을 누리는 것을 선택한 사람, 혹은 아무런 즐거움도 생기지 않는 고통을 회피하는 ",
  },
};
export const Caption1: Story = {
  args: {
    textStyle: "caption1",
    children:
      "사람을 누가 탓할 수 있겠는가? 역시 마찬가지로, 단순히 고통이라는 이유 때문에 고통 그 자체를 ",
  },
};
export const Caption2: Story = {
  args: {
    textStyle: "caption2",
    children:
      "사랑하거나 추구하거나 소유하려는 자는 없다. 다만 노역과 고통이 아주 큰 즐거움을 선사하는 상황이 때로는 ",
  },
};
