import EmptyData from "./EmptyData";

interface ProblemTypeChartProps {
  problemTypeProportions: Record<string, number> | undefined;
}

const BAR_COLORS = ['#C33F38', '#9230CF', '#EEAB46', '#0E62FF', '#64768C'];

const ProblemTypeChart = ({ problemTypeProportions }: ProblemTypeChartProps) => {
  // 상위 5개만 자르기
  const top5Proportions = Object.entries(problemTypeProportions ?? {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-white shadow-card flex-1 p-[14px] rounded-sm flex flex-col gap-y-[19px]">
      <h3 className="text-Dark-Gray text-body-01 font-semibold">문제 유형 비중</h3>
      {/* 데이터가 하나도 없을 때의 처리 */}
      {!top5Proportions[0] && <EmptyData />}
      <div className="flex flex-col gap-y-2.5">
        {top5Proportions.map((proportion, index) => (
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between items-center">
              <span className="text-caption-02 font-semibold text-Dark-Gray">{proportion[0]}</span>
              <span className="text-caption-02 font-semibold text-Light-Gray">
                {proportion[1]}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{ width: `${proportion[1]}%`, backgroundColor: BAR_COLORS[index] }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemTypeChart;
