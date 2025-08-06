import type { Meta, StoryObj } from "@storybook/nextjs";
import Header, { HeaderAdmin } from "./Header";

interface HeaderProps {
  isLogin?: boolean;
  isSearchbar?: boolean;
}

const meta: Meta<HeaderProps> = {
  title: "Components/Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isLogin: {
      control: { type: "boolean" },
      description: "로그인 상태 여부",
    },
    isSearchbar: {
      control: { type: "boolean" },
      description: "서치바 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    isLogin: false,
    isSearchbar: false,
  },
};

export const LoggedOut: Story = {
  args: {
    isLogin: false,
    isSearchbar: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "로그인하지 않은 상태의 헤더입니다. 로그인/회원가입 버튼이 표시됩니다.",
      },
    },
  },
};

export const LoggedIn: Story = {
  args: {
    isLogin: true,
    isSearchbar: false,
  },
  parameters: {
    docs: {
      description: {
        story: "로그인한 상태의 헤더입니다. 헤더 아이콘들이 표시됩니다.",
      },
    },
  },
};

export const WithSearchbar: Story = {
  args: {
    isLogin: false,
    isSearchbar: true,
  },
  parameters: {
    docs: {
      description: {
        story: "서치바가 포함된 헤더입니다.",
      },
    },
  },
};

export const LoggedInWithSearchbar: Story = {
  args: {
    isLogin: true,
    isSearchbar: true,
  },
  parameters: {
    docs: {
      description: {
        story: "로그인한 상태에서 서치바가 포함된 헤더입니다.",
      },
    },
  },
};

export const Admin: Story = {
  render: () => <HeaderAdmin />,
  parameters: {
    docs: {
      description: {
        story: "관리자용 헤더입니다. 로고와 '관리자용' 텍스트만 표시됩니다.",
      },
    },
  },
};
