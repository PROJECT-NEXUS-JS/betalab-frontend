'use client';

import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DEFAULT_COLOR_MAP: Record<string, string> = {
  게임: '#64768C',
  웹: '#DAE7FF',
  앱: '#0E62FF',

  WEB: '#DAE7FF',
  APP: '#0E62FF',
  UX: '#64768C',
  AI: '#9B59B6',
};

// 지시선 계산을 위한 상수
const RADIAN = Math.PI / 180;

/** 커스텀 라벨 렌더러 (지시선 + 텍스트) */
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, fill, payload, percent }: any) => {
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  // 선 시작점
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;

  // 선 끝점 (각도대로 쭉 뻗어나감)
  const ex = cx + (outerRadius + 20) * cos;
  const ey = cy + (outerRadius + 20) * sin;

  // 텍스트 정렬 (오른쪽이면 왼쪽 정렬, 왼쪽이면 오른쪽 정렬)
  const textAnchor = cos >= 0 ? 'start' : 'end';

  // 텍스트 위치 보정 (선 끝점에서 글자가 겹치지 않게 살짝 띄움)
  const textX = ex + (cos >= 0 ? 1 : -1) * 5;
  const textY = ey;

  return (
    <g>
      {/* 지시선 */}
      <path d={`M${sx},${sy}L${ex},${ey}`} stroke={fill} fill="none" />

      {/* 텍스트 (이름 + 퍼센트) */}
      <text
        x={textX}
        y={textY}
        dy={4} // 수직 중앙 정렬
        textAnchor={textAnchor}
        fill={fill} // 텍스트 색상도 동일하게
        className="text-caption-02 font-semibold"
      >
        {`${payload.name} ${percent * 100}%`}
      </text>
    </g>
  );
};

export interface DonutChartData {
  label: string;
  value: number;
  color?: string; // 데이터별 색상 직접 지정 가능하게
}

interface DonutChartProps {
  data: DonutChartData[];
  total?: number; // total 계산을 내부에서 할 수도 있음
  totalLabel?: string;
  className?: string;
  variant?: 'top-legend' | 'right-legend' | 'lines'; // 레이아웃
  showCenterText?: boolean; // 가운데 텍스트 표시 여부
}

// 툴팁 컴포넌트 (색상 로직만 살짝 수정)
const CustomTooltip = ({ active, payload, coordinate, total }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    // total이 없으면 payload 전체 합으로 계산
    const currentTotal = total || payload.reduce((acc: any, cur: any) => acc + cur.value, 0);
    const percentage = currentTotal > 0 ? Math.round((data.value / currentTotal) * 100) : 0;

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
            <div className="text-center text-white text-xs font-bold leading-4">
              {data.name}
              <br />
              {percentage}%
            </div>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-600" />
        </div>
      </div>
    );
  }
  return null;
};

export default function DonutChart({
  data,
  total,
  totalLabel = '총 합계',
  className,
  variant = 'top-legend', // 기본값: 상단 범례
  showCenterText = false,
}: DonutChartProps) {
  // 데이터 가공: 색상이 없으면 맵에서 찾고, 없으면 회색
  const chartData = data.map(item => ({
    name: item.label,
    value: item.value,
    color: item.color || DEFAULT_COLOR_MAP[item.label] || '#E5E7EB',
  }));

  // total이 prop으로 안 넘어오면 자동 계산
  const calculatedTotal = total ?? data.reduce((acc, cur) => acc + cur.value, 0);

  // 레이아웃 스타일 설정
  const isRightLegend = variant === 'right-legend';
  const isLinesVariant = variant === 'lines';

  let containerStyle = 'flex flex-col items-center gap-4 w-72';
  if (isRightLegend) containerStyle = 'flex flex-row items-center gap-10 w-full';
  if (isLinesVariant) containerStyle = 'flex items-center w-full';

  // 도넛 크기 설정
  // lines 타입은 라벨 공간 확보를 위해 도넛을 조금 작게 그림
  const outerRadius = isRightLegend ? 100 : isLinesVariant ? 70 : 80;
  const innerRadius = isRightLegend ? 55 : isLinesVariant ? 40 : 50;

  return (
    <div className={cn(containerStyle, className)}>
      {/* 1. 상단 범례일 때 렌더링 */}
      {!isRightLegend && !isLinesVariant && (
        <div className="flex gap-4 justify-center flex-wrap">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color || DEFAULT_COLOR_MAP[item.label] || '#E5E7EB',
                }}
              />
              <span className="text-sm font-medium text-black">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* 2. 차트 영역 */}
      <div
        className="relative"
        style={{
          width: isRightLegend ? '200px' : '100%',
          height: isRightLegend ? '200px' : isLinesVariant ? '200px' : '288px',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              // lines 타입일 때만 커스텀 라벨 적용
              label={isLinesVariant ? renderCustomizedLabel : undefined}
              labelLine={false} // 기본 라인은 끄고 커스텀 라인 사용
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip total={calculatedTotal} />}
              cursor={{ fill: 'transparent' }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* 가운데 텍스트 (옵션) */}
        {showCenterText && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xs text-gray-500">{totalLabel}</p>
            <p className="text-lg font-bold text-gray-900">{calculatedTotal}</p>
          </div>
        )}
      </div>

      {/* 3. 오른쪽 범례일 때 렌더링 */}
      {isRightLegend && (
        <div className="flex flex-col gap-y-2">
          {data.map((item, index) => {
            const percent =
              calculatedTotal > 0 ? Math.round((item.value / calculatedTotal) * 100) : 0;
            return (
              <div key={index} className="flex items-center gap-x-0.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color || DEFAULT_COLOR_MAP[item.label] || '#E5E7EB',
                    }}
                  />
                  <span className="text-body-02 font-medium text-Dark-Gray">{item.label}</span>
                </div>
                <span className="text-caption-01 font-semibold text-Light-Gray">{percent}%</span>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. 하단 합계 (상단 범례 모드일 때만 표시) */}
      {!isRightLegend && !isLinesVariant && !showCenterText && (
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-gray-500">{totalLabel}</p>
          <p className="text-lg font-bold text-black">{calculatedTotal}개</p>
        </div>
      )}
    </div>
  );
}
