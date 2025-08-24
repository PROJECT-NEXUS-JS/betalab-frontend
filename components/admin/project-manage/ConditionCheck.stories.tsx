import type { Meta, StoryObj } from '@storybook/nextjs';
import ConditionCheck from '@/components/admin/project-manage/ConditionCheck';

const meta: Meta<typeof ConditionCheck> = {
  title: 'admin/ConditionCheck',
  component: ConditionCheck,
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <div style={{ width: 1000, maxWidth: '95vw', margin: '2rem auto' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ConditionCheck>;

export const Default: Story = {
  name: '기본',
  render: () => <ConditionCheck />,
};
