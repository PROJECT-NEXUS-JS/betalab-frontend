export interface InputProps {
  type: 'text' | 'text area';
  state: 'no value' | 'has value' | 'focused' | 'disabled' | 'error' | 'information' | 'warning' | 'success';
  size: "sm" | "md" | "lg" | "xl";

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
  const THEME_COLOR_CLASSNAME = {
    'no value': 'border-Gray-200 text-Dark-Gray',
    'has value': 'border-Primary-500 text-Dark-Gray',
    focused: 'border-Primary-500 text-Dark-Gray',
    disabled: 'border-Gray-200 text-Light-Gray cursor-not-allowed',
    error: 'border-Red-500 text-Dark-Gray',
    information: 'border-Blue-500 text-Dark-Gray',
    warning: 'border-Yellow-500 text-Dark-Gray',
    success: 'border-Green-500 text-Dark-Gray',
  };

  const THEME_SIZE_CLASSNAME = {
    sm: 'w-[258px]',
    md: 'w-[556px]',
    lg: 'w-[854px]',
    xl: 'w-[1152px]',
  };

  const baseClasses = `p-4 text-sm border rounded-lg focus:outline-none transition-colors ${THEME_COLOR_CLASSNAME[state]} ${THEME_SIZE_CLASSNAME[size]}`;

  return type === 'text' ? (
    <input
      type="text"
      className={baseClasses}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={state === 'disabled'}
    />
  ) : (
    <textarea
      className={baseClasses}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={state === 'disabled'}
      rows={4}
    />
  );
}