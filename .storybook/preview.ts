<<<<<<< HEAD
import type { Preview } from '@storybook/nextjs';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
=======
import type { Preview } from "@storybook/nextjs";
import "@/styles/globals.css";
import "@/styles/tailwind.css";
>>>>>>> 8c98eb9 (feat: PostCard 컴포넌트 완성)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
