import type { Meta, StoryObj } from "@storybook/nextjs";
import PostCard from "./PostCard";
import { PostCardModel } from "@/types/models/postsModel";

const meta: Meta<typeof PostCard> = {
  title: "Category/PostCard",
  component: PostCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    post: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 데이터 템플릿
const createPostData = (
  overrides: Partial<PostCardModel> = {}
): PostCardModel => ({
  id: "1",
  title: "기본 제목",
  serviceSummary: "기본 서비스 요약입니다.",
  thumbnailUrl: "https://picsum.photos/id/237/200/300",
  mainCategories: [
    { code: "GAME", name: "게임" },
    { code: "ENTERTAINMENT", name: "엔터테인먼트" },
  ],
  platformCategories: [
    { code: "MOBILE", name: "모바일" },
    { code: "WEB", name: "웹" },
  ],
  reward: {
    rewardType: "CASH",
    rewardDescription: "CASH",
  },
  schedule: {
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    recruitmentDeadline: "2024-01-15",
    durationTime: "30분",
  },
  ...overrides,
});

// 1. 제목 한줄, 요약 한줄, D-7일, 리워드 제공
export const ShortTitleShortSummary: Story = {
  args: {
    post: createPostData({
      title: "짧은 제목",
      serviceSummary: "짧은 요약입니다.",
      schedule: {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        recruitmentDeadline: "2024-01-08",
        durationTime: "30분",
      },
    }),
  },
};

// 2. 제목 두줄, 요약 한줄, D-3일, 리워드 제공
export const LongTitleShortSummary: Story = {
  args: {
    post: createPostData({
      title:
        "매우 긴 제목입니다. 이 제목은 두 줄에 걸쳐서 표시될 것입니다. 사용자가 읽기 쉽도록 적절한 길이로 작성되었습니다.",
      serviceSummary: "짧은 요약입니다.",
      schedule: {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        recruitmentDeadline: "2024-01-05",
        durationTime: "30분",
      },
    }),
  },
};

// 3. 제목 한줄, 요약 두줄, D-1일, 리워드 제공
export const ShortTitleLongSummary: Story = {
  args: {
    post: createPostData({
      title: "짧은 제목",
      serviceSummary:
        "매우 긴 서비스 요약입니다. 이 요약은 두 줄에 걸쳐서 표시될 것입니다. 사용자가 서비스의 특징과 장점을 충분히 이해할 수 있도록 상세하게 작성되었습니다.",
      schedule: {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        recruitmentDeadline: "2024-01-07",
        durationTime: "30분",
      },
    }),
  },
};

// 4. 제목 두줄, 요약 두줄, 오늘 마감, 리워드 제공
export const LongTitleLongSummaryTodayDeadline: Story = {
  args: {
    post: createPostData({
      title:
        "매우 긴 제목입니다. 이 제목은 두 줄에 걸쳐서 표시될 것입니다. 사용자가 읽기 쉽도록 적절한 길이로 작성되었습니다.",
      serviceSummary:
        "매우 긴 서비스 요약입니다. 이 요약은 두 줄에 걸쳐서 표시될 것입니다. 사용자가 서비스의 특징과 장점을 충분히 이해할 수 있도록 상세하게 작성되었습니다.",
      schedule: {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        recruitmentDeadline: new Date().toISOString().split("T")[0], // 오늘 날짜
        durationTime: "30분",
      },
    }),
  },
};

// 5. 제목 한줄, 요약 한줄, D-10일, 리워드 없음
export const NoReward: Story = {
  args: {
    post: createPostData({
      title: "리워드 없는 서비스",
      serviceSummary: "리워드가 제공되지 않는 서비스입니다.",
      reward: {
        rewardType: "NONE",
        rewardDescription: "NONE",
      },
      schedule: {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        recruitmentDeadline: "2024-01-20",
        durationTime: "30분",
      },
    }),
  },
};

// 6. 제목 두줄, 요약 두줄, D-15일, 상품 리워드
export const ProductReward: Story = {
  args: {
    post: createPostData({
      title:
        "매우 긴 제목입니다. 이 제목은 두 줄에 걸쳐서 표시될 것입니다. 사용자가 읽기 쉽도록 적절한 길이로 작성되었습니다.",
      serviceSummary:
        "매우 긴 서비스 요약입니다. 이 요약은 두 줄에 걸쳐서 표시될 것입니다. 사용자가 서비스의 특징과 장점을 충분히 이해할 수 있도록 상세하게 작성되었습니다.",
      reward: {
        rewardType: "PRODUCT",
        rewardDescription: "PRODUCT",
      },
      schedule: {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        recruitmentDeadline: "2024-01-25",
        durationTime: "30분",
      },
    }),
  },
};
