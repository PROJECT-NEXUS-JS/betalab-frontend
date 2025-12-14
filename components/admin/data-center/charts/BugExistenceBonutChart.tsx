import DonutChart from '@/components/mypage/molecules/DonutChart';
import EmptyData from './EmptyData';

interface BugExistenceBonutChartProps {
  bugExistenceRate: number;
}

const BugExistenceBonutChart = ({ bugExistenceRate }: BugExistenceBonutChartProps) => {
  const data = [
    {
      label: '버그 있음',
      value: bugExistenceRate,
      color: '#C33F38',
    },
    {
      label: '버그 없음',
      value: 100 - bugExistenceRate,
      color: '#2FA800',
    },
  ];

  return (
    <div className="bg-white h-full shadow-card flex-1 p-[14px] rounded-sm flex flex-col gap-y-2.5">
      <h3 className="text-Dark-Gray text-body-01 font-semibold">버그 존재 비율</h3>
      {/* 데이터가 하나도 없을 때의 처리 */}
      {data[0].value === 0 ? (
        <div className="h-50">
          <EmptyData />
        </div>
      ) : (
        <DonutChart
          data={data}
          variant="lines" // 라인 표시
        />
      )}
    </div>
  );
};

export default BugExistenceBonutChart;
