import type { Meta, StoryObj, Decorator } from '@storybook/nextjs';
import { Toast } from './Toast';

type IconName = 'smile' | 'check' | 'siren' | 'timer' | 'bye' | 'red' | 'blue';

const ICONS: Record<IconName, string> = {
  smile: '/icons/toast-icon/smile.svg',
  check: '/icons/toast-icon/check.svg',
  siren: '/icons/toast-icon/siren.svg',
  timer: '/icons/toast-icon/timer.svg',
  bye: '/icons/toast-icon/bye.svg',
  red: '/icons/toast-icon/red.svg',
  blue: '/icons/toast-icon/blue.svg',
};

const IconImg = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} width={20} height={20} />
);

type StoryProps = Omit<React.ComponentProps<typeof Toast>, 'icon'> & {
  iconName?: IconName;
};

function ToastStoryAdapter(props: StoryProps) {
  const { iconName = 'smile', ...rest } = props;
  return <Toast {...rest} icon={<IconImg src={ICONS[iconName]} alt={iconName} />} />;
}

const Wrapper: Decorator = Story => <Story />;

const meta = {
  title: 'UI/Toast/ToastMessage',
  component: ToastStoryAdapter,
  decorators: [Wrapper],
  parameters: { layout: 'centered', controls: { sort: 'alpha' } },
  argTypes: {
    type: { control: 'inline-radio', options: ['alert', 'error'] },
    iconName: { control: 'select', options: Object.keys(ICONS) },
    message: { control: 'text' },
    className: { control: 'text' },
  },
  args: { type: 'alert', iconName: 'smile', message: '베타랩님, 환영해요 !' },
} satisfies Meta<typeof ToastStoryAdapter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  args: { type: 'alert', iconName: 'smile', message: '베타랩님, 환영해요 !' },
};
export const RequestSuccess200: Story = {
  args: { type: 'alert', iconName: 'check', message: '요청 성공 !' },
};
export const Created201: Story = {
  args: { type: 'alert', iconName: 'check', message: '정보가 성공적으로 생성됐어요' },
};
export const Accepted202: Story = {
  args: { type: 'alert', iconName: 'check', message: '요청이 정상적으로 접수 됐어요' },
};
export const NoContent203: Story = {
  args: { type: 'alert', iconName: 'blue', message: '반환할 데이터가 없습니다' },
};
export const TimerNotice: Story = {
  args: { type: 'alert', iconName: 'timer', message: '세션이 만료되었어요\n다시 로그인해 주세요' },
};
export const Bye: Story = { args: { type: 'alert', iconName: 'bye', message: '다시 만나요' } };
export const RequireLogin: Story = {
  args: { type: 'alert', iconName: 'siren', message: '로그인 후 이용이 가능해요 !' },
};
export const InvalidToken: Story = {
  args: {
    type: 'alert',
    iconName: 'blue',
    message: '토큰이 유효하지 않아요\n다시 로그인 해주세요',
  },
};
export const MethodNotAllowed405 = {
  args: {
    type: 'error',
    iconName: 'red',
    message: '요청이 정상적으로 처리되지 않았어요\n잠시 후 다시 시도해 주세요',
  },
};
const red = (message: string): Story => ({ args: { type: 'error', iconName: 'red', message } });

export const BadRequest400 = red('로그인에 실패했어요\n다시 시도해 주세요');
export const ValidationFailed = red('입력정보를 다시 확인해주세요');
export const TypeMismatch = red('입력정보를 다시 확인해주세요');
export const MissingParameter = red('누락된 정보가 있어요');
export const UnsupportedMediaType415 = red('지원되지 않는 형식이에요');
export const UnprocessableEntity422 = red('요청을 처리할 수 없어요\n잠시 후 다시 시도해 주세요');
export const InvalidCredentials = red('올바르지 않은 정보예요');
