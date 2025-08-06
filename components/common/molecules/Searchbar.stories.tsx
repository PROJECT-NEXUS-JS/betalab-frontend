import type { Meta, StoryObj } from "@storybook/nextjs";
import Searchbar from "./Searchbar";

const meta: Meta<typeof Searchbar> = {
  title: "Common/Molecules/Searchbar",
  component: Searchbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onSearch: { action: "search" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Searchbar
export const Default: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
  },
};

// 커스텀 플레이스홀더
export const CustomPlaceholder: Story = {
  args: {
    placeholder: "게임, 서비스, 카테고리로 검색해보세요",
  },
};

// 이벤트 핸들러가 있는 Searchbar
export const WithEventHandler: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    onSearch: (query) => console.log("검색 실행:", query),
  },
};
