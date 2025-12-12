import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import EmptyData from './EmptyData';

interface UsabilityRadarChartProps {
  functionalityScore: number;
  comprehensibilityScore: number;
  loadingSpeedScore: number;
  responseTimingScore: number;
}

const FULL_MARK = 5;

/** 라벨을 바깥으로 밀어내는 커스텀 틱 컴포넌트 */
const CustomTick = ({ x, y, cx, cy, payload, textAnchor, ...props }: any) => {
  const gap = 10; // 그래프와 글자 사이의 간격 (px)

  // 중심점(cx, cy)에서 현재 위치(x, y)까지의 각도 계산
  // (텍스트를 중심에서 바깥쪽으로 gap만큼 더 밀어냄)
  const angle = Math.atan2(y - cy, x - cx);
  const newX = x + Math.cos(angle) * gap;
  const newY = y + Math.sin(angle) * gap;

  const DarkGray = '#505866';

  return (
    <text
      x={newX}
      y={newY}
      textAnchor={textAnchor} // Recharts가 계산해준 정렬(좌/우/중앙) 유지
      fill={DarkGray}
      fontSize={14}
      fontWeight={500}
      {...props}
    >
      {payload.value}
    </text>
  );
};

const UsabilityRadarChart = ({
  functionalityScore,
  comprehensibilityScore,
  loadingSpeedScore,
  responseTimingScore,
}: UsabilityRadarChartProps) => {
  const data = [
    { subject: '주요 기능', A: functionalityScore, fullMark: FULL_MARK },
    { subject: '가이드 이해도', A: comprehensibilityScore, fullMark: FULL_MARK },
    { subject: '로딩 속도', A: loadingSpeedScore, fullMark: FULL_MARK },
    { subject: '알림 타이밍', A: responseTimingScore, fullMark: FULL_MARK },
  ];

  const Bg = '#0E62FF';

  // 모든 item의 A가 0인지 확인
  const isAllZero = data.every(item => item.A === 0);

  return (
    <div className="p-[14px] flex flex-col gap-y-[14px] shadow-card w-full h-[382px]">
      <h3 className="text-Dark-Gray text-body-01 font-semibold">기능별 사용성 평가</h3>
      {isAllZero ? (
        <EmptyData />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={CustomTick} />
            <Radar name="MyData" dataKey="A" stroke={Bg} fill={Bg} fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UsabilityRadarChart;
