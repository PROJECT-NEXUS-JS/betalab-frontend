import type { Meta, StoryObj } from '@storybook/nextjs';
import SidebarBtn, { SidebarBtnProps } from './SidebarBtn';

const meta: Meta<SidebarBtnProps> = {
  title: 'Admin/SidebarBtn',
  component: SidebarBtn,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<SidebarBtnProps>;

export const Default: Story = {
  args: {
    state: 'default',
    children: '대시보드',
  },
};

export const Active: Story = {
  args: {
    state: 'active',
    children: '대시보드',
  },
};
