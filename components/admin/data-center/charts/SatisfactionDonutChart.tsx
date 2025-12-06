import DonutChart from '@/components/mypage/molecules/DonutChart';
import EmptyData from './EmptyData';

interface satisfactionDonutChartProps {
  satisfactionDistribution: Record<string, number> | undefined;
}

// 점수별 색상 매핑 (순서가 섞여도 5점은 항상 파란색이 되도록 지정)
const SCORE_COLOR_MAP: Record<string, string> = {
  '5점': '#0E62FF',
  '4점': '#9230CF',
  '3점': '#2FA800',
  '2점': '#EEAB46',
  '1점': '#E86400',
};
// 표시할 점수 순서 고정 (5점 -> 1점 순)
const SCORE_ORDER = ['5점', '4점', '3점', '2점', '1점'];

const SatisfactionDonutChart = ({ satisfactionDistribution }: satisfactionDonutChartProps) => {
  // 데이터 변환: Record -> Array<{ label, value, color }>
  const data = SCORE_ORDER.map(label => ({
    label: label,
    value: satisfactionDistribution?.[label] ?? 0,
    color: SCORE_COLOR_MAP[label],
  }));

  // 모든 값이 0일 때
  const isAllZero = data.every(item => item.value === 0);

  return (
    <div className="bg-white h-full shadow-card flex-1 p-[14px] rounded-sm flex flex-col gap-y-2.5">
      <h3 className="text-Dark-Gray text-body-01 font-semibold">만족도 점수 분포</h3>
      <div className="flex-1">
        {isAllZero ? (
          <EmptyData />
        ) : (
          <DonutChart data={data} variant="right-legend" className="flex justify-center" />
        )}
      </div>
    </div>
  );
};

export default SatisfactionDonutChart;
