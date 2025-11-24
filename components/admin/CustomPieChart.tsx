'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartItem {
  label: string;
  value: number;
}

interface ChartData {
  title: string;
  items: PieChartItem[];
}

interface CustomPieChartProps {
  statusChart: ChartData;
  rewardChart: ChartData;
}

const STATUS_COLORS: Record<string, string> = {
  진행중: '#DAE7FF',
  대기: '#0E62FF',
  완료: '#9CA3AF',
  PENDING: '#0E62FF',
  APPROVED: '#DAE7FF',
  COMPLETED: '#9CA3AF',
};

const REWARD_COLORS: Record<string, string> = {
  미지급: '#DBEAFE', // bg-blue-100
  '지급 완료': '#2563EB', // bg-blue-600
  PENDING: '#DBEAFE',
  PAID: '#2563EB',
};

const LABEL_MAP: Record<string, string> = {
  PENDING: '대기',
  APPROVED: '진행중',
  COMPLETED: '완료',
  PAID: '지급완료',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0);
    const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0';

    return (
      <div className="px-3 py-2 bg-gray-600 rounded-md flex flex-col items-center justify-center min-w-[80px]">
        <div className="text-center text-white text-xs font-bold font-['SUIT_Variable'] leading-4">
          {data.name}
          <br />
          {percentage}%
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="inline-flex justify-start items-center gap-3">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex justify-start items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <div className="justify-start text-gray-600 text-xs font-bold font-['SUIT_Variable'] leading-4">
            {entry.value}
          </div>
        </div>
      ))}
    </div>
  );
};

const StatusPieChart = ({
  data,
  colors,
  title,
}: {
  data: ChartData;
  colors: Record<string, string>;
  title: string;
}) => {
  const total = data.items.reduce((sum, item) => sum + item.value, 0);
  const chartData = data.items.map(item => ({
    name: LABEL_MAP[item.label] || item.label,
    value: item.value,
    color: colors[item.label] || colors[LABEL_MAP[item.label]] || '#000000',
  }));

  return (
    <div className="flex-1 p-6 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)] relative">
      {/* Title - 좌측 상단 */}
      <h4 className="text-base font-bold text-Dark-Gray mb-4">{title}</h4>

      {/* Legend - 우측 상단 */}
      <div className="absolute top-6 right-6">
        <CustomLegend
          payload={chartData.map(item => ({
            value: item.name,
            color: item.color,
          }))}
        />
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Numbers - 하단 중앙 */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.items.map((item, index) => {
          const label = LABEL_MAP[item.label] || item.label;
          return (
            <div key={index} className="text-sm text-Dark-Gray">
              {label} {item.value}명
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RewardDonutChart = ({
  data,
  colors,
  title,
}: {
  data: ChartData;
  colors: Record<string, string>;
  title: string;
}) => {
  const total = data.items.reduce((sum, item) => sum + item.value, 0);
  const chartData = data.items.map(item => ({
    name: LABEL_MAP[item.label] || item.label,
    value: item.value,
    color: colors[item.label] || colors[LABEL_MAP[item.label]] || '#000000',
  }));

  return (
    <div className="flex-1 p-6 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)] relative">
      {/* Title - 좌측 상단 */}
      <h4 className="text-base font-bold text-Dark-Gray mb-4">{title}</h4>

      {/* Legend - 우측 상단 */}
      <div className="absolute top-6 right-6">
        <CustomLegend
          payload={chartData.map(item => ({
            value: item.name,
            color: item.color,
          }))}
        />
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Numbers - 하단 중앙 */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.items.map((item, index) => {
          const label = LABEL_MAP[item.label] || item.label;
          return (
            <div key={index} className="text-sm text-Dark-Gray">
              {label} {item.value}명
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function CustomPieChart({ statusChart, rewardChart }: CustomPieChartProps) {
  // 리워드 지급률 목데이터 (UI 확인용)
  const mockRewardChart: ChartData = {
    title: '리워드 지급률',
    items: [
      { label: '미지급', value: 5 },
      { label: '지급 완료', value: 15 },
    ],
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <StatusPieChart data={statusChart} colors={STATUS_COLORS} title={statusChart.title} />
      <RewardDonutChart
        data={mockRewardChart}
        colors={REWARD_COLORS}
        title={mockRewardChart.title}
      />
    </div>
  );
}
