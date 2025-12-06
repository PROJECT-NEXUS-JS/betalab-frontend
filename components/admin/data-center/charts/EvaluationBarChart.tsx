import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EmptyData from './EmptyData';
import CustomTooltip from '@/components/mypage/molecules/CustomTooltip';
interface EvaluationBarChartProps {
  averageSatisfaction: number;
  averageRecommendation: number;
  averageReuse: number;
}
const EvaluationBarChart = ({
  averageSatisfaction,
  averageRecommendation,
  averageReuse,
}: EvaluationBarChartProps) => {
  const data = [
    { name: '전체 만족도', score: averageSatisfaction },
    { name: '추천 의향', score: averageRecommendation },
    { name: '재이용 의향', score: averageReuse },
  ];

  const Primary500 = '#0E62FF';
  const DarkGray = '#505866';
  const Gray100 = '#E8EAEC';

  // 모든 item의 score가 0인지 확인
  const isAllZero = data.every(item => item.score === 0);

  return (
    <div className="bg-white h-full shadow-card flex-1 p-[14px] rounded-sm flex flex-col gap-y-2.5">
      <h3 className="text-Dark-Gray text-body-01 font-semibold">전반 평가</h3>
      {isAllZero ? (
        <EmptyData />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={68} margin={{ top: 15, right: 0, left: -45, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="8 8"
              vertical={false} // 수평선만 표시
              stroke={Gray100} // 그리드 선 색상
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: DarkGray, fontWeight: 700 }} // x축 폰트 스타일
              axisLine={{ stroke: DarkGray, strokeWidth: 1 }} // X축 선 스타일
              dy={3} // X축 레이블과 축 사이 간격
            />
            <YAxis
              domain={[0, 5]}
              tickCount={6} // 0, 1, 2, 3, 4, 5 총 6개 구간 표시
              axisLine={false} // Y축 선 제거
              tickLine={false} // Y축 틱 선 제거
              tick={{ fontSize: 10, fill: DarkGray, fontWeight: 700 }}
              dy={-5}
            />
            <Tooltip
              content={
                <CustomTooltip
                  displayLabel="점수"
                  type="value" // 값을 그대로 표시
                  unit="점" // 숫자 뒤에 붙을 단위
                />
              }
              cursor={{ fill: 'transparent' }}
            />
            {/* radius로 막대 상단 둥글게 처리 */}
            <Bar dataKey="score" fill={Primary500} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EvaluationBarChart;
