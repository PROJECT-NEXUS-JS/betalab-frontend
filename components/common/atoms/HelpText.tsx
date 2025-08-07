import Image from 'next/image';
import RedExclamationMark from '@/public/icons/helptext-icon/red-exclamation-mark.svg';
import RedX from '@/public/icons/helptext-icon/red-x.svg';
import GreenCheck from '@/public/icons/helptext-icon/green-check.svg';
import YellowExclamationMark from '@/public/icons/helptext-icon/yellow-exclamation-mark.svg';
import BlueCheck from '@/public/icons/helptext-icon/blue-check.svg';

export interface HelpTextProps {
  style: 'error' | 'x' | 'check' | 'warning' | 'information';
  // size: "sm";
  text: string;
}

export default function HelpText({
  style = 'information',
  // size = "sm",
  text = '',
}: HelpTextProps) {
  return (
    <div className="flex items-center gap-[10px]">
      <div>{THEME_ICON_IMAGE[style]}</div>
      <span className={`${THEME_STYLE_CLASSNAME[style]} text-xs font-semibold`}>{text}</span>
    </div>
  );
}

const THEME_STYLE_CLASSNAME = {
  error: 'text-Error',
  x: 'text-Error',
  check: 'text-Success',
  warning: 'text-Warning',
  information: 'text-Information',
};

const THEME_ICON_IMAGE = {
  error: <Image width={13.3} height={13.3} src={RedExclamationMark} alt="Error" />,
  x: <Image width={13.3} height={13.3} src={RedX} alt="Error" />,
  check: <Image width={13.3} height={13.3} src={GreenCheck} alt="Success" />,
  warning: <Image width={13.3} height={13.3} src={YellowExclamationMark} alt="Warning" />,
  information: <Image width={13.3} height={13.3} src={BlueCheck} alt="Information" />,
};
