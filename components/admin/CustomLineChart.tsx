'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface SeriesItem {
  name: string;
  data: number[];
}

interface CustomLineChartProps {
  series: SeriesItem[];
  labels: string[];
}

// 색상 매핑 - 모든 가능한 name 변형 포함
const COLOR_MAP: Record<string, string> = {
  // 클릭수 관련
  클릭수: '#64748B', // bg-slate-500
  클릭: '#64748B',
  조회수: '#64748B',
  조회: '#64748B',
  views: '#64748B',
  clicks: '#64748B',
  click: '#64748B',
  view: '#64748B',

  // 신청수 관련
  신청수: '#2563EB', // bg-blue-600
  신청: '#2563EB',
  applicants: '#2563EB',
  applicant: '#2563EB',
  applications: '#2563EB',
  application: '#2563EB',

  // 스크랩수 관련
  스크랩수: '#4ADE80', // bg-green-400
  스크랩: '#4ADE80',
  찜하기: '#4ADE80',
  찜: '#4ADE80',
  scraps: '#4ADE80',
  scrap: '#4ADE80',
  bookmarks: '#4ADE80',
  bookmark: '#4ADE80',
};

// 라벨 매핑 - API name을 표시용 라벨로 변환
const LABEL_MAP: Record<string, string> = {
  clicks: '클릭수',
  click: '클릭수',
  views: '조회수',
  view: '조회수',
  applicants: '신청수',
  applicant: '신청수',
  applications: '신청수',
  application: '신청수',
  scraps: '스크랩수',
  scrap: '스크랩수',
  bookmarks: '스크랩수',
  bookmark: '스크랩수',
  찜하기: '스크랩수',
  찜: '스크랩수',
  조회수: '클릭수',
  조회: '클릭수',
  신청수: '신청수',
  신청: '신청수',
};

// 날짜 포맷팅 함수: "2025-11-24" -> "24 토"
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${day} ${weekday}`;
};

// 범례 컴포넌트
const CustomLegend = ({ payload }: any) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="inline-flex justify-start items-center gap-3 mb-4">
      {payload.map((entry: any, index: number) => {
        return (
          <div key={index} className="flex justify-start items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: entry.color || '#000000' }}
            />
            <div className="justify-start text-gray-600 text-xs font-bold font-['SUIT_Variable'] leading-4">
              {entry.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (active && payload && payload.length > 0) {
    const tooltipItems = payload.map((item: any) => ({
      name: item.name,
      value: item.value,
      color: item.color,
    }));
    const order = ['스크랩수', '신청수', '클릭수'];
    const sortedItems = tooltipItems.sort(
      (
        a: { name: string; value: number; color: string },
        b: { name: string; value: number; color: string },
      ) => {
        const aIndex = order.indexOf(a.name);
        const bIndex = order.indexOf(b.name);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      },
    );

    const tooltipTextMap: Record<string, string> = {
      스크랩수: '스크랩 수',
      신청수: '신청수',
      클릭수: '클릭수',
    };

    if (!coordinate) return null;
    const tooltipY = coordinate.y - 60;
    const tooltipX = coordinate.x;

    return (
      <div
        className="left-0 top-0 absolute inline-flex flex-col justify-start items-center"
        style={{
          position: 'absolute',
          left: `${tooltipX}px`,
          top: `${tooltipY}px`,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        <div className="p-3 bg-gray-600 rounded flex flex-col justify-start items-start min-w-[120px]">
          <div className="text-center justify-start text-white text-xs font-bold font-['SUIT_Variable'] leading-4">
            {sortedItems.map(
              (item: { name: string; value: number; color: string }, index: number) => {
                const displayName = tooltipTextMap[item.name] || item.name;
                return (
                  <span key={index}>
                    {displayName} {item.value}
                    {index < sortedItems.length - 1 && <br />}
                  </span>
                );
              },
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-600"></div>
        </div>
      </div>
    );
  }
  return null;
};

export function CustomLineChart({ series, labels }: CustomLineChartProps) {
  const chartData = labels.map((label, index) => {
    const dataPoint: any = {
      date: formatDate(label),
      originalDate: label,
    };
    series.forEach(s => {
      const mappedName = LABEL_MAP[s.name] || s.name;
      dataPoint[mappedName] = s.data[index] ?? 0;
    });
    return dataPoint;
  });

  const seriesConfig = series.map(s => {
    const mappedName = LABEL_MAP[s.name] || s.name;
    let color = COLOR_MAP[s.name] || COLOR_MAP[mappedName];
    if (!color) {
      color = '#000000';
    }

    return {
      originalName: s.name,
      mappedName,
      color,
    };
  });

  const legendData = seriesConfig.map(config => ({
    value: config.mappedName,
    color: config.color,
  }));

  return (
    <div className="w-full p-12 rounded-sm bg-White shadow-[0_0_10px_0_rgba(26,30,39,0.08)]">
      <CustomLegend payload={legendData} />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="date"
            tick={{ fill: '#374151', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: '#374151', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {seriesConfig.map((config, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={config.mappedName}
              stroke={config.color}
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
