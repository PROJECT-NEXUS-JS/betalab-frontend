'use client';

import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLOR_MAP: Record<string, string> = {
  게임: '#64768C',
  웹: '#DAE7FF',
  앱: '#0E62FF',
};

export interface DonutChartData {
  label: string;
  value: number;
}

interface DonutChartProps {
  data: DonutChartData[];
  total: number;
  totalLabel?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, coordinate, total }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const percentage = total > 0 ? Math.round((data.value / total) * 100) : 0;

    const tooltipX = coordinate?.x || 0;
    const tooltipY = coordinate?.y ? coordinate.y - 10 : 0;

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: tooltipX,
          top: tooltipY,
          transform: 'translate(-50%, calc(-100% - 4px))',
        }}
      >
        <div className="relative flex flex-col items-center">
          <div className="px-3 py-2 bg-gray-600 rounded-md flex flex-col items-center justify-center min-w-[60px]">
            <div className="text-center text-white text-xs font-bold font-['SUIT_Variable'] leading-4">
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
  totalLabel = '총 참여 프로젝트',
  className,
}: DonutChartProps) {
  const chartData = data.map(item => ({
    name: item.label,
    value: item.value,
    color: COLOR_MAP[item.label] || '#000000',
  }));

  return (
    <div className={cn('flex flex-col items-center gap-4 w-72', className)}>
      <div className="flex gap-4 justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLOR_MAP[item.label] || '#000000' }}
            />
            <span className="text-sm font-medium text-Black">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="w-full relative" style={{ height: '288px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip total={total} />}
              allowEscapeViewBox={{ x: true, y: true }}
              cursor={{ fill: 'transparent' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-Dark-Gray">{totalLabel}</p>
        <p className="text-lg font-bold text-Black">{total}개</p>
      </div>
    </div>
  );
}
