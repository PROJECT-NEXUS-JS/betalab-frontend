interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  coordinate?: { x: number; y: number };
  total?: number;
  unit?: string; // "점", "건", "%" 등 단위
  type?: 'percentage' | 'value'; // 비율로 보여줄지, 값 그대로 보여줄지
  displayLabel?: string; // 원하는 라벨 값
}

// 툴팁 컴포넌트 (색상 로직만 살짝 수정)
const CustomTooltip = ({
  active,
  payload,
  coordinate,
  total,
  unit = '',
  type = 'percentage',
  displayLabel,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    // 표시할 텍스트 결정 로직
    let displayText = '';

    if (type === 'value') {
      // 1. 값 그대로 표시하는 모드
      // data.value가 숫자라면 소수점 처리 등이 필요할 수 있음
      displayText = `${data.value}${unit}`;
    } else {
      // 2. 퍼센트 계산 모드
      // total이 없으면 payload 전체 합으로 계산
      const currentTotal = total || payload.reduce((acc: any, cur: any) => acc + cur.value, 0);
      const percentage = currentTotal > 0 ? Math.round((data.value / currentTotal) * 100) : 0;
      displayText = `${percentage}%`;
    }

    // 툴팁 위치 계산
    const tooltipX = coordinate?.x || 0;
    const tooltipY = coordinate?.y ? coordinate.y - 10 : 0;

    return (
      <div
        className="absolute pointer-events-none z-50"
        style={{
          left: tooltipX,
          top: tooltipY,
          transform: 'translate(-50%, calc(-100% - 4px))',
        }}
      >
        <div className="relative flex flex-col items-center">
          <div className="px-3 py-2 bg-gray-600 rounded-md flex flex-col items-center justify-center min-w-[60px] shadow-lg">
            <div className="whitespace-nowrap text-center text-white text-xs font-bold leading-4">
              {displayLabel ?? data.name}
              <br />
              {displayText}
            </div>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-600" />
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
