import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryBar, { CategoryBarProps } from './CategoryBar';

const meta: Meta<CategoryBarProps> = {
  title: 'Common/Atoms/CategoryBar',
  component: CategoryBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <>
      <CategoryBar state="active" size="sm" onClick={() => alert('Category clicked')}>
        Active Small
      </CategoryBar>
      <CategoryBar state="active" size="md" onClick={() => alert('Category clicked')}>
        Active Medium
      </CategoryBar>
      <CategoryBar state="deactive" size="sm" onClick={() => alert('Category clicked')}>
        Deactive Small
      </CategoryBar>
      <CategoryBar state="deactive" size="md" onClick={() => alert('Category clicked')}>
        Deactive Medium
      </CategoryBar>
    </>
  ),
};

export const Default: Story = {
  args: {
    state: 'active',
    size: 'md',
    onClick: () => alert('Category clicked'),
    children: 'Category Name',
  },
};
