const TEXT_VARIANTS = {
  기본: '어떤 서비스를\n먼저 경험해볼까요 ?',
  베리언트2: '세상에 없던 서비스를\n체험해보세요 !',
  베리언트3: '어떤 베타테스트를\n찾아볼까요 ?',
};

export interface InformationTextProps {
  // 피그마대로 기본 | 베리언트2 | 베리언트3
  type: '기본' | '베리언트2' | '베리언트3';
}

export default function InformationText({ type }: InformationTextProps) {
  return (
    <div className="flex justify-center items-center p-2.5">
      <p className="text-4xl text-Black whitespace-pre-line font-bold text-center">
        {TEXT_VARIANTS[type]}
      </p>
    </div>
  );
}
