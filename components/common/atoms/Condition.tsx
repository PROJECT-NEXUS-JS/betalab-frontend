import Image from 'next/image';

export interface ConditionProps {
  style: 'reward' | 'date' | 'route' | 'user condition' | 'qna';
  /** 경우가 너무 많아 차라리 텍스트를 매번 Props로 넘기는게 나을 것 같아 이렇게 했습니다. */
  texts: string[];
}

export default function Condition({ style, texts }: ConditionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex p-1 items-center justify-center gap-2 bg-Primary-100 rounded-sm w-max">
        <Image src={ICON_MAP[style]} alt={style} width={16} height={16} className="" />
        <p className="flex text-xs text-Primary-500 font-bold">{TITLE_MAP[style]}</p>
      </div>
      <ul className="list-disc list-inside space-y-2">
        {texts.map((text, index) => (
          <li key={index} className="pl-8 text-xs text-Dark-Gray">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ICON_MAP: Record<ConditionProps['style'], string> = {
  reward: '/icons/condition-icon/diamond.svg',
  date: '/icons/condition-icon/timer.svg',
  route: '/icons/condition-icon/check-list.svg',
  'user condition': '/icons/condition-icon/user-check.svg',
  qna: '/icons/condition-icon/qna.svg',
};

const TITLE_MAP: Record<ConditionProps['style'], string> = {
  reward: '리워드 제공',
  date: '소요 기간',
  route: '참여 방식',
  'user condition': '참가 대상',
  qna: 'QNA',
};
