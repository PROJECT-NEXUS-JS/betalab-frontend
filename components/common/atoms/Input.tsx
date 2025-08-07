import Image from 'next/image';
import CircleX from '@/public/icons/input-icon/circle-x.svg';

export interface InputProps {
  type: 'text' | 'text area';
  state:
    | 'no value'
    | 'has value'
    | 'focused'
    | 'disabled'
    | 'error'
    | 'information'
    | 'warning'
    | 'success';
  size: 'sm' | 'md' | 'lg' | 'xl';

  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({
  type = 'text',
  state = 'no value',
  size = 'md',
  placeholder = '',
  value = '',
  onChange = () => {},
}: InputProps) {
  const baseClasses = `p-4 text-sm border rounded-[2px] focus:outline-none transition-colors ${THEME_COLOR_CLASSNAME[state]} ${THEME_SIZE_CLASSNAME[size]}`;

  return type === 'text' ? (
    <div className={`${baseClasses} flex justify-between items-center`}>
      <input
        type="text"
        className="focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={state === 'disabled'}
      />
      <button className={`${THEME_BUTTON_SHOW[state]}`}>
        <Image src={CircleX} alt="Clear input" />
      </button>
    </div>
  ) : (
    <textarea
      className={`${baseClasses} resize-none`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={state === 'disabled'}
      rows={4}
    />
  );
}

const THEME_COLOR_CLASSNAME = {
  'no value': 'border-Gray-100 text-Light-Gray placeholder:text-Light-Gray bg-White',
  'has value': 'border-Gray-100 text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  focused: 'border-Black text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  disabled:
    'border-Gray-100 text-Light-Gray placeholder:text-Light-Gray cursor-not-allowed bg-Gray-100',
  error: 'border-Error text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  information: 'border-Information text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  warning: 'border-Warning text-Dark-Gray placeholder:text-Dark-Gray bg-White',
  success: 'border-Success text-Dark-Gray placeholder:text-Dark-Gray bg-White',
};

const THEME_SIZE_CLASSNAME = {
  sm: 'w-[258px]',
  md: 'w-[556px]',
  lg: 'w-[854px]',
  xl: 'w-[1152px]',
};

const THEME_BUTTON_SHOW = {
  'no value': 'hidden',
  'has value': 'block',
  focused: 'block',
  disabled: 'hidden',
  error: 'block',
  information: 'block',
  warning: 'block',
  success: 'block',
};
