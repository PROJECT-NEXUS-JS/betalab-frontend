'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

const CATEGORY_LABELS: Record<string, string> = {
  클릭수: '클릭수',
  스크랩: '스크랩',
  신청자: '신청자',
  참여자: '참여자',
  리뷰: '리뷰',
};

const CATEGORY_LABEL_MAP: Record<string, string> = {
  clicks: '클릭수',
  scraps: '스크랩',
  applicants: '신청자',
  participants: '참여자',
  reviews: '리뷰',
};

export function CustomBarChart({
  chartData,
}: {
  chartData: { category: string; value: number }[];
}) {
  const categoryOrder = ['클릭수', '스크랩', '신청자', '참여자', '리뷰'];

  const sortedData = [...chartData].sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.category);
    const bIndex = categoryOrder.indexOf(b.category);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const mappedData = sortedData.map(item => ({
    ...item,
    category: CATEGORY_LABEL_MAP[item.category] || item.category,
  }));

  const CustomTooltip = ({ active, payload, coordinate }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const categoryText = data.payload.category;
      const value = data.value;

      if (!coordinate) return null;
      const tooltipY = coordinate.y - 60;
      const tooltipX = coordinate.x;

      return (
        <div
          className="inline-flex flex-col justify-start items-center"
          style={{
            position: 'absolute',
            left: `${tooltipX}px`,
            top: `${tooltipY}px`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <div className="p-3 bg-gray-600 rounded flex flex-row justify-center items-center">
            <div className="text-center text-white text-xs font-bold font-['SUIT_Variable'] leading-4 whitespace-nowrap">
              {categoryText} 수 {value}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2.5">
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-600"></div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="relative w-full p-12 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)]">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={mappedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              width={80}
              tick={{ fill: '#000', fontSize: 14, fontWeight: 'bold' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#0E62FF">
              {mappedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#0E62FF" />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                style={{ fill: '#374151', fontSize: '14px', fontWeight: 'bold' }}
                formatter={(value: number) => `${value}`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
